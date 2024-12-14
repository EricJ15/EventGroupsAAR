
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './components/admindash';

import AdminEdit from './components/adminEdit';
import UserDash from './components/userdash';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Admin />} />
        <Route path="/edit/:eventId" element={<AdminEdit />} />
        <Route path="/userdash" element={<UserDash />} />
        
      </Routes>
    </Router>
  );
}

export default App;
