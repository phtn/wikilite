import React, { Component } from 'react'
import Logo from './assets/wikipedia.svg'
import Github from './assets/github.svg'
import Twitter from './assets/twitter.svg'
import AppState from './observables'
import { observer } from 'mobx-react'
import ReactTooltip from 'react-tooltip'
import Hero from './components/Hero'
import './App.css'
import './animated.css'

const div = React.createFactory('div')
const element = React.createElement
const appState = new AppState()

console.log(appState.counter)

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-75px',
    height: appState.height
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
    marginTop: 100,
    
  },
  outputItem: {
    margin: 10,
    padding: 10,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400,
    borderRadius: 2,
    // zIndex: '-2'
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
    position: 'fixed',
    
    left: 10
  },
  twitter: {
    position: 'fixed',
    
    
  },
  tipTitle: {
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 1
  }
}


// Wikipedia callbacks
const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=parseResponse&search='
// const contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&%20Page&prop=revisions&rvprop=content&format=json&formatversion=2&titles='
let res, firstComma, firstPosition, firstArr, secondPosition, secondArr, thirdArr
// let parsedTitles, parsedDesc, parsedLinks
let block1, block2, block3


const Main = observer (
  class App extends Component {
    state={
      userInput: '',
      titles: [],
      newTitles: [],
      desc: '',
      links: '',
      titleCount: 0
    }
    setUserInput(userInput){
      this.setState({userInput})
    }
    getSearch(){
      
      let input = appState.userInput
      input = input.replace(/\s+/g, '+')
      let titleUrl = wikiUrl + input

      const xhr = new XMLHttpRequest()
      // xhr.overrideMimeType("application/json")
      xhr.open('GET', 'https://cors-anywhere.herokuapp.com/'+titleUrl, true )
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.send(null)
  
      xhr.onreadystatechange = async function() {
        if (xhr.readyState === 4) {
          res = await xhr.responseText
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
          block1 = firstArr.substr(firstComma+1)
          block2 = secondArr.substr(2, secondPosition-1)
          block3 = thirdArr.substr(2, thirdArr.length-4)
          // console.log(typeof block1)
          appState.getTitles(block1, block2, block3)
          // appState.getDesc(block2)
          // appState.getLinks(block3)
          
          // window.localStorage.setItem('titles', block1)
          // window.localStorage.setItem('desc', block2)
          // window.localStorage.setItem('links', block3)
        }
        
      }
      
      // if(localStorage.getItem('titles')){
      //   let titleItems = window.localStorage.getItem('titles')
      //   parsedTitles = JSON.parse(titleItems)
      // }
      // this.setState({titles: parsedTitles})
      // if(localStorage.getItem('desc')){
      //   let descItems = window.localStorage.getItem('desc')
      //   parsedDesc = JSON.parse(descItems)
      // }
      // this.setState({links: parsedDesc})
      // if(localStorage.getItem('links')){
      //   let linksItems = window.localStorage.getItem('links')
      //   parsedLinks = JSON.parse(linksItems)
      // }
      // this.setState({links: parsedLinks})
      // if (this.state.titles !== undefined && this.state.titles !== null ){
      //   if(this.state.titles.length !== null && this.state.titles.length !== undefined){
      //     this.setState({titleCount: this.state.titles.length})
      //   }
      // }
    }
  
    getTitles(title){
      let randAnim = ['zoomIn']
      if(title){
        return Object.keys(title).map(index => div(
          {
            style: Object.assign({}, styles.outputItem, {background: `rgba(119,136,153, 0.${index})`, WebkitAnimationDelay: `0.${index}s`}),
            key: index,
            className: `animated ${randAnim[Math.floor(Math.random()*randAnim.length)]}`,
            id: 'outputItem',
            "data-tip": true,
            // "data-event": "click focus",
            "data-for": `id-${index}`,
            // onClick: ()=> console.log(appState.desc[index])
          },
          title[index],
          element(ReactTooltip, {
            id: `id-${index}`,
            place: 'top',
            type: 'info',
            effect: 'solid',
            // globalEventOff: 'click',
            // delayHide: 100,
            className: 'tooltip'
          },
            element('p', {style: styles.tipTitle}, title[index]),
            // element('br', {style: {padding: 2}}),
            element('p',null, appState.desc[index]),
          
          )
        ))
      }
    }

    componentDidMount(){
      window.addEventListener('resize', () => {
        appState.resizeHeight(window.innerHeight)
        appState.resizeWidth(window.innerWidth)
      })
    }

    componentWillUnmount(){
      window.removeEventListener('resize', () => {
        appState.resizeHeight(window.innerHeight)
        appState.resizeWidth(window.innerWidth)
      })
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
                // this.setUserInput(e.target.value)
                this.getSearch()
                
                appState.getUserInput(e.target.value)
                // console.log(e.target.value)
                
              },
              autoFocus: true
            }),

            appState.userInput === '' ? element(Hero,null) : null,

            div({style: styles.output},
              div(null, 
                this.getTitles(appState.titles)
              ),
              appState.titles.length !== 0 && appState.userInput !== '' ? div({style: styles.maxResults}, 
                `Max results: ${appState.titles.length}`
              ) : null,
            )  
          ),
          div({style: Object.assign({}, styles.github, {top: appState.height - 30})},
            element('a', {href: 'https://github.com/phtn/wikilite'}, 
              element('img', {src: Github, height: 20, style: {opacity: 0.7}})
            )
          ),
          div({style: Object.assign({}, styles.twitter, {top: appState.height - 30, left: appState.width - 30})},
            element('a', {href: 'https://twitter.com/phtn458'}, 
              element('img', {src: Twitter, height: 20, style: {opacity: 0.7}})
            )
          ) 
        )
      )
    }
  }
)








export default Main
