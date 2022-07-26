import React, { Component } from 'react'
import styled from 'styled-components'

const StyledSideNav = styled.div`
  position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 75px;     /* Set the width of the sidebar */
  z-index: 10;      /* Stay on top of everything */
  top: 3.4em;      /* Stay at the top */
  background-color: #111; /* Black */
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 10px;
`;


class NavItm extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
  render() {
    const { active } = this.props
    console.log(active)
    return (
      <div>Sidebar</div>
    )
  }
}



class Sidenav extends Component {
  render() {
    return (
      <div>
        <StyledSideNav />
      </div>
    )
  }
}



export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <Sidenav />
      </div>
    )
  }
}
