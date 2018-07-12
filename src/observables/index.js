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
      empty: [],
      getTitles(titles){
        if (titles && this.userInput !== ''){
          this.titles = JSON.parse(titles)
        } else if (this.userInput === ''){
          this.titles = []
        }
        console.log(this.titles)
      },
      


    })
  }
}
export default AppState