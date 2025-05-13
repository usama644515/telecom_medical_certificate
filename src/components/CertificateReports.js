// pages/certificate-reports.js
import styles from './CertificateReports.module.css';

export default function CertificateReports() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Certificate Reports.</h1>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Date Range:</label>
            <input type="date" />
            <span>to</span>
            <input type="date" />
          </div>
          <div className={styles.formGroup}>
            <label>Unique ID:</label>
            <select><option>All</option></select>
          </div>
          <div className={styles.formGroup}>
            <label>Patient Name:</label>
            <input type="text" />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Name of the Recognized Practitioner:</label>
            <select><option>All</option></select>
          </div>
          <div className={styles.formGroup}>
            <label>Birthdate:</label>
            <input type="date" />
          </div>
          <div className={styles.formGroup}>
            <label>Country:</label>
            <select><option>All</option></select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>ID Number:</label>
            <input type="text" />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" />
          </div>
          <div className={styles.formGroup}>
            <label>Gender:</label>
            <select><option>All</option></select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Expiration Date:</label>
            <input type="date" />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.filterBtn}>Filter</button>
          <button className={styles.resetBtn}>Reset</button>
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>ID Number</th>
              <th>Email</th>
              <th>Expiration Date</th>
              <th>View</th>
              <th>Download PDF</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i}>
                <td>John Doe</td>
                <td>123456789</td>
                <td>john@example.com</td>
                <td>01/01/2027</td>
                <td><span className={styles.eye}>👁️</span></td>
                <td><a className={styles.link} href="#">Download PDF</a></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {[1, 2, 3, '...', 7].map((p, idx) => (
            <button key={idx} className={styles.pageBtn}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
