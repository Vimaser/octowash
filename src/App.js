import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './firebaseConfig';
import { 
  Home,
  Blog,
  Contact,
  Messages,
  Portfolio,
  EditPortfolio, 
  Login,
  Logout,
  Services,
  EditServices,
  EditBlog,
  CreateBlog,
  DeleteBlog,
  DeleteMessages,
  DeletePortfolio,
  CreatePortfolio,
  DeleteServices,
  Footer,
  CreateServices,
  Estimate,
  Header } from "./components";
  import './App.css'; 

function App() {
  const [darkMode] = useState(false);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/portfolio" element={<Portfolio darkMode={darkMode} />} />
        <Route path="/editportfolio/:itemId" element={<EditPortfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/services" element={<Services darkMode={darkMode} />} />
        <Route path="/editservice/:serviceId" element={<EditServices />} />
        <Route path="/editblog/:blogId" element={<EditBlog />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/deleteblog/:id" element={<DeleteBlog />} />
        <Route path="/deletemessages/:id" element={<DeleteMessages />} />
        <Route path="/deleteportfolio/:id" element={<DeletePortfolio />} />
        <Route path="/DeleteService/:id" element={<DeleteServices />} />
        <Route path="/createportfolio" element={<CreatePortfolio />} />
        <Route path="/createservices" element={<CreateServices />} />
      </Routes>
      <Footer />
    </ Router>
  );
}

export default App;
