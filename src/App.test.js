import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import App from './App';
import Hero from './components/Hero'
import styles from './styles'
Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<App/>)
describe('<App/>', () => {
  it('should render 1 <App/> component', ()=> {
    expect(wrapper).toHaveLength(1)
  })
  it('should find styles object', ()=> {
    expect(wrapper.find(styles).exists())
  })
  it('should load <Hero/>', ()=> {
    expect(wrapper.find(<Hero/>).exists())
  })
  it('should have window.height on <Hero/>', ()=> {
    expect(wrapper.mount(<Hero/>))
    // console.log(wrapper.find(<Hero/>).contains().props())
  })
})
