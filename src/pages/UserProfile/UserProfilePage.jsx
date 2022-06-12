import axios from 'axios';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import UserNavbar from '../../shared/components/UserNavbar/UserNavbar';
import {useProfileContext} from '../../shared/contexts/ProfileContext';
import {API} from '../../shared/services/api';

const UserProfilePage = () => {
  let navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const {userProfile, setUserProfile} = useProfileContext();
  const [image, setImage] = useState(userProfile.img);
  const [cv, setCV] = useState(userProfile.cv);
  const [showIMG, setShowIMG] = useState(false);
  const [showCV, setShowCV] = useState(false);

  const changeShow = (input) => {
    if (input === 'img') {
      setShowIMG(!showIMG);
    }
    if (input === 'cv') {
      setShowCV(!showCV);
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'zehcimages');
    axios.post('https://api.cloudinary.com/v1_1/dzrcd1gpb/image/upload', data).then((response) => {
      setImage(response.data.secure_url);
      changeShow('img');
    });
  };

  const uploadCV = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'zehcimages');
    axios.post('https://api.cloudinary.com/v1_1/dzrcd1gpb/image/upload', data).then((response) => {
      const cvURL = response.data.secure_url.replace('.pdf', '.jpg');
      setCV(cvURL);
      changeShow('cv');
    });
  };

  const onSubmit = (data) => {
    const dataToDB = {
      id: userProfile.id,
      name: data.name,
      email: data.email,
      img: image,
      cv: cv,
      candidatures: userProfile.candidatures,
    };
    API.patch(`/users/${userProfile.id}`, dataToDB)
      .then(setUserProfile(dataToDB))
      .then(navigate(`/offers`));
  };

  return (
    <>
      <UserNavbar />
      <div className='profile-page'>
        <div className='profile-logo-container'>
          <img src={image} alt={userProfile.id} />
        </div>
        <form className='login-form-container' onSubmit={handleSubmit(onSubmit)}>
          {!showIMG ? (
            <button className='change-image' onClick={() => changeShow('img')}>
              Cambiar imagen
            </button>
          ) : (
            <>
              <label>Selecciona tu nueva imagen</label>
              <input type='file' name='img' onChange={uploadImage} />
            </>
          )}
          {!showCV ? (
            <button className='change-image' onClick={() => changeShow('cv')}>
              Subir cv
            </button>
          ) : (
            <>
              <label>Selecciona tu nuevo cv</label>
              <input type='file' name='cv' onChange={uploadCV} />
            </>
          )}

          <label>Nombre</label>
          <input
            type='text'
            name='name'
            placeholder='Escribe tu nombre'
            defaultValue={userProfile.name}
            {...register('name', {required: true})}
          />
          <label>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Escribe tu email'
            defaultValue={userProfile.email}
            {...register('email', {required: true})}
          />
          {/* <label>CV</label>
          <input
            type='file'
            name='cv'
            placeholder='Sube tu cv.pdf'
            defaultValue={userProfile.cv}
            {...register("cv", { required: false })}
          /> */}
          <button>Guardar cambios</button>
        </form>
      </div>
    </>
  );
};

export default UserProfilePage;
