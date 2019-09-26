import React, {useState, useEffect} from 'react';
import './cards.css';
import axios from 'axios';
import Modal from './modal'

const Cards = (props) => {											//try passing in as { title, topic }

	const [images, setImages] = useState([]);


	const baseUrl = `https://api.themoviedb.org/3/movie/` + props.category + `?api_key=d5ba9815eee72ec8ecb7839af9af7ad6`; //use props.topic?

	let newImages = [];


	const handleClick = (e) => {
		const element = e.target.nextElementSibling.nextElementSibling;
		const windowSize = document.documentElement.scrollWidth;
		const scrollDistance = ((windowSize * 2.43) * 0.6) / 5      //2.43 factor of how large element is to client size, traverse in 5 clicks
		element.scrollLeft += scrollDistance;
		const nextElement = e.target;
		const prevElement = e.target.nextElementSibling;
		setTimeout(() => {
			if (prevElement) {
			prevElement.setAttribute("class", "previous")
		}
		const checkScroll = Math.round(10 * (element.scrollLeft / element.scrollWidth)) / 10 //know ratio is ~0.6 at max scroll
		if (checkScroll === 0.6) {								//0.6 magic number pull out into constant
			nextElement.setAttribute("class", "hidden-next")
		}
	}, 500)
	}

	const handlePrevClick = (e) => {
		const element = e.target.nextElementSibling;
		const windowSize = document.documentElement.scrollWidth;
		const scrollDistance = ((windowSize * 2.43) * 0.6) / 5
		element.scrollLeft -= scrollDistance;
		const prevElement = e.target;
		const nextElement = e.target.previousElementSibling;
		setTimeout(() => {
			if (nextElement) {
			nextElement.setAttribute("class", "next")
		}
		const checkScroll = Math.round(10 * (element.scrollLeft / element.scrollWidth)) / 10
		if (checkScroll === 0) {
			prevElement.setAttribute("class", "hidden-prev")
		}
		}, 500)
	}

	const handleModal = (e) => {
		console.log(e.target)
	}
																//pass in card titles as props
	const rows = () => {
		return (
			images.map((img) => {
				return (
					<div className="cards" key={img.id}>
						<img src={img.image} onClick={handleModal}/>
					</div>
					)
			})
			)
	}


	useEffect(() => {
		async function fetchdata() {
			const res = await axios.get(baseUrl);
			const catalog = res.data.results.map(x => x.id);
			const proImages = await getImages(catalog);
		}
		const getImages = (catalog) => {
			new Promise ((resolve) => resolve(catalog.forEach((id) => axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d5ba9815eee72ec8ecb7839af9af7ad6`)
				.then((response) => {
					newImages.push({ id : response.data.id, image : 'https://image.tmdb.org/t/p/w154' + response.data.poster_path });
					setImages(images.concat(newImages));
				}))))
		}
		fetchdata()
	}, [])

	return (
		<>
			<div className='row-title'>
				<h2>{props.category}</h2>					
			</div>
			<div className='overall-container'>
				<div className='next' onClick={handleClick}>
					<p>PH</p>
				</div>
				<div className='hidden-prev' onClick={handlePrevClick}>
					<p>PH</p>
				</div>
				<div className='card-container'>
					{rows()}
				</div>
			</div>
		</>
	)
}

export default Cards