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
import Kontakt from './pages/Kontakt';
import Onama from './pages/Onama';
import FAQ from './pages/FAQ';
import KakoFunkcionira from './pages/KakoFunkcionira';
import Caffe from './pages/Caffe';
import CaffeSingle from './pages/CaffeSingle';
import Restaurant from './pages/Restaurant';
import RestaurantSingle from './pages/RestaurantSingle';
import Page from './pages/Page';

// Dashboard
import Prijava from './pages/dashboard/Prijava';
import Registracija from './pages/dashboard/Registracija';

// Proizvod
import Analitika from './pages/proizvod/Analitika';
import Cjenik from './pages/proizvod/Cjenik';
import DigitalniJelovnik from './pages/proizvod/DigitalniJelovnik';
import Primjeri from './pages/proizvod/Primjeri';
import UpravljanjePonudom from './pages/proizvod/UpravljanjePonudom';

// Rjesenja
import ZaBarove from './pages/rjesenja/ZaBarove';
import ZaHotele from './pages/rjesenja/ZaHotele';
import ZaKafice from './pages/rjesenja/ZaKafice';
import ZaRestorane from './pages/rjesenja/ZaRestorane';
import ZaSlasticarnice from './pages/rjesenja/ZaSlasticarnice';


function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogSingle />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/o-nama" element={<Onama />} />
        <Route path="/cesta-pitanja" element={<FAQ />} />
        <Route path="/kako-funkcionira" element={<KakoFunkcionira />} />

        <Route path="/kafici" element={<Caffe />} />
        <Route path="/kafic/:slug" element={<CaffeSingle />} />

        <Route path="/restorani" element={<Restaurant />} />
        <Route path="/restoran/:slug" element={<RestaurantSingle />} />

        <Route path="/privatnost" element={<Page pageID="226" />} />
        <Route path="/kolacici" element={<Page pageID="230" />} />
        <Route path="/uvjeti-koristenja" element={<Page pageID="555" />} />

        <Route path="/prijava" element={<Prijava />} />
        <Route path="/registracija" element={<Registracija />} />

        <Route path="/rjesenja/analitika" element={<Analitika />} />
        <Route path="/cjenik" element={<Cjenik />} />
        <Route path="/rjesenja/digitalni-jelovnik" element={<DigitalniJelovnik />} />
        <Route path="/primjeri" element={<Primjeri />} />
        <Route path="/rjesenja/upravljanje-ponudom" element={<UpravljanjePonudom />} />

        <Route path="/za-barove" element={<ZaBarove />} />
        <Route path="/za-hotele" element={<ZaHotele />} />
        <Route path="/za-kafice" element={<ZaKafice />} />
        <Route path="/za-restorane" element={<ZaRestorane />} />
        <Route path="/za-slasticarnice" element={<ZaSlasticarnice />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
