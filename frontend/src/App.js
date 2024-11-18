import React, { useState } from 'react';
import HomePage from './components/HomePage';
import LoginSignupPage from './components/LoginSignupPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? <HomePage /> : <LoginSignupPage onLoginSuccess={handleLoginSuccess} />}
      
    </div>
  );
}

export default App;

