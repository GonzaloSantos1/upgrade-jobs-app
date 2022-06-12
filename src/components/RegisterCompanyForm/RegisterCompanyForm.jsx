import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../shared/services/api';

const RegisterCompanyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  const onSubmit = (data) => {
    const companyToDB = {
      id: '',
      name: '',
      email: data.email,
      password: data.password,
      cif: data.cif,
      info: {
        description: '',
        img: 'https://res.cloudinary.com/dd3vgq4ks/image/upload/v1650619369/Assets-upgradejobs/user-gf5a686eee_1280_aowjo4.png',
        location: '',
        web: '',
        employees: '',
      },
    };
    API.post('companies/register', companyToDB).then((response) => {
      navigate('/login');
    });
  };
  return (
    <form className='register-form-container' onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        name='cif'
        placeholder='📝 CIF'
        className='register-input'
        {...register('cif', {
          required: {
            value: true,
            message: 'CIF obligatorio',
          },
          pattern: {
            value: /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/,
            message: 'CIF no válido, ejemplo: B12345678',
          },
        })}
      />
      {errors.cif && <p className='error-message'>{errors.cif.message}</p>}
      <input
        type='email'
        name='email'
        placeholder='📧 Email'
        className='register-input'
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
      {errors.email && <p className='error-message'>{errors.email.message}</p>}
      <input
        type='password'
        name='password'
        placeholder='🔐 Contraseña'
        className='register-input'
        {...register('password', {
          required: {
            value: true,
            message: 'Inserta una contraseña',
          },
          minLength: {
            value: 8,
            message: 'Mínimo 8 caracteres',
          },
          pattern: {
            value:
              /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message:
              'Debe contener una mayúscula, una minúscula y un número/caracter especial',
          },
        })}
      />
      {errors.password && (
        <p className='error-message'>{errors.password.message}</p>
      )}
      <button className='signup-button' type='submit'>
        Registrarse
      </button>
      <Link className='back-button' to='/login'>
        Volver
      </Link>
    </form>
  );
};

export default RegisterCompanyForm;
