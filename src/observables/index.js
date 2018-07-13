import { extendObservable } from "mobx";

class AppState {
  constructor() {
    extendObservable(this, {
      counter: "counter from mobx observable",
      userInput: "",
      getUserInput(input) {
        this.userInput = input;
      },
      titles: [],
      desc: [],
      links: [],
      getTitles(titles, desc, links) {
        if (titles && this.userInput !== "") {
          this.titles = JSON.parse(titles);
          this.desc = JSON.parse(desc);
          this.links = JSON.parse(links);
        } else if (this.userInput === "") {
          this.titles = [];
        }
      },
      height: window.innerHeight,
      width: window.innerWidth,
      resizeHeight(height) {
        this.height = height;
      },
      resizeWidth(width) {
        this.width = width;
      }
    });
  }
}
export default AppState;
