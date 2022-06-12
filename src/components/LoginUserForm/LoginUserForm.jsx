import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../shared/services/api';
import { useIsAuthContext } from '../../shared/contexts/IsAuthContext';
import { useProfileContext } from '../../shared/contexts/ProfileContext';

const LoginUserForm = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  const { setIsAuthUser } = useIsAuthContext();
  const { setUserProfile } = useProfileContext();
  const [error, setError] = useState('');
  const onSubmit = (data) => {
    API.post('/users/login', data).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('userToken', response.data[0]);

        setIsAuthUser(response.data[0]);
        setUserProfile({
          id: response.data[1]._id,
          name: response.data[1].name,
          email: response.data[1].email,
          img: response.data[1].img,
          cv: response.data[1].cv,
          candidatures: response.data[1].candidatures,
        });
        navigate(`/offers`);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    });
  };
  return (
    <>
      <form className='login-form-container' onSubmit={handleSubmit(onSubmit)}>
        <input
          type='email'
          name='email'
          placeholder='📧 Email'
          {...register('email', {
            required: {
              value: true,
              message: 'Inserta tu email',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'El formato del email no es válido',
            },
          })}
        />
        <input
          type='password'
          name='password'
          placeholder='🔐 Contraseña'
          {...register('password', { required: true })}
        />
        {error && <p className='error-message'>{error}</p>}
        <button>Entrar</button>
      </form>
      <div className='register-div'>
        <p>¿Aún no estás registrado?</p>
        <Link to='/home'>
          <button>Registrarse</button>
        </Link>
      </div>
    </>
  );
};

export default LoginUserForm;
