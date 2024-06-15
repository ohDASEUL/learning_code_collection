import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProuctAllPage from './Pages/ProuctAllPage';
import LoginPage from './Pages/LoginPage';
import ProductDetailPage from './Pages/ProductDetailPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProuctAllPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/product/:id' element={<ProductDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
