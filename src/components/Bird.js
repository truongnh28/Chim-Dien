import React from 'react'
import './Bird.css'
import BirdImage from '../image/chim.png' 
import {connect} from 'react-redux'

const Bird = ({y, r}) => {
	return (
		<div 
			style={{
				position: 'absolute',
				top: y,
				left: 300,
				width: 60,
				height: 60,
				backgroundImage: `url(${BirdImage})`,
				backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
				// transform: `rotate(${r}deg)`,
        transition: 'transform 100ms, top 300ms'
			}}
		>
		</div>
	)
}

const mapStateToProps = ({bird}) => ({y: bird.y, r: bird.r})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Bird)

