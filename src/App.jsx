import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm';


import * as authService from '../src/services/authService'; // import the authservice
import * as hootService from './services/hootService';

export const AuthedUserContext = createContext(null);


const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [hoots, setHoots] = useState([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const feachAllHoots = async () => {
      const hootsData = await hootService.index();
      setHoots(hootsData);
    };
    if (user) feachAllHoots();
  }, [user]);
  
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };
  
  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate('/hoots');
  };

  const handleDeleteHoot = async (hootId) => {
    const deleteHoot = await hootService.deleteHoot(hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== deleteHoot._id))
    navigate('/hoots');
  };


  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            //protected Routes :
            <>
            <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/hoots" element={<HootList hoots={hoots} />} />
              <Route path="/hoots/:hootId"
                element={<HootDetails handleDeleteHoot={ user} />} />
              <Route path="/hoots/new"
                element={<HootForm handleAddHoot={handleAddHoot} />}
              />
            </>
          ) : (
              // Public Routes :
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
