import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'


const RequireCompanyAuth = ({ children }) => {
    let location = useLocation();
    if (!localStorage.getItem('companyToken')) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
    return children;


}

export default RequireCompanyAuth