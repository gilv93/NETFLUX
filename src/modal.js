import React, { useState, useEffect } from 'react'
import './modal.css'

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

	const loaded = () => {
		return (
			<div className='info'>
			 	<h1>{props.info.title}</h1>
			 	<p>{props.info.overview}</p> 
			 	<button onClick={props.click}>exit</button>
			 </div>
			)
	}

	return (
		<>
			<div className="background">
			</div>
			<div className ="modal" id="loading">
				{ loading ? <div className="loading-text"><h1>.....</h1></div> : <div className="loading-text"></div> }
				{ loading ? null : loaded() }
			</div>
		</>
		)
}


export default Modal