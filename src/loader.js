import React from 'react'
import mojs from 'mo-js'

const photons = (top, width) => {
	new mojs.Shape({
		  shape:        'circle',
		  points: 			 1,
		  scale:         { 0 : .2 },
		  top: 					 top,
		  left: 				 width,
		  fill: 				 'none',
		  stroke: 			 {'#006DF0': '#006DF0', easing: 'cubic.out'},
		  strokeWidth:   { 15: 0 },
		  strokeDasharray: '100%',
		  strokeDashoffset: { '-100%' : '100%' },
		  duration:      2000,
		  angle:        { 0: 360 },
		  easing:        'cubic.out',
		  repeat: 			1
		}).play()

	new mojs.Shape({
		  shape:        'polygon',
		  scale:         { 0 : .2 },
		  top: 					 top,
		  left: 				 width,
		  fill: 				 {'#006DF0': 'none'},
		  stroke: 			 {'#666': '#666', easing: 'cubic.out'},
		  strokeWidth:   { 5: 0 },
		  strokeDasharray: '100%',
		  strokeDashoffset: { '-100%' : '100%' },
		  duration:      1500,
		  angle:        { 450: 0 },
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
    {photons(props.top + 15.5, props.width * 0.5)}
  </div>
)