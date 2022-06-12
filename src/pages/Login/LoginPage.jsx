import React, {useState} from 'react';
import LoginCompanyForm from '../../components/LoginCompanyForm/LoginCompanyForm';
import LoginUserForm from '../../components/LoginUserForm/LoginUserForm';

const LoginUserPage = () => {
  const [userType, setUserType] = useState('user');

  const chooseType = (type) => {
    setUserType(type);
  };
  return (
    <div className='login-container'>
      <div className='img-container'>
        {userType === 'user' ? (
          <img className='img-container-user' src='/assets/mobile-login.png' alt='Img' />
        ) : (
          <img className='img-container-company' src='/assets/company-login.png' alt='Img' />
        )}
      </div>
      <div className='desktop'>
        <div className='button-type-container'>
          {userType === 'user' ? (
            <p>
              ¿Eres una empresa?{' '}
              <button className='choose-type-btn' onClick={() => chooseType('company')}>
                Haz click aquí
              </button>{' '}
            </p>
          ) : (
            <p>
              ¿Eres un usuario?{' '}
              <button className='choose-type-btn' onClick={() => chooseType('user')}>
                Haz click aquí
              </button>{' '}
            </p>
          )}
        </div>

        {userType === 'user' ? <LoginUserForm /> : <LoginCompanyForm />}
      </div>
    </div>
  );
};

export default LoginUserPage;
