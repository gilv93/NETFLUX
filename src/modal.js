import React, { useState, useEffect } from 'react'
import './styles/modal.scss'

const Modal = (props) => {

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (props.video.includes('not found!')) {
			const error = document.createElement('h1')
			error.innerText = 'Video not found!';
			const element = document.getElementById('loading');
			element.insertBefore(error, element.children[1]);
			setLoading(false);

		}
		else {
			const iframe = document.createElement('iframe')
			iframe.src = props.video
			iframe.title = "loading"
			iframe.style.border = "none"
			iframe.style.display = "none"
			iframe.className = "iframe"
			const element = document.getElementById('loading')
			element.insertBefore(iframe, element.children[1])
			iframe.onload = function() {
					setLoading(false)
					iframe.onload = null
					iframe.style.display = "block"
			}
		}
	}, [])

	const pView = () => {
		if (props.list.find((x) => x.id === props.info.id)) {
			return (
				<div className="button" onClick={add}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
					&nbsp;My List
				</div>
			)
		}
		else {
			return (
				<div className="button" onClick={add}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
					&nbsp;My List
				</div>
			)
		}
	}

	const add = () => {
		props.change(props.info)
	}

	const textCheck = () => {
		if (props.info.title.length < 28) {
			return (
					<h1 id="info">{props.info.title}</h1>
			)
		}
		else {
			return (
					<h1 id="info" style={{fontSize: "2em", paddingTop: "1.2em"}}>{props.info.title}</h1>
			)
		}
	}

	const loaded = () => {
		return (
			<div className='info'>
				<div className="exit" onClick={props.click}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
				</div>
			 	{textCheck()}
			 	<p>{props.info.overview}</p> 
			 	{pView()}
			 </div>
			)
	}


	return (
		<>
			<div className="background" onClick={props.click}>
			</div>
			<div className ="modal" id="loading">
				{ loading ? <div className="loading-text"><h1>.....</h1></div> : <div className="loading-text"></div> }
				{ loading ? null : loaded() }
			</div>
		</>
		)
}


export default Modal