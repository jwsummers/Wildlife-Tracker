import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SightingForm from './components/SightingForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-sighting' element={<SightingForm />} />
      </Routes>
    </Router>
  );
};

export default App;
