import React, {useState, useEffect} from 'react'
import './styles/categories.scss'
import axios from 'axios'
import Cards from './cards'

const Categories = (props) => {

	const [images, setImages] = useState([]);

	useEffect(() => {
		async function fetchdata() {
			const baseUrl = `https://shielded-castle-53505.herokuapp.com/movies/` + props.category; //use props.topic?
			const res = await axios.get(baseUrl);
			const catalog = res.data.map(x => ({ id: x.id, title: x.title, overview: x.overview, image: 'https://image.tmdb.org/t/p/w154' + x.image, video: x.video}));
			setImages(catalog)
		}
		fetchdata()
	}, [])

	return (
		<>
			<div className='row-title'>
				<h2>{props.category.replace('_', ' ').split(' ').map((x) => x[0].toUpperCase() + x.slice(1)).join(' ')}</h2>					
			</div>
			<Cards images={images} change={props.change} list={props.list} id={props.category} />
		</>
		)
}


export default Categories