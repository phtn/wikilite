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
		  duration:      2000,
		  angle:        { 0: 360 },
		  easing:        'cubic.out',
		}).play()

	new mojs.Shape({
		  shape:        'polygon',
      scale:         { 0 : .15 },
		  points: 			 6,
		  top: 					 top,
		  left: 				 width,
		  fill: 				 {'#006DF0': 'none'},
		  stroke: 			 {'#666': '#666', easing: 'cubic.out'},
		  strokeWidth:   { 5: 0 },
		  strokeDasharray: '100%',
		  strokeDashoffset: { '-100%' : '100%' },
		  duration:      1500,
		  angle:        { 180: 0 },
		  easing:        'cubic.out',
			repeat: 			0,
			delay: 				700
		}).play()
}
export default props => (
  <div>
    {photons(props.top + 16, props.width * 0.5)}
  </div>
)