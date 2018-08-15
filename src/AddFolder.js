import React, { Component } from 'react'

export default class NewFolder extends Component {
  constructor() {
      super();
      this.inputRef = React.createRef();
      this.state = {
        input: null
      }
  }

  // Clear addFolder input field 

  clearField = (e) => {
    this.inputRef.current.value = "";
  }

  inputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      input: e.target.value
    })
  }

  componentDidUpdate() {
    console.log(this.state);
  }

     render() {
        if (this.props.show === false) {
          return (
            <div />
          )
        }
        return (
          <div className="new-folder-modal">
            <input ref={this.inputRef} onChange={e => this.inputChange(e)} />
            <button type="button" onClick={e => {this.clearField(); this.props.addFolder(this.state.input);}} >submit</button>
          </div>
        ) 
    } 
}
