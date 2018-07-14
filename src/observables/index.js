import { extendObservable } from "mobx";
import Logo from '../assets/wikipedia.svg'
import Copy from '../assets/blue-copy.svg'

class AppState {
  constructor() {
    extendObservable(this, {
      logo: Logo,
      logoAnimate: "animated pulse",
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
      },
      copy(title, desc, link){
        let str = `
${title}
        
${desc}

${link}
`
        function copyToClipboard(text){
          let textArea = document.createElement('textarea')
          textArea.style.position = 'fixed';
          textArea.style.top = 0;
          textArea.style.left = 0;
          textArea.style.width = '2em';
          textArea.style.height = '2em';
          textArea.style.padding = 0;
          textArea.style.border = 'none';
          textArea.style.outline = 'none';
          textArea.style.boxShadow = 'none';
          textArea.style.background = 'transparent';
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();

          try {
            let successful = document.execCommand('copy');
            let msg = successful ? 'copied!' : 'unable to copy';
            console.log(msg);
          } catch (err) {
            console.log(err);
          }

          document.body.removeChild(textArea);
        }
        copyToClipboard(str)
      },
      pulseLogo(){
        this.logoAnimate = "animated zoomOut"
        
        setTimeout(()=> {
          this.logoAnimate = "animated zoomIn"
          this.logo = Copy
        }, 500)
        
        setTimeout(()=> {
          "animated pulse"
          this.logo = Logo
        }, 2500)
      }
      
    });
  }
}
export default AppState;





