import dbConnect from '../../../lib/dbConnect';
import Doctor from '../../../models/Doctor';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to get first value if it's an array
const getValue = (input) => Array.isArray(input) ? input[0] : input;

// Helper to extract first file if it's an array
const getSingleFile = (input) => Array.isArray(input) ? input[0] : input;

// Save uploaded file to permanent location
const saveFile = async (file, uploadDir) => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });

    const fileExt = path.extname(file.originalFilename || file.name || '');
    const newFilename = `${uuidv4()}${fileExt}`;
    const newPath = path.join(uploadDir, newFilename);

    const tempPath = file.filepath || file.path;
    if (!tempPath) throw new Error('Temp file path is missing.');

    await fs.rename(tempPath, newPath);

    return `/uploads/${newFilename}`;
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('Failed to save file');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    await dbConnect();

    const { default: formidable } = await import('formidable');
    const form = formidable({
      multiples: true,
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
    });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Normalize required single-value fields
    const fullName = getValue(fields.fullName);
    const passportNumber = getValue(fields.passportNumber);
    const email = getValue(fields.email);
    const birthdate = getValue(fields.birthdate);
    const country = getValue(fields.country);

    const requiredFields = [fullName, passportNumber, email, birthdate, country];
    const fieldNames = ['fullName', 'passportNumber', 'email', 'birthdate', 'country'];

    const missingFields = fieldNames.filter((_, index) => !requiredFields[index]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    if (!files.signature || !files.stamp || !files.resolution) {
      return res.status(400).json({
        success: false,
        message: 'All document uploads are required',
      });
    }

    // Check for existing doctor
    const existingDoctor = await Doctor.findOne({ passportNumber });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'A doctor with this passport number is already registered.',
      });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Save uploaded files
    const signatureImage = await saveFile(getSingleFile(files.signature), uploadDir);
    const stampImage = await saveFile(getSingleFile(files.stamp), uploadDir);
    const resolutionFile = await saveFile(getSingleFile(files.resolution), uploadDir);

    // Process medical centers
    const medicalCenters = [];
    for (let i = 1; i <= 3; i++) {
      const name = getValue(fields[`medicalCenterName${i}`]);
      const address = getValue(fields[`medicalCenterAddress${i}`]);
      if (name && address) {
        medicalCenters.push({ name, address });
      }
    }

    // Process emails and phone numbers
    const emails = [];
    const phoneNumbers = [];

    emails.push(email); // main email
    for (let i = 1; i <= 3; i++) {
      const em = getValue(fields[`email${i}`]);
      if (em) emails.push(em);
      const ph = getValue(fields[`phone${i}`]);
      if (ph) phoneNumbers.push(ph);
    }

    // Create and save doctor
    const doctor = new Doctor({
      fullName,
      passportNumber,
      email,
      birthdate: new Date(birthdate),
      country,
      signatureImage,
      stampImage,
      resolutionFile,
      medicalCenters,
      emails,
      phoneNumbers,
    });

    await doctor.save();

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Your application is under review.',
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during registration. Please try again.',
    });
  }
}
