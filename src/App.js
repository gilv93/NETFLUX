import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import Premiere from './premiere'
import Categories from './categories'
import List from './mylist.js'
import axios from 'axios'
import Cards from './cards'




const App = () => {

	const [pImage, setPImage] = useState('')
	const [viewList, setViewList] = useState(false)
	const [myList, setMyList] = useState([])

	const categories = [
		'popular',
		'top_rated',
		'upcoming'
	]

	useEffect(() => {
		async function fetchImage() {
			const baseUrl = `https://api.themoviedb.org/3/movie/` + categories[Math.round(Math.random()*2)] + `?api_key=d5ba9815eee72ec8ecb7839af9af7ad6`
			const res = await axios.get(baseUrl)
			const select = res.data.results[Math.round(Math.random()*19)]
			const img = { title: select.title, id: select.id, overview: select.overview, image: 'https://image.tmdb.org/t/p/w154' + select.poster_path, backdrop_image: `http://image.tmdb.org/t/p/w1280` + select.backdrop_path }
			setPImage(img)
		}
		fetchImage()
	}, [])


	useEffect(() => {
		if (myList.length > 0) {
			setViewList(true)
		}
		else {
			setViewList(false)
		}
	})

	const handleList = (e) => {
		if (myList.find((x) => x == pImage)) {
			{}
		}
		else {
			setMyList(myList.concat(pImage))
		}
	}

	const list = () => {
		return (
			<>
				<div className='row-title'>
					<h2>My List</h2>					
				</div>
				<Cards images={myList} />
			</>
			)
	}


	const rows = () => {
			return (
				categories.map((x) =>
					<Categories category={x} key={x} />
					)
				)
	}
  return (
    <div className="app">
    	<div className="container">
		    <Header />
		    <Premiere pImage={pImage} clicked={handleList} myList={myList} />
	    </div>
	    {viewList ? list() : null}
	    {rows()}
    </div>
  );
}

export default App;
