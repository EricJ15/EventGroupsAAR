
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './components/admindash';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} />*/}
        <Route path="/" element={<Admin />} />
       {/* <Route path="/signup" element={<SignUp />} />*/}
       {/* <Route path="/home" element={<Home />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
