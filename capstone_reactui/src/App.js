// App.jsx or where you define your routes
import React from 'react';
import AllComponents from './AllComponents';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
 
 
const App = () => {
  return (
    <BrowserRouter>
      <AllComponents />
    </BrowserRouter>
   
  );
};

export default App;