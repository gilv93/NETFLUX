import React, {useState, useEffect} from 'react';
import './cards.css';
import axios from 'axios';

const Cards = (props) => {											//try passing in as { title, topic }

	const [images, setImages] = useState([]);


	const baseUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=d5ba9815eee72ec8ecb7839af9af7ad6`; //use props.topic?

	let newImages = [];
/*
	const currentState = () => {
		cardContainer: document.getElementById('card-container'),
		windowSize: document.documentElement.scrollWidth,
	}*/


	const handleClick = () => {
/*		const { cardContainer } = currentState();*/
		const element = document.getElementById('card-container');
		const windowSize = document.documentElement.scrollWidth
		const scrollDistance = ((windowSize * 2.43) * 0.6) / 5      //2.43 factor of how large element is to client size, traverse in 5 clicks
		element.scrollLeft += scrollDistance;
		const nextElement = document.getElementById('next')
		const prevElement = document.getElementById('hidden-prev')
		setTimeout(() => {
			if (prevElement) {
			prevElement.setAttribute("id", "previous")
		}
		const checkScroll = Math.round(10 * (element.scrollLeft / element.scrollWidth)) / 10 //know ratio is ~0.6 at max scroll
		if (checkScroll === 0.6) {								//0.6 magic number pull out into constant
			nextElement.setAttribute("id", "hidden-next")
		}
	}, 500)
	}

	const handlePrevClick = () => {
		const element = document.getElementById('card-container');
		const windowSize = document.documentElement.scrollWidth
		const scrollDistance = ((windowSize * 2.43) * 0.6) / 5
		element.scrollLeft -= scrollDistance;
		const prevElement = document.getElementById('previous')
		const nextElement = document.getElementById('hidden-next')
		setTimeout(() => {
			if (nextElement) {
			nextElement.setAttribute("id", "next")
		}
		const checkScroll = Math.round(10 * (element.scrollLeft / element.scrollWidth)) / 10
		if (checkScroll === 0) {
			prevElement.setAttribute("id", "hidden-prev")
		}
		}, 500)
	}
																//pass in card titles as props
	const rows = () => {
		let  counter = 0
		return (
			images.map((img) => {
				counter += 1
				return (
					<div className="cards" key={counter}>
						<img src={img} />
					</div>
					)
			})
			)
	}

	useEffect(() => {
		document.getElementById('next').addEventListener('click', handleClick)
		document.getElementById('hidden-prev').addEventListener('click', handlePrevClick)
	}, [])

	useEffect(() => {
		async function fetchdata() {
			const res = await axios.get(baseUrl);
			const catalog = res.data.results.map(x => x.id);
			const proImages = await getImages(catalog);
		}
		const getImages = (catalog) => {
			new Promise ((resolve) => resolve(catalog.forEach((id) => axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d5ba9815eee72ec8ecb7839af9af7ad6`)
				.then((response) => {
					newImages.push('https://image.tmdb.org/t/p/w154' + response.data.poster_path);
					setImages(images.concat(newImages));
				}))))
		}
		fetchdata()
	}, [])

	return (
		<>
			<div className='row-title'>
				<h2>Highest Rated:</h2>					
			</div>
			<div id='overall-container'>
				<div id='next'>
					<p>PH</p>
				</div>
				<div id='hidden-prev'>
					<p>PH</p>
				</div>
				<div id='card-container'>
					{rows()}
				</div>
			</div>
		</>
	)
}

export default Cards