import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {API} from '../../shared/services/api';
import {useIsAuthContext} from '../../shared/contexts/IsAuthContext';
import {useProfileContext} from '../../shared/contexts/ProfileContext';

const LoginCompanyForm = () => {
  const {register, handleSubmit} = useForm();
  let navigate = useNavigate();
  const {setIsAuthCompany} = useIsAuthContext();
  const {setCompanyProfile} = useProfileContext();
  const [error, setError] = useState('');

  const onSubmit = (data) => {
    API.post('/companies/login', data).then((response) => {
      if (response.status === 200) {

        localStorage.setItem("companyToken", response.data[0]);

        setIsAuthCompany(response.data[0]);
        setCompanyProfile({
          id: response.data[1]._id,
          name: response.data[1].name,
          email: response.data[1].email,
          cif: response.data[1].cif,
          info: {
            description: response.data[1].info.description,
            img: response.data[1].info.img,
            location: response.data[1].info.location,
            web: response.data[1].info.web,
            employees: response.data[1].info.employees,
          },
          offers: [response.data[1].offers],
        });
        navigate('/companyOffers');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    });
  };

  return (
    <>
      <form className='login-form-container' onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          name='cif'
          placeholder='📝 CIF'
          className='login-input'
          {...register('cif', {require: true})}
        />
        <input
          type='password'
          name='password'
          placeholder='🔐 Contraseña'
          className='login-input'
          {...register('password', {require: true})}
        />
        {error && <p className='error-message'>{error}</p>}
        <button>Entrar</button>
      </form>

      <div className='register-div'>
        <p>¿Aún no estás registrado?</p>
        <Link to='/home'>
          <button className='sign-up'>Registrarse</button>
        </Link>
      </div>
    </>
  );
};

export default LoginCompanyForm;
