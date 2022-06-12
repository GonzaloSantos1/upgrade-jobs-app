import React, { useState, useContext } from 'react'

export const IsAuthContext = React.createContext();

export const useIsAuthContext = () => {
  return useContext(IsAuthContext);
}

const IsAuthProvider = ({ children }) => {
  const [isAuthUser, setIsAuthUser] = useState(localStorage.getItem('userToken') || null);
  const [isAuthCompany, setIsAuthCompany] = useState(localStorage.getItem('companyToken') || null);

  return (
    <IsAuthContext.Provider value={{ isAuthUser, setIsAuthUser, isAuthCompany, setIsAuthCompany }}>
      {children}
    </IsAuthContext.Provider>
  )
}

export default IsAuthProvider