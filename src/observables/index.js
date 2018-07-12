import { extendObservable } from 'mobx'

class AppState {
  constructor(){
    extendObservable(this, {
      counter: 'counter from mobx observable',
      userInput: '',
      getUserInput(input){
        this.userInput = input
        // console.log(this.userInput)
      },
      titles: [],
      desc: [],
      links: [],
      getTitles(titles){
        if (titles && this.userInput !== ''){
          this.titles = JSON.parse(titles)
        } else if (this.userInput === ''){
          this.titles = []
        }
        // console.log(this.titles)
      },
      getDesc(desc){
        if (desc && this.userInput !== ''){
          this.desc = JSON.parse(desc)
        } else if (this.userInput === ''){
          this.desc = []
        }
        // console.log(this.desc)
      },
      getLinks(links){
        if (links && this.userInput !== ''){
          this.links = JSON.parse(links)
        } else if (this.userInput === ''){
          this.links = []
        }
        // console.log(this.links)
      }
      


    })
  }
}
export default AppState