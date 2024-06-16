import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProuctAllPage from './Pages/ProuctAllPage';
import LoginPage from './Pages/LoginPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';

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
        <Route path='/login' element={<LoginPage setAuthenticate={setAuthenticate}/>}/>
        <Route path='/product/:id' element={<ProductDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
