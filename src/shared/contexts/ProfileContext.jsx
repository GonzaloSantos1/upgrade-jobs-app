import React, { useContext, useState } from "react";

export const ProfileContext = React.createContext();

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

const ProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(
    JSON.parse(localStorage.getItem("userProfile")) || {
      id: "",
      name: "",
      email: "",
      img: "",
    }
  );

  const [companyProfile, setCompanyProfile] = useState(
    JSON.parse(localStorage.getItem("companyProfile")) || {
      id: "",
      name: "",
      email: "",
      cif: "",
      info: {
        description: "",
        img: "",
        location: "",
        web: "",
        employees: "",
      },
      offers: [],
    }
  );

  return (
    <ProfileContext.Provider
      value={{ userProfile, setUserProfile, companyProfile, setCompanyProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
