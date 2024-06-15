import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProuctAllPage from './Pages/ProuctAllPage';
import LoginPage from './Pages/LoginPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProuctAllPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/product/:id' element={<ProductDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
