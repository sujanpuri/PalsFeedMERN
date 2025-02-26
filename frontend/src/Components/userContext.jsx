import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create UserContext (only user data will be fetched here)
const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {   //  here children is <App.jsx/> which we wrapped in main.jsx
  // userProvider is a wrapper component that will provide user data to all components inside it.

  const [user, setUser] = useState("Loading..."); // Store user info
  const [userId, setUserId] = useState(null)
  
  // Check if user is authenticated
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user", {
          withCredentials: true,
        });
        setUser(res.data.name)
        setUserId(res.data.id)
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, [userId, user]);  // Runs when user or userId changes, so data can be changed from null to userId/userName

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Use UserContext
export const useUser = () => useContext(UserContext);
