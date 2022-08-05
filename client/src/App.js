// import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home/Home';
import Register from './components/Register';
import Update from './components/Update';
import Details from './components/Details';
import Piechart from './components/Piechart';

function App() {
  return (
    <>


      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/view/:id" element={<Details />} />
        <Route path="/chart" element={<Piechart />} />
      </Routes>



    </>
  );
}

export default App;
