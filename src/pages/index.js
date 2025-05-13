import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DoctorRegistrationForm from "../components/DoctorRegistrationForm";
import CertificateReports from "../components/CertificateReports";

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Get user data from storage
  //   const sessionAuth = sessionStorage.getItem('auth');
  //   const localAuth = localStorage.getItem('auth');
  //   const authData = sessionAuth ? JSON.parse(sessionAuth) : localAuth ? JSON.parse(localAuth) : null;

  //   if (authData && authData.user) {
  //     setUser(authData.user);
  //   }
  // }, []);

  // const handleLogout = () => {
  //   sessionStorage.removeItem('auth');
  //   localStorage.removeItem('auth');
  //   router.push('/login');
  // };

  return (
    // <AuthWrapper>
    //   <div className={styles.container}>
    //     <Header user={user} onLogout={handleLogout} />
    //     <div className={styles.mainContent}>
    //       <Sidebar user={user} />
    //       <MainContent user={user} />
    //     </div>
    //     <Footer />
    //   </div>
    // </AuthWrapper>
    <>
    <Header />
    {/* <DoctorRegistrationForm /> */}
    <CertificateReports />
    <Footer />
    </>
  );
};

export default Home;