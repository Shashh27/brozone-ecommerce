import React, { useContext , useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Men from './components/Men';
import Women from './components/Women';
import Kids from './components/Kids';
import Bag from './components/Bag';
import { Productlistcontext, Productcontext } from './store/product_list_context';
import "bootstrap/dist/css/bootstrap.min.css";
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import Signup from './components/Signup';
import Editprofile from './components/Editprofile';

function App() {
  const [menu, setmenu] = useState("men");

  return (
      <Router>
            <Productlistcontext>
        <Header menu={menu} setmenu={setmenu} />
        <Routes>
          <Route path="/" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path='/bag' element={<Bag/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/edit' element={<Editprofile/>}/>
        </Routes>
        </Productlistcontext>
      </Router>
  );
}

export default App;
