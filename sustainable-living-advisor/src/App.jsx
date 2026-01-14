import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { History } from './pages/History';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-nature-50 selection:bg-nature-200">
          {/* Ambient background effect */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 container mx-auto px-4 max-w-5xl">
            <Navigation />

            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
