import React, {useState, useEffect} from 'react'
import './cards.css'
import axios from 'axios'
import Modal from './modal'

const Cards = (props) => {											//try passing in as { title, topic }

	const [images, setImages] = useState([]);
	const [modal, setModal] = useState('');
	const [viewModal, setViewModal] = useState(false);
	const [videoLink, setVideoLink] = useState('')



	const handleClick = (e) => {
		const element = e.target.nextElementSibling.nextElementSibling;
		const windowSize = document.documentElement.scrollWidth;
		const scrollDistance = ((windowSize * 2.43) * 0.6) / 5;     //2.43 factor of how large element is to client size, traverse in 5 clicks
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
	};

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
	};

	const handleModal = (e) => {
		const relevant = images.find((img) => img.id.toString() === e.target.id);
		setModal({ id: e.target.id, title: relevant.title, overview: relevant.overview });
		document.body.style.overflowY = 'hidden';
	}

	const exit = (e) => {
		setViewModal(false);
		document.body.style.overflowY = 'scroll';
		document.body.style.opacity = '1'
	}
																//pass in card titles as props
	const rows = () => {
		return (
			images.map((img) => {
				return (
					<div className="cards" key={img.id}>
						<img src={img.image} id={img.id} onClick={handleModal} alt={img.title} />
					</div>
					)
			})
			)
	}


	useEffect(() => {
		async function fetchdata() {
			const baseUrl = `https://api.themoviedb.org/3/movie/` + props.category + `?api_key=d5ba9815eee72ec8ecb7839af9af7ad6`; //use props.topic?
			const res = await axios.get(baseUrl);
			const catalog = res.data.results.map(x => ({ id: x.id, title: x.title, overview: x.overview, image: 'https://image.tmdb.org/t/p/w154' + x.poster_path }));
			setImages(catalog)
		}
		fetchdata()
	}, [])

	useEffect(() => {
		const getKey = (res) => {
			try {
				const link = res.data.results[0].key
				return link
			}
			catch {
				return 'not found!'
			}
		}

		async function fetchvideo() {
			const res = await axios.get(`https://api.themoviedb.org/3/movie/${modal.id}/videos?api_key=d5ba9815eee72ec8ecb7839af9af7ad6&language=en-US`);
			const link = await getKey(res);
			const vid = 'https://youtube.com/embed/' +  link;
			setVideoLink(vid);
			setViewModal(true);
		}
		fetchvideo()
	}, [modal])

	return (
		<>
			<div className='row-title'>
				<h2>{props.category.replace('_', ' ').split(' ').map((x) => x[0].toUpperCase() + x.slice(1)).join(' ')}</h2>					
			</div>
			{ viewModal ? <Modal click={exit} id={modal.id} overview={modal.overview} video={videoLink} title={modal.title} /> : null}
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