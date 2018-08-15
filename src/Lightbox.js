import React, { Component } from 'react'

// Lightbox container

export default class Lightbox extends Component {
  render() {
    if (!this.props.showLightbox) {
      return (
        <div />
      )
    }
    return (
      <div onClick={this.props.onClick} className="lightbox">
        {this.props.children}
      </div>
    )
  }

}
