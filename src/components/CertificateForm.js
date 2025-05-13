import styles from './CertificateForm.module.css';

export default function CertificateForm() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>CERTIFICATE GENERATION</h1>
      <p className={styles.subheading}>You generate certificates by filling out this form.</p>

      <form className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <label>Patient Name *</label>
            <input type="text" required />
          </div>

          <div className={styles.formGroup}>
            <label>Birthdate *</label>
            <input type="date" required />
          </div>

          <div className={styles.formGroup}>
            <label>Country *</label>
            <select required>
              <option>Afghanistan</option>
              {/* Add other countries as needed */}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>ID Number *</label>
            <input type="text" required />
          </div>

          <div className={styles.formGroup}>
            <label>Email *</label>
            <input type="email" required />
          </div>

          <div className={styles.formGroup}>
            <label>Nationality *</label>
            <input type="text" required />
          </div>

          <div className={styles.formGroup}>
            <label>Gender *</label>
            <select required>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Medical Centers Names *</label>
            <input type="text" placeholder="– No Results –" required />
          </div>
        </div>

        <fieldset className={styles.fieldset}>
          <legend>Confirmation that identification documents were checked at the point of examination? *</legend>
          <label><input type="radio" name="idCheck" required /> Yes</label>
          <label><input type="radio" name="idCheck" /> No</label>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Hearing meets the standards? *</legend>
          <label><input type="radio" name="hearing" required /> Yes</label>
          <label><input type="radio" name="hearing" /> No</label>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Unaided hearing satisfactory? *</legend>
          <label><input type="radio" name="unaidedHearing" required /> Yes</label>
          <label><input type="radio" name="unaidedHearing" /> No</label>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Visual acuity meets standards? *</legend>
          <label><input type="radio" name="visualAcuity" required /> Yes</label>
          <label><input type="radio" name="visualAcuity" /> No</label>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Colour vision meets standards? *</legend>
          <label><input type="radio" name="colorVision" required /> Yes</label>
          <label><input type="radio" name="colorVision" /> No</label>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Fit for look out duties? *</legend>
          <label><input type="radio" name="fitLookout" required /> Yes</label>
          <label><input type="radio" name="fitLookout" /> No</label>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Limitations or restrictions on fitness? *</legend>
          <label><input type="radio" name="limitations" required /> Yes</label>
          <label><input type="radio" name="limitations" /> No</label>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>
            Is the seafarer free from any medical condition likely to be aggravated by service at sea or to render the seafarers unfit for such service or to endanger the health of other persons on board? *
          </legend>
          <label><input type="radio" name="freeFromCondition" required /> Yes</label>
          <label><input type="radio" name="freeFromCondition" /> No</label>
        </fieldset>

        <button type="submit" className={styles.submitButton}>Generate Certificate!</button>
      </form>
    </div>
  );
}
