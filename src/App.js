import React from 'react';
import './App.css'
import Header from './Header';
import Premiere from './premiere';
import Cards from './cards';

const App = () => {
  return (
    <div className="app">
    	<div className="container">
		    <Header />
		    <Premiere />
	    </div>
	    <Cards />
    </div>
  );
}

export default App;
