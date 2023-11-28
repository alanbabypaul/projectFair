
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth';
import Footer from './Components/Footer';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import { useContext } from 'react';
import { tokenAuthorizationContext } from './Contexts/TokenAuth';

function App() {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Auth />}></Route>
      <Route path='/register' element={<Auth register/>}></Route>
      <Route path='/dashboard' element={ isAuthorized? <Dashboard /> :<Home/>}></Route>
      <Route path='/projects' element={ isAuthorized? <Projects /> :<Home/>}></Route>

     </Routes>

     <Footer />
    
    </div>
  );
}

export default App;
