import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Landing from './pages/Landing';
import Test from './pages/Test';
import Results from './pages/Results';
import CareerDetail from './pages/CareerDetail';
import Explore from './pages/Explore';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    if (token) {
      setSessionToken(token);
    } else {
      const newToken = crypto.randomUUID();
      localStorage.setItem('session_token', newToken);
      setSessionToken(newToken);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/test" element={<Test sessionToken={sessionToken} />} />
            <Route path="/results" element={<Results />} />
            <Route path="/carreras/:careerId" element={<CareerDetail />} />
            <Route path="/carreras" element={<Explore />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
