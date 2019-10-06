import React, { useState, useEffect } from 'react'
import './premiere.css'

const Premiere = (props) => {


	return (
		<div className="premiere">
			<div className="content">
					<h1>{props.pImage.title}</h1>
			</div>
			<img src={props.pImage.backdrop_image} alt={props.pImage.title} />
			<div className="shadow"></div>
			<div className="button-container">
				<button className="button">Play</button>
				<button className="button" type="button" onClick={props.clicked}>+ My List</button>
			</div>
		</div>
		)
}

export default Premiere