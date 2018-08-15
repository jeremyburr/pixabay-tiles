import React, { Component } from 'react'

export default class Tiles extends Component {
    constructor() {
      super();
    }

  // Render icon based on media type 

  renderThumbnail = (itemType) => { 
      if (itemType === ("photo" || "illustration")) {
        return "assets/image@2x.png"
      }
      if (itemType === ("film" || "animation")) {
        return "assets/video@2x.png"
      }
      if (itemType !== ("photo" || "illustration" || "film" || "animation")) {
         return this.props.active === "videos" ? "assets/video@2x.png" : "assets/image@2x.png";
      } 
  }

  renderImgThumb = (item) => {
    if (this.props.active !== "videos") { 
      return ( 
        <img className="thumbnail-video"  alt="video thumbnail" src={item.previewURL} />
      ) 
    }
    else {
      return ( 
        <img className="thumbnail-image" alt="image thumbnail" src={item.userImageURL} />
      ) 
    }
  }

  // Render tiles from active state array object only

  renderTiles = () => {
      let arrayToMap = this.props.active === "videos" ? this.props.videos : this.props.photos[this.props.active];
        return (
          <div> 
            <ul style={{listStyle: "none"}}>
              {arrayToMap.map(item => {
                return (
                  <li style={{padding: "10px"}} onClick={() => this.props.onClick(item)} className="tile" key={Math.random()}>
                    <div className="tile-left">
                      <span className="thumbnail"  />
                        {this.renderImgThumb(item)}
                     </div>
                    <div className="tile-right" >
                        <span style={{fontWeight: "bold"}}> 
                          {item.fileName}
                        </span>
                        <br /><br />
                        <img style={{width: "20px"}} alt="tile" src={this.renderThumbnail(item.type)} />
                        <br /><br />
                        {item.resolution} 
                        <br /><br />
                        {item.creationDate} 
                    </div>
                  </li>
                ) 
              })}
            </ul>
         </div>
        );
   }  

  render() {

      // Wait for state data

      if (!this.props.photos || !this.props.videos) { 
        return <div />
      }
      if (this.props.section !== "content") {
        return  <div />
      }
    return (
      <div>
        {this.renderTiles()}
      </div>
    ) 
   } 
} 
