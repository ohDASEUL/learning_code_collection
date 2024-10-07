import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ProductpPage from './Pages/ProductpPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import LoginPage from './Pages/LoginPage';
import { useState } from 'react';
import UserPage from './Pages/UserPage';

function App() {
  const [authenticate, setAuthenticate]=useState(false)
  const PrivateRoute = () => {
    return authenticate === true?<UserPage/>:<Navigate to="/login"/>
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path='/products' element={<ProductpPage/>}/>
      <Route path='/products/:id' element={<ProductDetailPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/user' element={<PrivateRoute/>}/>
    </Routes>
  );
}

export default App;
