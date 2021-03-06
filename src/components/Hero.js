import React from "react";
// import Salad from "../assets/salad.svg";
import Avocado from "../assets/avocado.svg"
import Bean from "../assets/bean.svg"
import Broccoli from "../assets/broccoli.svg"
import Carrot from "../assets/carrot.svg"
import Mushrooms from "../assets/mushrooms.svg"
import Salad from "../assets/salad2.svg"
import Lettuce from "../assets/lettuce.svg"
const element = React.createElement;

const styles = {
  container: {
    height: 280,
    width: 260,
    position: "absolute",
    borderRadius: 10,
    backgroundImage:
      "linear-gradient(to left, rgba(178,254,250, 0.5), rgba(14,210,247, 0.3))",
    paddingTop: 50
  },
  header: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 24,
    fontWeight: 100,
    color: "#778899"
  },
  subheader: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 10,
    fontWeight: 400,
    color: "#778899",
    textTransform: "uppercase",
    letterSpacing: 1
  }
};
const imageList = [Avocado, Bean, Broccoli, Carrot, Mushrooms, Lettuce, Salad]
const randomImage = imageList[Math.floor(Math.random() * imageList.length)]
export default props =>
  element(
    "div",
    {
      style: Object.assign({}, styles.container, { top: props.height * 0.3 }),
      className: "animated zoomIn"
    },
    element("img", { src: randomImage, height: 100 }),
    element("p", { style: styles.header }, "Ultra lightweight"),
    element("p", { style: styles.header }, "Wikipedia."),
    element("p", { style: styles.subheader }, "just add dressing")
  );
