import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default null to handle loading state

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/cookie', { credentials: 'include' });
        let data = await response.json();
        console.log("Auth Status:", data.status);
        if (data.status === 200) {
          console.log("Before setting state to true");
          setIsAuthenticated(true);
          console.log("After setting state to true");
        } else {
          console.log("Before setting state to false");
          setIsAuthenticated(false);
          console.log("After setting state to false");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setIsAuthenticated(false);
      }
    };
  
    verifyUser();
  }, []);
  
  console.log("isAuthenticated:", isAuthenticated);

  // While checking authentication, show a loading indicator
  if (isAuthenticated === null) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>Access Denied</p>;



  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;


