import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './DoctorRegistrationForm.module.css';

const DoctorRegistrationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('/api/doctors/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      e.target.reset();
      
      // Optionally redirect after successful registration
      // router.push('/success');
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Rest of your form JSX remains the same */}
      <div className={styles.formHeader}>
        <h2 className={styles.title}>Doctors Registration</h2>
        <p className={styles.subtitle}>Join our network of healthcare professionals</p>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        <div className={styles.gridTwo}>
          <div className={styles.field}>
            <label>FULL NAME *</label>
            <input 
              type="text" 
              name="fullName" 
              required 
              placeholder="Dr. John Smith" 
            />
          </div>
          <div className={styles.field}>
            <label>PASSPORT NUMBER *</label>
            <input 
              type="text" 
              name="passportNumber" 
              required 
              placeholder="AB1234567" 
            />
          </div>
        </div>

        <div className={styles.field}>
          <label>EMAIL *</label>
          <input 
            type="email" 
            name="email" 
            required 
            placeholder="doctor@example.com" 
          />
        </div>

        <div className={styles.gridTwo}>
          <div className={styles.field}>
            <label>BIRTHDATE *</label>
            <input 
              type="date" 
              name="birthdate" 
              required 
            />
          </div>
          <div className={styles.field}>
            <label>COUNTRY *</label>
            <select name="country" required>
              <option value="">Select a Country</option>
              <option value="us">United States</option>
              <option value="pk">Pakistan</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Professional Documents</h3>
        <div className={styles.gridTwo}>
          <div className={styles.uploadField}>
            <label>SIGNATURE *</label>
            <div className={styles.uploadContainer}>
              <input 
                type="file" 
                name="signature" 
                accept=".jpg,.jpeg,.png" 
                required 
              />
              <div className={styles.uploadPreview}></div>
            </div>
            <small>Accepted: jpg, png — Max: 5MB</small>
          </div>
          <div className={styles.uploadField}>
            <label>STAMP *</label>
            <div className={styles.uploadContainer}>
              <input 
                type="file" 
                name="stamp" 
                accept=".jpg,.jpeg,.png" 
                required 
              />
              <div className={styles.uploadPreview}></div>
            </div>
            <small>Accepted: jpg, png — Max: 5MB</small>
          </div>
        </div>

        <div className={styles.uploadField}>
          <label>RESOLUTION *</label>
          <small>(license/authorization details)</small>
          <div className={styles.uploadContainer}>
            <input 
              type="file" 
              name="resolution" 
              accept=".pdf" 
              required 
            />
            <div className={styles.uploadPreview}></div>
          </div>
          <small>Accepted: pdf — Max: 5MB</small>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Medical Centers</h3>
        {[1, 2, 3].map(i => (
          <div className={styles.gridTwo} key={i}>
            <div className={styles.field}>
              <label>Medical Center Name {i}</label>
              <input 
                type="text" 
                name={`medicalCenterName${i}`} 
                placeholder={`Center ${i} Name`} 
              />
            </div>
            <div className={styles.field}>
              <label>Medical Center Address {i}</label>
              <input 
                type="text" 
                name={`medicalCenterAddress${i}`} 
                placeholder={`Center ${i} Address`} 
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Additional Contact Information</h3>
        <h4 className={styles.subsectionTitle}>Emails</h4>
        <div className={styles.gridThree}>
          {[1, 2, 3].map(i => (
            <div className={styles.field} key={i}>
              <label>Email {i}</label>
              <input 
                type="email" 
                name={`email${i}`} 
                placeholder={`additional${i}@email.com`} 
              />
            </div>
          ))}
        </div>

        <h4 className={styles.subsectionTitle}>Phone Numbers</h4>
        <div className={styles.gridThree}>
          {[1, 2, 3].map(i => (
            <div className={styles.field} key={i}>
              <label>Phone {i}</label>
              <input 
                type="tel" 
                name={`phone${i}`} 
                placeholder={`+123456789${i}`} 
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formFooter}>
        <p className={styles.privacyText}>
          By submitting this form, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className={styles.spinner}></span>
          ) : (
            'REGISTER NOW'
          )}
        </button>
      </div>
    </form>
  );
};

export default DoctorRegistrationForm;