import React from 'react';
import {useGestionContext} from '../../shared/contexts/GestionContext';

const CompanyOffer = ({offer}) => {
  const {updatedDate} = useGestionContext();
  return (
    offer && (
      <li className='offer-text-container'>
        <h4>{offer.title}</h4>
        <p>Vacantes: {offer.vacants}</p>
        <p>Candidatos: {offer.candidates.length}</p>
        {offer.gestionDate && (
          <p className='update-timestamp'>Última gestión {updatedDate(offer.gestionDate)}</p>
        )}
      </li>
    )
  );
};

export default CompanyOffer;
