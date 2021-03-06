import React, { Component } from "react";
import Github from "./assets/github.svg";
import Twitter from "./assets/twitter.svg";
import Copy from "./assets/copy.svg";
import Link from "./assets/link.svg";
import Medal from "./assets/medal_2.svg";
import AppState from "./observables";
import { observer } from "mobx-react";
import ReactTooltip from "react-tooltip";
import Hero from "./components/Hero";
import Loader from "./loader";
import styles from "./styles";
import "./App.css";
import "./animated.css";

const div = React.createFactory("div");
const element = React.createElement;
const appState = new AppState();

const wikiUrl =
  "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=parseResponse&search=";
const anywhere = "https://cors-anywhere.herokuapp.com/";
// const contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&%20Page&prop=revisions&rvprop=content&format=json&formatversion=2&titles='
let res,
  firstComma,
  firstPosition,
  firstArr,
  secondPosition,
  secondArr,
  thirdArr;
let block1, block2, block3;

const Main = observer(
  class App extends Component {

    getSearch() {
      let input = appState.userInput;
      input = input.replace(/\s+/g, "+");
      let titleUrl = wikiUrl + input;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", anywhere + titleUrl, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.send(null);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          res = xhr.responseText;
          firstComma = res.indexOf(",");
          firstPosition = res.indexOf("],[", 0);
          firstArr = res.substr(0, firstPosition + 1);
          secondArr = res.substr(firstPosition);
          secondPosition = secondArr.indexOf("],[", 2);
          thirdArr = secondArr.substr(secondPosition);
        }
        if (res !== undefined) {
          block1 = firstArr.substr(firstComma + 1);
          block2 = secondArr.substr(2, secondPosition - 1);
          block3 = thirdArr.substr(2, thirdArr.length - 4);
          appState.getTitles(block1, block2, block3);
        }
      };
    }
    getTitles(title) {
      if (title) {
        return Object.keys(title).map(index =>
          div(
            {
              style: Object.assign({}, styles.outputItem, {
                background: `rgba(119,136,153, 0.${index})`,
                WebkitAnimationDelay: `0.${index}s`
              }),
              key: index,
              id: "outputItem",
              className: "animated zoomIn",
              "data-tip": true,
              "data-event": "click",
              "data-event-off": "mouseout",
              "data-for": `id-${index}`
            },
            title[index],
            element(
              ReactTooltip,
              {
                id: `id-${index}`,
                place: "top",
                type: "info",
                effect: "solid",
                delayHide: 1500,
                globalEventOff: "click",
                className: "tooltip"
              },
              element("p", { style: styles.tipTitle }, title[index]),
              element("p", null, appState.desc[index]),
              div(
                { style: styles.actionDiv },
                element(
                  "button",
                  {
                    style: styles.copyButton,
                    className: "copy-button",
                    onMouseDown: () => {
                      appState.copy(
                        appState.titles[index],
                        appState.desc[index],
                        appState.links[index]
                      );
                      appState.pulseLogo();
                    }
                  },
                  element("img", { style: styles.actionIcon, src: Copy }),
                  element("p", { style: styles.actionLabel }, "copy")
                ),
                element(
                  "a",
                  {
                    style: { textDecoration: "none" },
                    href: appState.links[index]
                  },
                  element(
                    "button",
                    { style: styles.moreButton, className: "more-button" },
                    element("img", { style: styles.actionIcon, src: Link }),
                    element("p", { style: styles.actionLabel }, "more")
                  )
                )
              )
            )
          )
        );
      }
    }
    componentDidMount() {
      window.addEventListener("resize", () => {
        appState.resizeHeight(window.innerHeight);
        appState.resizeWidth(window.innerWidth);
      });
      let searchInput = document.getElementById("search-input");
      let rect = searchInput.getBoundingClientRect();
      // console.log(rect)
      appState.setInputTop(rect.top);
    }
    componentWillUnmount() {
      window.removeEventListener("resize", () => {
        appState.resizeHeight(window.innerHeight);
        appState.resizeWidth(window.innerWidth);
      });
    }
    render() {
      // appState.typeWriter(appState.placeholderLength)
      console.log(appState.height)
      return div(
        {
          className: "main-div",
          style: Object.assign({}, styles.container, {
            height: appState.height,
            marginTop: appState.height * 0.12
          })
        },
        div(
          { style: styles.content },
          div(
            null,
            element("img", {
              style: styles.logo,
              src: appState.logo,
              className: appState.logoAnimate
            }), // LOGO
            element(
              "h1",
              { style: styles.title },
              element(
                "span",
                null,
                element("span", null, "wiki"),
                element("span", null, "·"),
                element("span", { style: styles.lite }, "lite")
              )
            )
          ),
          element("input", {
            // INPUT
            style: styles.input,
            placeholder: appState.placeholder,
            onChange: e => {
              appState.getUserInput(e.target.value); // GET SEARCH TEXT
              appState.resetAllData(appState.userInput); // CLEAR MOBX ARRAYS
              this.getSearch(); // XHR CALL
            },
            autoFocus: true,
            id: "search-input"
          }),

          appState.userInput === ""
            ? element(Hero, { height: appState.height })
            : null, // HERO

          div(
            { style: styles.output },
            appState.userInput !== ""
              ? appState.desc.length === 10
                ? div(
                    { style: styles.rankOne },
                    appState.desc[0] !== ""
                      ? !appState.desc[0].includes("refer to:")
                        ? element("img", {
                            style: styles.medal,
                            src: Medal,
                            className: "animated zoomIn"
                          })
                        : null
                      : null,
                    element(
                      "p",
                      {
                        style: styles.rankOneTitle,
                        className: "animated fadeInUp"
                      },
                      appState.titles[0]
                    ),
                    element(
                      "p",
                      {
                        style: styles.rankOneDesc,
                        className: "animated fadeInUp"
                      },
                      appState.desc[0]
                    )
                  )
                : element(Loader, {
                    top: appState.inputTop,
                    width: appState.width
                  })
              : null,
            appState.titles.length !== 0 && appState.userInput !== ""
              ? div(
                  { style: styles.maxResults },
                  `Max results: ${appState.titles.length}`
                )
              : null,
            div(null, this.getTitles(appState.titles)) // OUTPUT
          )
        ),

        
        div(
          {
            // GITHUB
            style: Object.assign({}, styles.github, {
              top: appState.height - 30,
              WebkitAnimationDelay: "1s",
              // backgroundColor: 'black'
            }),
            className: "animated rollIn"
          },
          element(
            "a",
            { href: "https://github.com/phtn/wikilite" },
            element("img", { src: Github, height: 20, style: { opacity: 0.7 } })
          )
        ),
        div(
          {
            // TWITTER
            style: Object.assign({}, styles.twitter, {
              top: appState.height - 30,
              left: appState.width - 30,
              WebkitAnimationDelay: "1.5s"
            }),
            className: "animated rollIn"
          },
          element(
            "a",
            { href: "https://twitter.com/phtn458" },
            element("img", {
              src: Twitter,
              height: 20,
              style: { opacity: 0.7 }
            })
          )
        )
      );
    }
  }
);
export default Main;
