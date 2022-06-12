import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {guideData} from '../../GuideData/data';

const GuideHome = () => {
  let navigate = useNavigate();
  const {dataUser, dataCompany} = guideData;

  const [data, setData] = useState(-1);
  const [guide, setGuide] = useState('');
  const next = () => {
    setData(data + 1);
  };

  const setUser = () => {
    setGuide('user');
    setData(data + 1);
  };

  const setCompany = () => {
    setGuide('company');
    setData(data + 1);
  };
  const toRegister = (type) => {
    if (type === 'user') {
      navigate('/registerUser');
    } else {
      navigate('/registerCompany');
    }
  };

  return (
    <>
      {data < 0 && (
        <div className='main-container'>
          <div className='logo-container-guide'>
            <i className='bx bx-meteor active' />
            <h2 className='logo-title'>UpgradeJobs</h2>
          </div>
          <h2 className='main-title'>¿Qué estás buscando?</h2>
          <div className='button-container'>
            <button className='main-button' onClick={setUser}>
              Trabajo
            </button>
            <button className='main-button' onClick={setCompany}>
              Candidatos
            </button>
          </div>
        </div>
      )}
      {data >= 0 && (
        <div className='guide'>
          {data === 0 && <img className='guide__image' src='/assets/Resume.png' alt='profile' />}
          {data === 1 && <img className='guide__image' src='/assets/Jobhunt.png' alt='profile' />}
          {data === 2 && (
            <img className='guide__image' src='/assets/contact-companies.png' alt='profile' />
          )}
          {guide === 'user' && (
            <div className='desktop'>
              <div className='guide__content'>
                {dataUser[data].title && <h3>{dataUser[data].title}</h3>}
                <p>{dataUser[data].text}</p>
              </div>
              <div className='guide__buttons'>
                {data < 2 && (
                  <button className='guide-btn' onClick={next}>
                    Siguiente
                  </button>
                )}
                {data === 2 && (
                  <button className='guide-btn green' onClick={() => toRegister('user')}>
                    Comenzar
                  </button>
                )}
              </div>
            </div>
          )}
          {guide === 'company' && (
            <div className='desktop'>
              <div className='guide__content'>
                {dataCompany[data].title && <h3>{dataCompany[data].title}</h3>}
                <p>{dataCompany[data].text}</p>
              </div>
              <div className='guide__buttons'>
                {data < 2 && (
                  <button className='guide-btn' onClick={next}>
                    Siguiente
                  </button>
                )}
                {data === 2 && (
                  <button className='guide-btn green' onClick={() => toRegister('company')}>
                    Comenzar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GuideHome;
