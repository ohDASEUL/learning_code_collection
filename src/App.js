import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ProductpPage from './Pages/ProductpPage';
import ProductDetailPage from './Pages/ProductDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path='/products' element={<ProductpPage/>}/>
      <Route path='/products/:id' element={<ProductDetailPage/>}/>
    </Routes>
  );
}

export default App;
