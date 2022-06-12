import React from 'react';
import {Link} from 'react-router-dom';
import {useProfileContext} from '../../shared/contexts/ProfileContext';

const Offer = ({offer}) => {
  const {userProfile} = useProfileContext();

  return (
    !offer.candidates.find((candidate) => candidate._id === userProfile.id) &&
    offer.company && (
      <Link className='offer-container' to={`/detailedOffer/${offer._id}`}>
        <div className='offer-img-container'>
          <img src={offer.company.info.img} alt={offer.company._id} />
        </div>
        <div className='offer-text-container'>
          <h4>{offer.title}</h4>
          <p className='category'>{offer.category}</p>
          <div className='footer-container'>
            <p>{offer.company.name}</p>
            <p>{offer.location}</p>
          </div>
        </div>
      </Link>
    )
  );
};

export default Offer;
