import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ButtonLogout from '../../../components/ButtonLogout/ButtonLogout';
import {useProfileContext} from '../ProfileContext';
import {BsFillPersonFill as Profile} from 'react-icons/bs';
import {FaBriefcase as Offers, FaSearch as Search} from 'react-icons/fa';
import {RiBookmark3Fill as Applications} from 'react-icons/ri';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {userProfile} = useProfileContext();

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='user-navbar'>
      <Link to='/offers'>
        <Offers size={30} className='nav-item' />
      </Link>
      <Link to={`/candidatures/${userProfile.id}`}>
        <Applications size={30} className='nav-item' />
      </Link>
      <div className='dropdown'>
        <div className='img-container'>
          <img
            src={userProfile.img}
            alt='profile pic'
            className='dropbtn'
            type='button'
            onClick={handleButtonClick}
          />
        </div>
        <div className={`dropdown-submenu ${isOpen ? 'show' : ''}`}>
          <ul>
            <li>
              <Link to={`/userProfile/${userProfile.id}`}>
                <div className='nav-item'>Perfil</div>
              </Link>
            </li>
            <li>
              <ButtonLogout className='nav-item' />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
