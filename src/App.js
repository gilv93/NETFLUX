import React, { useState, useEffect } from 'react'
import './styles/app.scss'
import Header from './Header'
import Premiere from './premiere'
import Categories from './categories'
import Cards from './cards'
import Footer from './footer'
import axios from 'axios'




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
			const baseUrl = `https://shielded-castle-53505.herokuapp.com/movies/` + categories[Math.round(Math.random()*2)]
			const res = await axios.get(baseUrl)
			const select = res.data[Math.round(Math.random()*19)] //19 is n-1 objects in 1 page of API response
			const img = { id: select.id, title: select.title, overview: select.overview, image: 'https://image.tmdb.org/t/p/w154' + select.image, backdrop_image: `http://image.tmdb.org/t/p/w1280` + select.backdrop, video: select.video }
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

	// const checkScroll = () => {
	// 	const element = document.getElementById('mylist').nextElementSibling 
	// 	const windowSize = document.documentElement.scrollWidth;
	// 	if (element.scrollLeft != element.scrollWidth - windowSize) {
	// 		{}
	// 	}
	// }

	const handleList = () => {
		if (myList.find((x) => x.id === pImage.id)) {
			setMyList(myList.filter((x) => x.id != pImage.id))
		}
		else {
			setMyList(myList.concat(pImage))
		}
	}

	const handleModalList = (sub) => {
		if (myList.find((x) => x.id === sub.id)) {
			setMyList(myList.filter((x) => x.id != sub.id))
		}
		else {
			setMyList(myList.concat(sub))
		}
	}


	const list = () => {
		return (
			<>
				<div className='row-title' id='mylist'>
					<h2>My List</h2>					
				</div>
				<Cards images={myList} id={'myList'} />
			</>
			)
	}


	const rows = (e) => {
			return (
				categories.map((x) =>
					<Categories category={x} key={x} list={myList} change={handleModalList} />
					)
				)
	}

  return (
    <div className="app">
    	<div className="header-container">
		    <Header />
		    <Premiere pImage={pImage} clicked={handleList} myList={myList} />
	    </div>
	    {viewList ? list() : null}
	    {rows()}
	    <Footer />
    </div>
  );
}

export default App;
