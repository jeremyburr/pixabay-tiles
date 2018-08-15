import React, { Component } from 'react'
import AddFolder from "./AddFolder"

export default class Nav extends Component { 
  constructor() {   
    super();
    this.state = {
      addFolder: false
    }
  }

  // Conditionally set "on" folder 
  
  folderImage(link) {
    console.log(this.props.active)
    let folderPath = this.props.active === link ?  "assets/folder_on@2x.png": "assets/folder_off@2x.png"; 
    return folderPath
  }

  // Show addFolder input text field

  showCreateInput = () => {
    this.setState({
      addFolder: true
    }) 
  }


  // Render navigation links from state "queries" object

  renderLinks = () => {
    let arrayToMap = this.props.queries;
    let newArray = arrayToMap.slice();
    newArray.push("videos");
    console.log(newArray);  
      return (
        <div style={{margin: "20px 0px 0px 20px"}}>
          {newArray.map(link => {
            return (
                <div style={{float: "left", marginRight: "30px" }} className="folder" key={Math.random()}>
                  <a onClick={() => this.props.selectFolder(link)}>
                    <img width="75px" src={this.folderImage(link)} /><br />
                    {link}
                  </a>
                </div>
            )
          })}
        </div> 
      ) 
  } 

  render() { 
    if (this.props.section !== "content") {
      console.log(this.props.section);
      return <div />
    }

    return (
      <div style={{marginTop: "10px"}}>
        <div onClick={this.showCreateInput} style={{float: "right", marginRight: "10px"}} className="new-folder-button">
           New Folder 
          <AddFolder show={this.state.addFolder} addFolder={this.props.addFolder} />
        </div> 
        {this.renderLinks()}
        <div style={{clear: "both"}} />
        {this.props.children}
      </div>
    )
  }
}

