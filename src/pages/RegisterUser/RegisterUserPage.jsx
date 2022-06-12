import React from 'react';
import RegisterUserForm from '../../components/RegisterUserForm/RegisterUserForm';

const RegisterUserPage = () => {
  return (
    <div className='register-page'>
      <div className='register-page-img-container'>
        <img className='register-page-img' src='/assets/Signup.png' alt='Sign up' />
      </div>
      <div className='desktop'>
        <h4>Regístrate como usuario</h4>
        <RegisterUserForm />
      </div>
    </div>
  );
};

export default RegisterUserPage;
