import React from 'react'
import Salad from '../assets/salad.svg'

const element = React.createElement

/*
background-image: linear-gradient(to right top, #051937, #21324f, #3c4d67, #586a80, #778899);

*/

const styles = {
  container: {
    // backgroundColor: 'black',
    height: 300,
    width: 260,
    position: 'absolute',
    top: 200,
    borderRadius: 10,
    backgroundImage: 'linear-gradient(to left, rgba(178,254,250, 0.5), rgba(14,210,247, 0.3))',
    paddingTop: 50
  },
  header: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 24,
    fontWeight: 100,
    color: '#778899',
    // letterSpacing: 1
  },
  subheader: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 10,
    fontWeight: 400,
    color: '#778899',
    textTransform: 'uppercase',
    letterSpacing: 1
  }
}
const hero = () => {
  return element('div',{style: styles.container, className: 'animated bounceInUp'}, 
    element('img', {src: Salad, height: 100}),
    element('p', {style: styles.header}, 'Ultra lightweight' ),
    element('p', {style: styles.header}, 'Wikipedia.' ),
    element('p', {style: styles.subheader}, 'just add dressing' ),

  )
}
export default hero