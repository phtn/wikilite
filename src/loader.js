import React from 'react'
import mojs from 'mo-js'

const photons = (top, width) => {
	new mojs.Shape({
		  shape:        'circle',
		  scale:         { 0.2 : 0.2 },
		  top: 					 top,
		  left: 				 width,
		  fill: 				 'none',
		  stroke: 			 {'#006DF0': '#eee', easing: 'cubic.out'},
		  strokeWidth:   { 10: 0 },
		  strokeDasharray: '100%',
		  strokeDashoffset: { '-100%' : '250%' },
		  duration:      4000,
		  angle:        { 0: 360 },
		  easing:        'cubic.out',
		  repeat: 			1
		}).play()

	new mojs.Shape({
		  shape:        'polygon',
      scale:         { 0 : .1 },
		  points: 			 6,
		  top: 					 top,
		  left: 				 width,
		  fill: 				 {'#006DF0': 'none'},
		  stroke: 			 {'#666': '#666', easing: 'cubic.out'},
		  strokeWidth:   { 5: 0 },
		  strokeDasharray: '100%',
		  strokeDashoffset: { '-100%' : '100%' },
		  duration:      2500,
		  angle:        { 180: 0 },
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