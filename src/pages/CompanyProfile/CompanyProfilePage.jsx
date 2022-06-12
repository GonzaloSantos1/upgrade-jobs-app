import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CompanyNavbar from '../../shared/components/CompanyNavbar/CompanyNavbar';
import { useProfileContext } from '../../shared/contexts/ProfileContext';
import { API } from '../../shared/services/api';

const CompanyProfilePage = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { companyProfile, setCompanyProfile } = useProfileContext();
  const [image, setImage] = useState(companyProfile.info.img);
  const [show, setShow] = useState(false);

  const changeShow = () => {
    setShow(!show);
  };
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'zehcimages');
    axios
      .post('https://api.cloudinary.com/v1_1/dzrcd1gpb/image/upload', data)
      .then((response) => {
        setImage(response.data.secure_url);
        changeShow();
      });
  };
  const onSubmit = (data) => {
    const dataToDB = {
      id: companyProfile.id,
      name: data.name,
      email: data.email,
      cif: data.cif,
      info: {
        description: data.info.description,
        img: image,
        location: data.info.location,
        web: data.info.web,
        employees: data.info.employees,
      },
      offers: companyProfile.offers,
    };
    API.patch(`/companies/${companyProfile.id}`, dataToDB)
      .then(setCompanyProfile(dataToDB))
      .then(navigate(`/companyOffers`));
  };

  return (
    <>
      <CompanyNavbar />
      <div className='profile-page'>
        <div className='profile-logo-container'>
          <img src={image} alt={companyProfile.name} />
        </div>

        <form
          className='login-form-container'
          onSubmit={handleSubmit(onSubmit)}
        >
          {!show ? (
            <button className='change-image' onClick={changeShow}>
              Cambiar imagen
            </button>
          ) : (
            <>
              <input type='file' name='info.img' onChange={uploadImage} />
            </>
          )}
          <label>Nombre</label>
          <input
            type='text'
            name='name'
            defaultValue={companyProfile.name}
            {...register('name', { required: true })}
          />
          <label>CIF</label>
          <input
            type='text'
            name='cif'
            defaultValue={companyProfile.cif}
            {...register('cif', { required: false })}
          />
          <label>Email</label>
          <input
            type='email'
            name='email'
            defaultValue={companyProfile.email}
            {...register('email', { required: true })}
          />
          <label>Descripción</label>
          <input
            type='text'
            name='info.description'
            defaultValue={companyProfile.info.description}
            {...register('info.description', { required: false })}
          />
          <label>Localización</label>
          <input
            type='text'
            name='info.location'
            defaultValue={companyProfile.info.location}
            {...register('info.location', { required: false })}
          />
          <label>Web</label>
          <input
            type='url'
            name='info.web'
            defaultValue={companyProfile.info.web}
            {...register('info.web', { required: false })}
          />
          <label>Empleados</label>
          <input
            type='number'
            name='info.employees'
            defaultValue={companyProfile.info.employees}
            {...register('info.employees', { required: false })}
          />
          <button>Guardar cambios</button>
        </form>
      </div>
    </>
  );
};

export default CompanyProfilePage;
