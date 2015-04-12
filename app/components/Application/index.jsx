import React from 'react';

import ChapterList from '../Chapter';

/*
  Component specific stylesheet
  Can also use .less, .scss, or plain .css files here
*/
require('./style.sass');

const jsonUrl = require("./chapters-v1.json");

export default class Application extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {data: []};
  }  
  loadCommentsFromServer() {
    var self = this;
    $.ajax({
      url: jsonUrl,
      dataType: 'json',
      success: function(data) {        
        self.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount() {
    //this.setState({data: jsonSite});
    this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    //setTimeout(this.loadCommentsFromServer, 100);
  }
  componentDidUpdate(prevProps, prevState) {
    
    $('.img-holder').imageScroll({
      container: $('#content-apis'),
      imgClass: 'img-holder-img',
      windowObject: $(window),
      mediaWidth: 1600,
      mediaHeight: 1200,
      speed:.2
    });
    
  } 
  render() {    
    // <Chapters data={this.state.data.sections}></Chapters>  
    if (this.state.data) {      
      return (
        <div>          
          <ChapterList data={this.state.data} />
        </div>  
      );
    }    
    
    return React.DOM.div();           
  }
}

// export default class Chapters extends React.Component {
//   render() {
//     // <ChapterList data={this.props.data} />    
//     return <p>toto</p>
//   }
// }

// export default class Citation extends React.Component {
//   render() {
//     var citationMarkup = ""    
//     if (this.props.citation) {
//       var citationAddClass = this.props.citation.class ? this.props.citation.class : '';
//       var citationClassname = "citation " + citationAddClass;
//       citationMarkup =         
//         <div className={citationClassname}>
//           <div className="text">{this.props.citation.text}
//             <div className="author">{this.props.citation.author}</div>
//           </div>          
//         </div>                
//     } else {
//       citationMarkup = <div></div>
//     }   
//     return React.DOM.div({}, citationMarkup);
//   }
// }



//   render() {
//     var leftStyle = {display: this.state.left ? 'block' : 'none'};   
//     var rightStyle = {display: this.state.right ? 'block' : 'none'};
//     return (
//       <div>
//         <div className="arrow arrow-left" onClick={this.onSlide} style={leftStyle}></div>
//         <div className="arrow arrow-right" onClick={this.onSlide} style={rightStyle}></div>
//       </div>      
//     );
//   }

// }

// export default class LightButton extends React.Component {
//   mouseOver(evt) {    
//     //this.props.onLightButtonOver();
//     evt.preventDefault();
//   }

//   mouseOut(evt) {    
//     //this.props.onLightButtonOut();
//     evt.preventDefault();
//   }

//   render() {
//     return (
//       <div className="fake-lamp" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
//         <i className="fa fa-lightbulb-o fa-5x fa-inverse"></i>
//       </div>
//     );
//   }
// }
