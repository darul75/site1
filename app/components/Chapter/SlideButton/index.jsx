import React from 'react';

export default class SlideButton extends React.Component {

  constructor(props) {
    super(props);    
    this.state = {left: true, right: false};
  }

  onSlide(evt) {
    this.setState({
      left: !this.state.left,
      right: !this.state.right
    });
    
    this.props.onSlideButtonClick();
    evt.preventDefault();
  }

  render() {
    var leftStyle = {display: this.state.left ? 'block' : 'none'};   
    var rightStyle = {display: this.state.right ? 'block' : 'none'};
    return (
      <div>
        <div className="arrow arrow-left" onClick={this.onSlide} style={leftStyle}></div>
        <div className="arrow arrow-right" onClick={this.onSlide} style={rightStyle}></div>
      </div>      
    );
  }
  
}