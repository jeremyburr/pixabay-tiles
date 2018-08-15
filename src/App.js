import React, { Component } from 'react'
import Login from './Login'
import Header from './Header'
import Nav from './Nav'
import Tiles from './Tiles'
import Lightbox from './Lightbox'
import './App.css';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      queries: ["clouds","cars","urban"],
      active: "clouds", 
      section: "login",
      photos: null,
      videos: null,
      showLightbox: false,
      lightboxUrl: null,
      lightboxItemMarginLeft:  null,
      lightboxItemMarginTop: null, 

    }
    this.lightboxItem = React.createRef();
  } 

  // Show lightbox

  showLightbox = (item) => { 
    this.setState({
      showLightbox: true,
      lightboxUrl: this.state.active === "videos" ? item.videos.medium.url :  item.largeImageURL
    }) 
  }

  // Hide lightbox

   hideLightbox = (e) => {
      if (e.target.className==="lightbox-image") {
        return false 
      }
      this.setState({
        showLightbox: false,
        lightboxUrl: null 
      }); 
    } 

   // Show lightbox content

    showLightboxContent = (lightBoxImageCSS) => {
    if (this.state.active !=="videos") {
      return (
        <div>
          <img alt="lightbox focus" onLoad={this.lightboxItemLoad} style={lightBoxImageCSS} ref={this.lightboxItem} className="lightbox-image" src={this.state.lightboxUrl} />
        </div>
      )
    }
    else {
      return (
        <div>
          <video ref={this.lightboxItem} onLoadStart={this.lightboxItemLoad} className="lightbox-image" style={lightBoxImageCSS} width="320" height="240" controls="controls" autoPlay>
            <source src={this.state.lightboxUrl} />
             video test
          </video> 
        </div> 
      )
    }
  }

   // Get image dimensions on load

  lightboxItemLoad = () => {
    this.setState({
      lightboxItemMarginLeft: this.lightboxItem.current.offsetWidth/2*-1,
      lightboxItemMarginTop: this.lightboxItem.current.offsetHeight/2*-1,
    }) 
  }

  // Folder operations

  selectFolder = (selection) => {
    this.setState({active: selection});
  }

  addFolder = (e) => {
      console.log(e); 
      this.setState({
        queries: this.state.queries.concat(e),
      })
      setTimeout(()=>{
        this.getPixabayMedia(this.state.queries);
      },1000);
    }

  // Fetch Pixabay data

  getPixabayMedia = (queries) => { 

    const devKey = '?key=9783593-b879664bf1ab665c51dca1bcf'
    const config = '&per_page=50&q=' 
    const photoAPI = 'https://pixabay.com/api/'; 
    const videoAPI = 'https://pixabay.com/api/videos/'; 


    // Reorder array alphanumerically, descending to ascending

    function sortAlphanumeric(array) {
     array.sort((a,b) => { 
        let aName = a.fileName;
        let bName = b.fileName;
        if(aName < bName) return -1;
        if(aName > bName) return 1;
        return 0 
      }); 
    }

    // Get item creation date

    function getCreationDate(item) {
      let url = item.userImageURL;
      let creationDate  = item.userImageURL.substring(
        url.lastIndexOf("/") + 1,
        url.lastIndexOf("_")
      ); 
      item.creationDate = creationDate; 
    } 

      // Fetch photos for each query, store in state object

      let photoActions = queries.map(query => {
          return (
            fetch(photoAPI + devKey + config + query)
            .then(resolve => resolve.json()) 
          ) 
      }); 
      let photoResults = Promise.all(photoActions); 
      let photoStateObject = {};
      photoResults.then(data => {
        for (let i = 0; i < queries.length; i++) { 
          let responseArray = data[i].hits; 
            let updatedArray = responseArray.map(item => { 
              if (item.previewURL) {
                getCreationDate(item);
                item.fileName = item.previewURL.split('/').pop(); 
              }
              item.resolution = item.imageWidth+'x'+item.imageHeight; 
              return (item); 
           }) 
              sortAlphanumeric(updatedArray); 
              photoStateObject[queries[i]] = updatedArray; 
           }
          this.setState({
            photos: photoStateObject,
          })
       }) 

        // Fetch videos for each query, store in state object

        let videoActions = queries.map(query => {
            return (
              fetch(videoAPI + devKey + config + query)
              .then(resolve => resolve.json()) 
            ) 
        }); 

          let videoResults = Promise.all(videoActions); 
          let videoStateObject = [];
          videoResults.then(data => {
          for (let i = 0; i < queries.length; i++) { 
              let responseArray = data[i].hits; 
                let updatedArray = responseArray.map(item => { 
                  getCreationDate(item);
                  let fileString = item.videos.medium.url.split('/').pop(); 
                  item.fileName = fileString.substring(0, fileString.indexOf('?')); 
                  item.resolution = item.videos.medium.width + 'x' + item.videos.medium.height; 
                  return (item); 
               }) 
                  sortAlphanumeric(updatedArray); 
                  videoStateObject.push.apply(videoStateObject,updatedArray); 
               } 
            this.setState({
              videos: videoStateObject
            })
          }) 
    } 

    // Show content after login 

    goToContent = () => {
      this.setState({  
         section: "content",
      }) 
    } 

    componentWillMount() {
      this.getPixabayMedia(this.state.queries); 
    }

    componentDidUpdate() {
      console.log(this.state); 
    }

    render() { 

    // Center lightbox image 

    const lightBoxImageCSS = {
      marginLeft: this.state.lightboxItemMarginLeft,
      marginTop: this.state.lightboxItemMarginTop,
    } 

    return (
      <div> 
        <Login goToContent={this.goToContent} section={this.state.section} />
        <Header section={this.state.section} />
        <Nav active={this.state.active} addFolder={this.addFolder} queries={this.state.queries} section={this.state.section} selectFolder={this.selectFolder} />
        <Tiles section={this.state.section} onClick={this.showLightbox} photos={this.state.photos} videos={this.state.videos} active={this.state.active} />
        <Lightbox onClick={this.hideLightbox} showLightbox={this.state.showLightbox} >
          {this.showLightboxContent(lightBoxImageCSS)} 
        </Lightbox> 
      </div>
    )
  } 
  
} 

export default App; 
