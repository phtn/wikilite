import React from 'react'
import mojs from 'mo-js'

const photons = (height, width) => {
	new mojs.Shape({
		  shape:        'circle',
		  points: 			 6,
		  scale:         { 0 : .3 },
		  top: 					 height,
		  left: 				 width,
		  fill: 				 'none',
		  stroke: 			 {'#778899': '#778899', easing: 'cubic.out'},
		  strokeWidth:   { 5: 0 },
		  strokeDasharray: '100%',
		  strokeDashoffset: { '-100%' : '100%' },
		  duration:      1000,
		  angle:        { 0: 270 },
		  easing:        'cubic.out',
		  repeat: 			1
		}).play()

	new mojs.Shape({
		  shape:        'polygon',
		  scale:         { 0 : .2 },
		  top: 					 height,
		  left: 				 width,
		  fill: 				 'none',
		  stroke: 			 {'#666': '#666', easing: 'cubic.out'},
		  strokeWidth:   { 5: 0 },
		  strokeDasharray: '100%',
		  strokeDashoffset: { '-100%' : '100%' },
		  duration:      1000,
		  angle:        { 0: 180 },
		  easing:        'cubic.out',
		  repeat: 			1
		}).play()
}

// const zeroPhotons = () => {
// 	new mojs.Shape({
// 		shape: 'circle',
// 		radius: 0
// 	})
// }
// const loadPhotons = (type) => {
// 	if (type === 'Office') {
// 		photons()
// 	} else {
// 		zeroPhotons()
// 	}
// }

export default props => (
  <div>
    {photons(props.height * 0.30, props.width * 0.5)}
  </div>
)