import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProfileContext } from "../../shared/contexts/ProfileContext";
import { API } from "../../shared/services/api";
import Chat from "../Chat/Chat";

const DetailedCandidature = () => {
  const [detailedCandidature, setDetailedCandidature] = useState({});
  const { userProfile } = useProfileContext();
  const { id } = useParams();
  const thisCandidature = userProfile.candidatures.find(
    (candidature) => candidature.id === id
  );

  useEffect(() => {
    API.get(`offers/${id}`).then((response) => {
      setDetailedCandidature(response.data);
    });
  }, [id]);
  return (
    <div className='detailed-container'>
      <div className='offer-header'>
        {detailedCandidature.company && (
          <div className='img-container'>
            <img
              src={detailedCandidature.company.info.img}
              alt={detailedCandidature.company.name}
            />
          </div>
        )}
        <div className='text-container'>
          <h3>{detailedCandidature.title}</h3>
          <p>{detailedCandidature.location}</p>
          <p>Vacantes: {detailedCandidature.vacants}</p>
          {thisCandidature && <p>Estado: {thisCandidature.state}</p>}
        </div>
      </div>
      <div className='offer-description textarea'>
        <p>{detailedCandidature.description}</p>
      </div>
      {detailedCandidature && detailedCandidature.company && (
        <Chat
          user={userProfile.name}
          room={detailedCandidature._id + userProfile.id}
        />
      )}
    </div>
  );
};

export default DetailedCandidature;
