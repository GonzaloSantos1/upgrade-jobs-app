import React from 'react'
import { useNavigate } from 'react-router-dom'


const ButtonLogout = () => {
    let navigate = useNavigate();
    const logOut = () => {
        localStorage.clear()
        navigate('/login');
    }
    return (
        <div className='button-logout'>
            <p onClick={logOut}>Logout</p>
        </div>
    )
}

export default ButtonLogout