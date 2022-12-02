import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';

import './App.css';
import {NavBar} from './components/navBar/navBar';

const App: FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
