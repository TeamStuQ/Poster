import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import fullpage from 'fullpage.js';

import { 
  posLimit,
  sloganLimit,
  posterSize,
  photoSize,
  photoTitle1,
  photoTitle2,
  sloganArrow,
  footer,
  diyName,
  themeColors,
  imgData
} from './config';

import Loading from './loading';
import Selector from './selector';
import Editor from './editor';

((w, d) => {    
  class Poster extends React.Component {
    constructor() {
      super();
      
      this.state = {
        num        : 0,
        position   : '',
        photo      : '',
        sloganOne  : '',
        sloganTwo  : '',
        sloganThree: '',
        allowGen   : false
      };
      
      this.onNumChange             = this.onNumChange.bind(this);
      this.onPositionChange        = this.onPositionChange.bind(this);
      this.handleSloganOneChange   = this.handleSloganOneChange.bind(this);
      this.handleSloganTwoChange   = this.handleSloganTwoChange.bind(this);
      this.handleSloganThreeChange = this.handleSloganThreeChange.bind(this);
      this.handlePhotoLoad         = this.handlePhotoLoad.bind(this);
      this.donePosterPreview       = this.donePosterPreview.bind(this);
    }
    
    componentDidMount() {
      setTimeout(() => {
        $('.poster').fullpage({
          touchSensitivity: 15,
          normalScrollElementTouchThreshold: 5
        });
        
        w.disableTouchMove = false;
        $.fn.fullpage.moveTo(2);
      }, 4000);
    }
    
    
    onNumChange(n) {
      this.setState({ num: n });
    }
    
    onPositionChange(pos) {
      this.setState({ position: pos });
    }
    
    handleSloganOneChange(content) {
      this.setState({ sloganOne: content });
    }
    
    handleSloganTwoChange(content) {
      this.setState({ sloganTwo: content });
    }
    
    handleSloganThreeChange(content) {
      this.setState({ sloganThree: content });
    }
    
    handlePhotoLoad(event) {
      let source = event.target.files[0],
          reader = new FileReader();
                
      reader.onload = (event) => {
        this.setState({ photo: event.target.result });
      };
      
      reader.readAsDataURL(source);
    }
    
    donePosterPreview() {
      this.setState({ allowGen: true });
    }
    
    render() {  
      return (
        <div className='poster'>
      	  <Loading />
      	  <Selector
      	    posLimit={ posLimit }
      	    title1={ photoTitle1 }
      	    title2={ photoTitle2 }
      	    dName={ diyName }
      	    data={ imgData }
      	    posNum={ this.state.num }
      	    posName={ this.state.position }
      	    handleNumChange={ this.onNumChange }
      	    handlePositionChange={ this.onPositionChange }
      	    handleSloganOneChange={ this.handleSloganOneChange }
      	    handleSloganTwoChange={ this.handleSloganTwoChange }
      	    handleSloganThreeChange={ this.handleSloganThreeChange }
      	    onPhotoLoad={ this.handlePhotoLoad }
      	    photo={ this.state.photo }
      	  />
      	  <Editor
      	    sloganLimit={ sloganLimit }
      	    posNum={ this.state.num }
      	    posName={ this.state.position }
      	    sloganOne={ this.state.sloganOne }
      	    sloganTwo={ this.state.sloganTwo }
      	    sloganThree={ this.state.sloganThree }
      	    photo={ this.state.num > 0 ? imgData[this.state.num - 1].src : this.state.photo }
      	    themeColors={ themeColors }
      	    posterSize={ posterSize }
      	    titleOne={ photoTitle1 }
      	    titleTwo={ photoTitle2 }
      	    sloganArrow={ sloganArrow }
      	    footer={ footer }
      	    allowGen={ this.state.allowGen }
      	    donePosterPreview={ this.donePosterPreview }
      	    handleSloganOneChange={ this.handleSloganOneChange }
      	    handleSloganTwoChange={ this.handleSloganTwoChange }
      	    handleSloganThreeChange={ this.handleSloganThreeChange }
      	  />
        </div>
      );
    }
  };
    
  try {
    ReactDOM.render(<Poster/>, $('#poster')[0]);
    
    w.disableTouchMove = true;
    
    $(w).on('touchmove', (event) => {
      if (disableTouchMove) {
        event.preventDefault();
      }
    });
  } catch(error) {
    $('.result').fullpage({
      touchSensitivity: 15,
      normalScrollElementTouchThreshold: 5
    });
    
    $('#download').click(() => {
      $('.download-info').addClass('active');
    });
    
    $('#new').click(() => {
      w.location = '/poster';
    });
    
    $('#share').click(() => {
      $('.share-info').addClass('active');
    });
    
    $('.close').click(() => {
      $('.download-info').removeClass('active');
      $('.share-info').removeClass('active');
    });
  }  
})(window, document);