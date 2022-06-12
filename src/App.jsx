import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterCompanyPage from './pages/RegisterCompany/RegisterCompanyPage';
import RegisterUserPage from './pages/RegisterUser/RegisterUserPage';
import LoginPage from './pages/Login/LoginPage';
import IsAuthProvider from './shared/contexts/IsAuthContext';
import OffersPage from './pages/OffersPage/OffersPage';
import './styles/main.scss';
import ProfileProvider from './shared/contexts/ProfileContext';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import CompanyProfilePage from './pages/CompanyProfile/CompanyProfilePage';
import CompanyOffers from './pages/CompanyOffers/CompanyOffers';
import UserApplicationSent from './pages/UserApplicationSent/UserApplicationSent';
import CreateOfferPage from './pages/CreateOffer/CreateOfferPage';
import CandidaturesPage from './pages/Candidatures/CandidaturesPage';
import DetailedOfferPage from './pages/DetailedOfferPage/DetailedOfferPage';
import HomePage from './pages/HomePage/HomePage';
import DetailedCandidaturePage from './pages/DetailedCandidaturePage/DetailedCandidaturePage';
import DetailedCompanyOffer from './components/DetailedCompanyOffer/DetailedCompanyOffer';
import CandidatePage from './pages/CandidatePage/CandidatePage';
import GestionProvider from './shared/contexts/GestionContext';
import RequireUserAuth from './shared/components/RequireAuth/RequireUserAuth';
import RequireCompanyAuth from './shared/components/RequireAuth/RequireCompanyAuth';

function App() {
  return (
    <div className='App'>
      <IsAuthProvider>
        <ProfileProvider>
          <GestionProvider>
            <Router>
              <Routes>
                <Route path='/loading' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/registerCompany' element={<RegisterCompanyPage />} />
                <Route path='/registerUser' element={<RegisterUserPage />} />
                <Route path='*' element={<Navigate to='loading' />} />
                <Route path='/offers' element={<RequireUserAuth><OffersPage /></RequireUserAuth>} />
                <Route path='/userProfile/:id' element={<RequireUserAuth><UserProfilePage /></RequireUserAuth>} />
                <Route path='/companyProfile/:id' element={<RequireCompanyAuth><CompanyProfilePage /></RequireCompanyAuth>} />
                <Route path='/companyOffers' element={<RequireCompanyAuth><CompanyOffers /></RequireCompanyAuth>} />
                <Route path='/createOffer' element={<RequireCompanyAuth><CreateOfferPage /></RequireCompanyAuth>} />
                <Route path='/ApplicationSent/:id' element={<RequireUserAuth><UserApplicationSent /></RequireUserAuth>} />
                <Route path='/candidatures/:id' element={<RequireUserAuth><CandidaturesPage /></RequireUserAuth>} />
                <Route path='/detailedOffer/:id' element={<RequireUserAuth><DetailedOfferPage /></RequireUserAuth>} />
                <Route path='detailedCandidature/:id' element={<RequireUserAuth><DetailedCandidaturePage /></RequireUserAuth>} />
                <Route path='detailedCompanyOffer/:id' element={<RequireCompanyAuth><DetailedCompanyOffer /></RequireCompanyAuth>} />
                <Route path='candidate/:userID/:offerID' element={<RequireCompanyAuth><CandidatePage /></RequireCompanyAuth>}>
                </Route>
              </Routes>
            </Router>
          </GestionProvider>
        </ProfileProvider>
      </IsAuthProvider>
    </div>
  );
}

export default App;
