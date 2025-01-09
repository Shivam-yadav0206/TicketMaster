import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home_container/Home'

import Footer from './components/footer/Footer'
import Bus from './pages/bus/Bus';
import Detail from './pages/bus/Detail';
import Movies from './pages/movies/Movies';
import Events from './pages/events/Events';
import Sport from './pages/sport/Sport';
import Activity from './pages/activity/Activity';
import MovieDetail from './pages/movies/Detail';
import Services from './pages/services/Services';
import About from './pages/about/About';
import Contact from './pages/contact/contactUs'
import Booking from './pages/booking/Booking';

function App() {
  const [latLong, setLatLong] = React.useState("28.679079-77.069710");

  return (
    <>
      <Router>
        <div className="w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home setLatLong={setLatLong} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/activities" element={<Activity latLong = {latLong}/>} />
            <Route path="/events" element={<Events latLong={latLong} />} />
            <Route path="/movies" element={<Movies latLong={latLong} />} />
            <Route path="/sports" element={<Sport latLong={latLong} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bus/bus-details" element={<Detail />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/detail/:id" element={<Booking />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App
