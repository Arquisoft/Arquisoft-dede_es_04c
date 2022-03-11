import React, { useState, useEffect } from 'react';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import Historia from './pages/Historia';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Producto from "./pages/Producto";
import  {getPinchos} from './api/api';
import {Pincho} from './shared/shareddtypes';
import './App.css';


const listaPorDefecto: Producto[] = [];
const CarritoContext = React.createContext(listaPorDefecto);

function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);

  

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <div className='App'>
      <CarritoContext.Provider value={listaPorDefecto}>
      <NavBar />
      </CarritoContext.Provider>
     <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tienda" element={<Tienda />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Historia" element={<Historia />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
    <Footer/>
    </div>
  );
}

export default App;
