import React, { useState, useEffect } from 'react'
import './styles/cards.scss'
import Modal from './modal'

const Cards = (props) => {											//try passing in as { title, topic }

	const [modal, setModal] = useState('');
	const [viewModal, setViewModal] = useState(false);
	const [videoLink, setVideoLink] = useState('')			
	
	const handleClick = (e) => {
		const element = e.target.nextElementSibling.nextElementSibling;
		const windowSize = document.documentElement.scrollWidth;
		const scrollDistance = (element.scrollWidth / 5)
		element.scrollLeft += scrollDistance;
		const nextElement = e.target;
		const prevElement = e.target.nextElementSibling;
		setTimeout(() => {
			if (prevElement) {
			prevElement.setAttribute("class", "previous")
		}
		if (element.scrollLeft > element.scrollWidth - windowSize) {
			nextElement.setAttribute("class", "hidden-next")
		}
	}, 500)
	};

	const handlePrevClick = (e) => {
		const element = e.target.nextElementSibling;
		// const windowSize = document.documentElement.scrollWidth;
		const scrollDistance = (element.scrollWidth / 5)
		element.scrollLeft -= scrollDistance;
		const prevElement = e.target;
		const nextElement = e.target.previousElementSibling;
		setTimeout(() => {
			if (nextElement) {
			nextElement.setAttribute("class", "next")
		}
		if (element.scrollLeft < 10) {
			prevElement.setAttribute("class", "hidden-prev")
		}
		}, 500)
	};

	const handleModal = (e) => {
		const relevant = props.images.find((img) => img.id.toString() === e.target.id);
		setModal(relevant);
		document.body.style.overflowY = 'hidden';
	}


	const exit = (e) => {
		setViewModal(false);
		setModal('')
		document.body.style.overflowY = 'scroll';
		document.body.style.opacity = '1'
	}


	const checkType = () => {
		const doc = document.documentElement.clientWidth
		if ((props.images.length > 8) || ((props.images.length > 5) && (doc < 1024))) {
			return (
					<div className='next' onClick={handleClick}>
						<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
					</div>
				) 
		}
		else {
			return <div className="hidden-next"></div>
		}
	}

	const rows = () => {
		return (
			props.images.map((img) => {
				return (
					<div className="cards" key={img.id}>
						<img src={img.image} id={img.id} onClick={handleModal} alt={img.title} />
					</div>
					)
			})
			)
	}


	useEffect(() => {

		async function fetchvideo() {
			if (modal.video === undefined) {
				{}
			}
			else {
				const vid = 'https://youtube.com/embed/' +  modal.video;
				setVideoLink(vid);
				setViewModal(true);
			}
		}
		fetchvideo()
	}, [modal])


	return (
		<>
			{ viewModal ? <Modal click={exit} info={modal} video={videoLink} change={props.change} list={props.list} /> : null}
			<div className='overall-container'>
				{checkType()}
				<div className='hidden-prev' onClick={handlePrevClick}>
					<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
				</div>
				<div className='card-container'>
					{rows()}
				</div>
			</div>
		</>
	)
}

export default Cards