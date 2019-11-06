import React, { useState, useEffect, useRef } from 'react'
import './styles/premiere.scss'
import axios from 'axios'

const Premiere = (props) => {

	const [viewVideo, setViewVideo] = useState(false)

	const videoRef = useRef('')


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
			//TODO DID YOU COMMIT THIS API KEY
			const res = await axios.get(`https://api.themoviedb.org/3/movie/${props.pImage.id}/videos?api_key=d5ba9815eee72ec8ecb7839af9af7ad6&language=en-US`)
			.catch(error => 'empty');
			if (res === 'empty') {
				{}
			}
			else {
				const link = await getKey(res);
				//TODO PULL THIS INTO A FUNCTION U BUM
				const vid = 'https://youtube.com/embed/' +  link + '?autoplay=1&controls=0&modestbranding=1';
				videoRef.current = vid;
			}
		}
		fetchvideo()
	}, [props.pImage])

	const pView = () => {
		if (props.myList.find((x) => x.id === props.pImage.id)) {
			return (
				<div className="button" onClick={props.clicked}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
					My List
				</div>
			)
		}
		else {
			return (
				<div className="button" onClick={props.clicked}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
					My List
				</div>
			)
		}
	}

	const playVideo = () => {
		if (viewVideo) {
			return (
				<>
					<div className="show">
						<iframe src={videoRef.current} className="iframe-top" frameborder="0" />
						<div className="shadow"></div>	
					</div>
					<div className="content">
						<h1>{props.pImage.title}</h1>
						<div className="button-container">
							<div className="button" onClick={play}>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
								Pause
							</div>
							{pView()}
						</div>
						<p>{props.pImage.overview}</p>	
					</div>
				</>
				)
		}
		else {
			return (
			<>
				<div className="show">
					<img src={props.pImage.backdrop_image} alt={props.pImage.title} />
					<div className="shadow"></div>
				</div>
				<div className="content">
					<h1>{props.pImage.title}</h1>
					<div className="button-container">
						<div className="button" onClick={play}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
							Play
						</div>
						{pView()}
					</div>
					<p>{props.pImage.overview}</p>
				</div>
			</>
			)
		}
	}

	const play = () => {
		if (viewVideo) {
			setViewVideo(false)
		}
		else {
			setViewVideo(true)
		}
	}

	return (
		<div className="premiere">
			{playVideo()}
		</div>
		)
}

export default Premiere