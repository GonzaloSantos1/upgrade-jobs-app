import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'


const RequireUserAuth = ({ children }) => {
    let location = useLocation();
    if (!localStorage.getItem('userToken')) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
    return children;


}

export default RequireUserAuth