import React from 'react';
import './App.css'
import Header from './Header';
import Premiere from './premiere';
import Cards from './cards';



const categories = [
	'popular',
	'top_rated',
	'upcoming'
]


const rows = () => {
		return (
			categories.map((x) =>
				<Cards category={x} />
				)
			)
}


const App = () => {
  return (
    <div className="app">
    	<div className="container">
		    <Header />
		    <Premiere />
	    </div>
	    {rows()}
    </div>
  );
}

export default App;
