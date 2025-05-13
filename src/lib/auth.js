export const getAuthData = () => {
    if (typeof window === 'undefined') return null;
    
    const sessionAuth = sessionStorage.getItem('auth');
    const localAuth = localStorage.getItem('auth');
    return sessionAuth ? JSON.parse(sessionAuth) : localAuth ? JSON.parse(localAuth) : null;
  };
  
  export const isAuthenticated = () => {
    const authData = getAuthData();
    if (!authData || !authData.isAuthenticated) return false;
    
    // Check if token is expired
    if (authData.expiresAt && new Date().getTime() > authData.expiresAt) {
      sessionStorage.removeItem('auth');
      localStorage.removeItem('auth');
      return false;
    }
    
    return true;
  };
  
  export const getAuthToken = () => {
    const authData = getAuthData();
    return authData?.token || null;
  };
  
  export const getCurrentUser = () => {
    const authData = getAuthData();
    return authData?.user || null;
  };