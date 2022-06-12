import {useEffect, useState} from 'react';
import Candidature from '../../components/Candidature/Candidature';
import UserNavbar from '../../shared/components/UserNavbar/UserNavbar';
import {useProfileContext} from '../../shared/contexts/ProfileContext';
import {API} from '../../shared/services/api';

const CandidaturesPage = () => {
  const {userProfile} = useProfileContext();
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    API.get(`users/${userProfile.id}`).then((response) => {
      setCandidatures(response.data.candidatures);
    });
  }, []);

  return (
    <>
      <UserNavbar />
      <div className='main-offersPage'>
        <p>Mis candidaturas</p>
        <ul className='offers-list'>
          {candidatures.length ? (
            candidatures.map((candidature) => {
              return <Candidature key={candidature.id} candidature={candidature} />;
            })
          ) : (
            <div className='empty'>
              <div className='empty-image'>
                <img src='/assets/empty-blue.png' alt='empty' />
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default CandidaturesPage;
