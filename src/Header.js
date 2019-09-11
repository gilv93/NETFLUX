import React, {useEffect} from 'react';
import './header.css';


const Header = () => {

	const handleScroll = () => {
		let element = document.getElementById('header');
		let html = document.documentElement;
		if (html.scrollTop === 0) {
			element.style.background = "rgba(0, 0, 0, 0)";
		}
		else {
			element.style.background = "black";
		}
	}
	
	useEffect(() => window.addEventListener('scroll', handleScroll))
	
	return (
		<div id="header">
			<nav className="nav">
				<p>PH</p>
				<p>NETFLUX</p>
				<p>PH</p>
				<p>PH</p>
			</nav>
		</div>
	)
}



export default Header;