import React from 'react'
import './App.css'
import Header from './Header'
import Premiere from './premiere'
import Cards from './cards'




const App = () => {


	const categories = [
		'popular',
		'top_rated',
		'upcoming'
	]


	const rows = () => {
			return (
				categories.map((x) =>
					<Cards category={x} key={x} />
					)
				)
	}
  return (
    <div className="app">
    	<div className="container">
		    <Header />
		    <Premiere category={categories[Math.round(Math.random()*2)]} />
	    </div>
	    {rows()}
    </div>
  );
}

export default App;
