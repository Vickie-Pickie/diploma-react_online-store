import './App.css';
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import {
  Routes,
  Route,
} from "react-router-dom";
import Index from "./components/Index";
import Catalog from "./components/Catalog";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Page404 from "./components/Page404";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path="/" exact element={ <Index />} />
              <Route path="/catalog" exact element={ <Catalog showSearch={true}/>} />
              <Route path="/about" exact element={ <About />} />
              <Route path="/contacts" exact element={ <Contacts />} />
              <Route path="/cart" exact element={ <Cart />} />
              <Route path="/catalog/:id" exact element={<ProductDetail />} />
              <Route path="*" element={ <Page404 /> } />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
