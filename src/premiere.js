import React, { useState, useEffect } from 'react'
import './premiere.css'
import axios from 'axios'

const Premiere = (props) => {

	const [pImage, setPImage] = useState('')

	useEffect(() => {
		async function fetchImage() {
			const baseUrl = `https://api.themoviedb.org/3/movie/` + props.category + `?api_key=d5ba9815eee72ec8ecb7839af9af7ad6`
			const res = await axios.get(baseUrl)
			const select = res.data.results[Math.round(Math.random()*19)]
			const img = { title: select.title, image: `http://image.tmdb.org/t/p/w1280/` + select.backdrop_path }
			setPImage(img)
		}
		fetchImage()
	}, [])

	return (
		<div className="premiere">
			<div className="content">
					<h1>{pImage.title}</h1>
			</div>
			<img src={pImage.image} alt={pImage.title} />
			<div className="shadow"></div>
			<div className="button-container">
				<button className="button">Play</button>
				<button className="button">+ My List</button>
			</div>
		</div>
		)
}

export default Premiere