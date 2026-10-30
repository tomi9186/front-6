import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Works from './pages/Works';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import Contact from './pages/Contact';
import Caffe from './pages/Caffe';
import CaffeSingle from './pages/CaffeSingle';
import Restaurant from './pages/Restaurant';
import RestaurantSingle from './pages/RestaurantSingle';

// Vježbe
import Recipes from './components/vjezbe/Recipes';
import Posts from './components/vjezbe/Posts';
import Users from './components/vjezbe/Users';


function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogSingle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />

        <Route path="/kafici" element={<Caffe />} />
        <Route path="/kafic/:slug" element={<CaffeSingle />} />

        <Route path="/restorani" element={<Restaurant />} />
        <Route path="/restoran/:slug" element={<RestaurantSingle />} />


      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
