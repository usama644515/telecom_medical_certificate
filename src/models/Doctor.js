import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, 'Full name is required'],
    trim: true
  },
  passportNumber: { 
    type: String, 
    required: [true, 'Passport number is required'],
    unique: true,
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  birthdate: { 
    type: Date, 
    required: [true, 'Birthdate is required'] 
  },
  country: { 
    type: String, 
    required: [true, 'Country is required'] 
  },
  signatureImage: { 
    type: String, 
    required: [true, 'Signature image is required'] 
  },
  stampImage: { 
    type: String, 
    required: [true, 'Stamp image is required'] 
  },
  resolutionFile: { 
    type: String, 
    required: [true, 'Resolution file is required'] 
  },
  medicalCenters: [
    {
      name: { type: String, trim: true },
      address: { type: String, trim: true }
    }
  ],
  emails: [{ type: String, trim: true, lowercase: true }],
  phoneNumbers: [{ type: String, trim: true }],
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
doctorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create model if not exists, otherwise use existing
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor;