import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import './_landingPage.scss';

const LandingPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='landing-page'>
      <Logo />
    </div>
  );
};

export default LandingPage;
