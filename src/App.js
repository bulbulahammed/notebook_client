import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import CreateNote from './pages/createNote/CreateNote';
import LandingPage from './pages/landingpage/LandingPage';
import Login from './pages/loginPage/Login';
import MyNotes from './pages/myNotes/MyNotes';
import Profile from './pages/profile/Profile';
import Register from './pages/registerPage/Register';
import UpdateNote from './pages/updateNote/UpdateNote';


function App() {
  const [search,setSearch] = useState();
  console.log(search);
  return (
    <>
      <Header setSearch={setSearch}></Header>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/myNotes' element={<MyNotes search={search} />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/createnote' element={<CreateNote/>}/>
          <Route path='/note/:id' element={<UpdateNote/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
