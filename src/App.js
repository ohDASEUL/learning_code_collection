import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProuctAllPage from './Pages/ProuctAllPage';
import LoginPage from './Pages/LoginPage';
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
import PrivateRoute from './Routes/PrivateRoute';

function App() {
  let [authenticate, setAuthenticate] = useState(false); // true면 로그인, false면 비로그인

  useEffect(()=>{
    console.log("확인",authenticate)
  },[authenticate])
  
  return (
    <div>
      <Navbar  authenticate={authenticate} setAuthenticate={setAuthenticate}/>
      <Routes>
        <Route path='/' element={<ProuctAllPage/>}/>
        <Route path='/login' element={<LoginPage setAuthenticate={setAuthenticate} />}/>
        <Route path='/product/:id' element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate}/>}/>
      </Routes>
    </div>
  );
}

export default App;
