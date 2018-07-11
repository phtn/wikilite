import React, { Component } from 'react'
import Logo from './assets/wikipedia.svg'
import Github from './assets/github.svg'

import './App.css'
import './animated.css'

const div = React.createFactory('div')
const element = React.createElement

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-75px',
    height: '100vh'
  },
  content: {
    textAlign: 'center'
  },
  logo: {
    height: 30,
    float: 'left',
    marginRight: 20,
    opacity: 0.5
  },
  title: {
    float: 'left',
    lineHeight: '0px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 200,
    fontSize: 48,
    color: '#778899'
    // margin: 0
  },
  lite: {
    fontWeight: 100,
  },
  input: {
    height: 20,
    width: 250,
    float: 'left',
    padding: 5,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    border: 'none',
    borderBottom: '1px solid gray'

  },
  output: {
    height: 300,
    width: 260,
    // border: '1px solid gray',
    marginTop: 100,
    // margin: 20
  },
  outputItem: {
    margin: 10,
    padding: 10,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400,
    borderRadius: 2
  },
  maxResults: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: 12,
    backgroundColor: '#eee',
    color: 'rgba(0,109,240, 0.5)',
    borderRadius: 3,
    padding: 5
  },
  github: {
    position: 'absolute',
    top: window.innerHeight - 25,
    left: 10
  }
}


// Wikipedia callbacks
const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=parseResponse&search='
// const contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&%20Page&prop=revisions&rvprop=content&format=json&formatversion=2&titles='
let parsedTitles, parsedDesc, parsedLinks

class App extends Component {
  state={
    userInput: '',
    titles: [],
    desc: '',
    links: '',
    titleCount: 0
  }
  setUserInput(userInput){
    this.setState({userInput})
  }
  getSearch(word){
    
    let input = word
    input = input.replace(/\s+/g, '+')
    let titleUrl = wikiUrl + input
    const xhr = new XMLHttpRequest()
    // xhr.overrideMimeType("application/json")
    xhr.open('GET', 'https://cors-anywhere.herokuapp.com/'+titleUrl, true )
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.send(null)
    
    let res, firstComma, firstPosition, firstArr, secondPosition, secondArr, thirdArr

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        res = xhr.responseText
        // console.log(res)
        
          firstComma = res.indexOf(',')
          firstPosition = res.indexOf('],[', 0)
          
          // console.log(firstPosition)
          firstArr = res.substr(0, firstPosition+1)
          secondArr = res.substr(firstPosition)
          secondPosition = secondArr.indexOf('],[', 2)
          // console.log(secondPosition)

          thirdArr = secondArr.substr(secondPosition)
          // console.log(firstArr.substr(firstComma+1))
          // console.log(secondArr.substr(2, secondPosition-1))
          // console.log(thirdArr.substr(2, thirdArr.length-4))
        
      }
      if (res !== undefined){
        let block1 = firstArr.substr(firstComma+1)
        let block2 = secondArr.substr(2, secondPosition-1)
        let block3 = thirdArr.substr(2, thirdArr.length-4)
        // console.log(typeof block1)
        window.localStorage.setItem('titles', block1)
        window.localStorage.setItem('desc', block2)
        window.localStorage.setItem('links', block3)
      }
    }
    
    if(localStorage.getItem('titles')){
      let titleItems = window.localStorage.getItem('titles')
      parsedTitles = JSON.parse(titleItems)
    }
    this.setState({titles: parsedTitles})
    if(localStorage.getItem('desc')){
      let descItems = window.localStorage.getItem('desc')
      parsedDesc = JSON.parse(descItems)
    }
    this.setState({links: parsedDesc})
    if(localStorage.getItem('links')){
      let linksItems = window.localStorage.getItem('links')
      parsedLinks = JSON.parse(linksItems)
    }
    this.setState({links: parsedLinks})

    if (this.state.titles !== undefined && this.state.titles !== null ){
      if(this.state.titles.length !== null && this.state.titles.length !== undefined){
        this.setState({titleCount: this.state.titles.length})
      }
      
    }
    
  }

  checkUserInput(input){
    if (input === ''){
      localStorage.removeItem('titles', 'desc', 'links')
      this.setState({titles: null})
    }
  }

  getTitles(state){
    let randAnim = ['zoomIn']
    if(state){
      return Object.keys(state).map(index => div(
        {
          style: Object.assign({}, styles.outputItem, {background: `rgba(119,136,153, 0.${index})`, WebkitAnimationDelay: `0.${index}s`}),
          key: index,
          className: `animated ${randAnim[Math.floor(Math.random()*randAnim.length)]}`
        },
        state[index]
      ))    // console.log(state[index])
    }
  }
  
  render() {
    // this.getTitles(this.state.titles)
    // console.log(this.state.titleCount)
    return (
      div({style: styles.container},
        div({style: styles.content},
          div(null,
            element('img', {style: styles.logo, src: Logo}),
            element('h1',{style: styles.title}, element('span',null,
              element('span', null, 'wiki'),
              element('span', null, '·'),
              element('span', {style: styles.lite}, 'lite'),
            ))
            
          ),
          element('input',{
            style: styles.input, placeholder: 'search',
            onChange: (e)=> {
              this.setUserInput(e.target.value)
              this.getSearch(e.target.value)
              this.checkUserInput(e.target.value)
              // console.log(e.target.value)
            },
            autoFocus: true
          }),
          div({style: styles.output},
            div(null, 
              this.getTitles(this.state.titles)
            ),
            this.state.titleCount !== 0 && this.state.userInput !== '' ? div({style: styles.maxResults}, 
              `Max results: ${this.state.titleCount}`
            ) : null,
          )  
        ),
        div({style: styles.github},
          element('a', {href: 'https://github.com/phtn/wikilite'}, 
            element('img', {src: Github, height: 20})
          )
          
        ) 
      )
    )
  }
}

export default App
