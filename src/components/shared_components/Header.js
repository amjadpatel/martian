import React, { Component } from 'react';
import Navbar from './Navbar';

class Header extends Component {
  state = {
    activeIndex: null
  }
  handleClick = (index) => this.setState({ activeIndex: index });
  render() {
    const clickables = [
    { name: "Show" , href:''},
    { name: "Schedule" , href:'schedule'},
    { name: "Add Ration" ,href:'create'},
   
  ];
  return (
    <div>
    <ul>
      { clickables.map((clickable, i) => {
          return <Navbar 
            key={ clickable.name }
            name={ clickable.name }
            index={ i }
            isActive={ this.state.activeIndex === i }
            onClick={ this.handleClick }
            link={clickable.href}
          />
        })
      }
  </ul>
</div>
  )
  }
}

export default Header;