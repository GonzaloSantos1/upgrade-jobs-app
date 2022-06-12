import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import CompanyOffer from '../../components/CompanyOffer/CompanyOffer';
import CompanyNavbar from '../../shared/components/CompanyNavbar/CompanyNavbar';
import {useProfileContext} from '../../shared/contexts/ProfileContext';
import {API} from '../../shared/services/api';

const CompanyOffers = () => {
  const {companyProfile, setCompanyProfile} = useProfileContext();
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    API.get(`/companies/${companyProfile.id}`)
      .then((response) => {
        setCompanyProfile({
          id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          cif: response.data.cif,
          info: {
            description: response.data.info.description,
            img: response.data.info.img,
            location: response.data.info.location,
            web: response.data.info.web,
            employees: response.data.info.employees,
          },
          offers: response.data.offers,
        });
        setOffers(response.data.offers);
      })
      .then(localStorage.setItem('companyProfile', JSON.stringify(companyProfile)));
  }, []);

  return (
    <div className='company-offers-page'>
      <CompanyNavbar />
      <Link to='/createOffer'>
        <button className='new-offer'>Nueva oferta</button>
      </Link>
      {offers && (
        <ul className='company-offers-list'>
          {offers.map((offer) => {
            return (
              <Link
                className='offer-container'
                key={offer._id}
                to={`/detailedCompanyOffer/${offer._id}`}
              >
                <CompanyOffer offer={offer} />
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CompanyOffers;
