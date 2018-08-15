import React, { Component } from 'react'

export default class Header extends Component { 
  render() {
    if (this.props.section !== "content") {
      return <div />
    }
    return (
      <div className="header" >
        <span style={{fontWeight: "300", fontSize: "28px"}}>
          VIDERI</span>
        <span style={{fontWeight: "300"}}>
          CONTENT
       </span>
      </div> 
    )
  }
}

