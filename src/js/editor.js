import $ from 'jquery';
import React from 'react';

export default class extends React.Component {
  constructor() {
    super();
    
    this.state = {
      sloganOne  : '',
      sloganTwo  : '',
      sloganThree: '',
      color      : 'white'
    };
    
    this.handleSloganOneChange   = this.handleSloganOneChange.bind(this);
    this.handleSloganTwoChange   = this.handleSloganTwoChange.bind(this);
    this.handleSloganThreeChange = this.handleSloganThreeChange.bind(this);
    this.handleColorSelect       = this.handleColorSelect.bind(this);
    this.genPoster               = this.genPoster.bind(this);
    this.onPosterPreview         = this.onPosterPreview.bind(this);
    this.onPosterGenerate        = this.onPosterGenerate.bind(this);
    this.hideCanvas              = this.hideCanvas.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      sloganOne  : nextProps.sloganOne,
      sloganTwo  : nextProps.sloganTwo,
      sloganThree: nextProps.sloganThree
    });
  }
  
  handleSloganOneChange(event) {
    this.props.handleSloganOneChange(event.target.value);
  }
  
  handleSloganTwoChange(event) {
    this.props.handleSloganTwoChange(event.target.value);
  }
  
  handleSloganThreeChange(event) {
    this.props.handleSloganThreeChange(event.target.value);
  }
  
  handleColorSelect(event) {
    $(event.target).addClass('active').siblings().map((i, arr) => { $(arr).removeClass('active'); });
    this.setState({ color: event.target.dataset.color });
  }
  
  genPoster() {
    let that    = this,
        canvas  = $('#poster_canvas')[0],
        context = canvas.getContext('2d'),
        title1  = new Image(),
        title2  = new Image(),
        arrow   = new Image(),
        photo   = new Image(),
        footer  = new Image();
    
    title1.onload = () => {
      context.drawImage(title1, 29.8, 53.3);
    };
    
    title2.onload = () => {
      context.drawImage(title2, 29.8, 126.6);
    };
    
    arrow.onload = () => {
      context.drawImage(arrow, 29.8, 231.1);
      context.drawImage(arrow, 29.8, 290.2);
      context.drawImage(arrow, 29.8, 345.8);
    };
    
    photo.onload = () => {
      context.drawImage(photo, 0, 492, 750, 659);
    };
    
    footer.onload = () => {
      context.drawImage(footer, 0, that.props.posterSize.mainHe);
    };
    
    context.fillStyle = that.props.themeColors[that.state.color];
    context.fillRect(0, 0, that.props.posterSize.width, that.props.posterSize.mainHe);
    
    context.fillStyle = '#fff';
    context.fillRect(0, that.props.posterSize.mainHe, that.props.posterSize.width, that.props.posterSize.height);
      
    title1.src = that.props.titleOne;
    title2.src = that.props.titleTwo;
    arrow.src  = that.props.sloganArrow;
    
    context.font = '28px Source Han Sans, Helvetica Neue, Microsoft Yahei';
    context.fillStyle = '#000';
    
    context.fillText(that.state.sloganOne, 57.2, 255);
    context.fillText(that.state.sloganTwo, 57.2, 310.8);
    context.fillText(that.state.sloganThree, 57.2, 366.3);
    
    context.font = '24px Source Han Sans, Helvetica Neue, Microsoft Yahei';
    context.fillStyle = '#727171';
    
    context.fillText('—— From ' + that.props.posName, 29.8, 437.7);
    
    photo.src = that.props.photo;
    
    footer.src = that.props.footer;        
  }
  
  onPosterPreview(event) {
    event.stopPropagation();
    
    $('#poster_canvas').addClass('active');
    $('.poster-bg').addClass('active');
    
    this.genPoster();
    this.props.donePosterPreview();
  }
  
  onPosterGenerate(event) {
    event.stopPropagation();
        
    let img  = $('#poster_canvas')[0].toDataURL(),
        data = {
          position: this.props.posName,
          slogan  : this.state.sloganOne
        };
    
    $.ajax({
      type: 'POST',
      url : '/poster/upload',
      data: {
        pic : img,
        data: JSON.stringify(data)
      }
    }).done((result) => {
      window.location = '/poster/detail/' + (JSON.parse(result)).key;
    });
  }
  
  hideCanvas() {
    $('#poster_canvas').removeClass('active');
    $('.poster-bg').removeClass('active');
  }
  
  render() {
    return (
      <div
        className='section editor'
        onClick={ this.hideCanvas }
      >
        <div className='title'>用毕生代码修炼的三行套路</div>
        <div className='limit'>每行可输入 { this.props.sloganLimit } 字</div>
        <ul className='slogans'>
          <li>
            <input              
              type='text'
              id='slogan1'
              value={ this.state.sloganOne }
              onChange={ this.handleSloganOneChange }
              maxLength={ this.props.sloganLimit }
            />
          </li>
          <li>
            <input
              type='text'
              id='slogan2'
              value={ this.state.sloganTwo }
              onChange={ this.handleSloganTwoChange }
              maxLength={ this.props.sloganLimit }
            />
          </li>
          <li>
            <input
              type='text'
              id='slogan3'
              value={ this.state.sloganThree }
              onChange={ this.handleSloganThreeChange }
              maxLength={ this.props.sloganLimit }
            />
          </li>
        </ul>
        <div className='limit'>选择背景色</div>
        <ul className='colors'>
          <li
            className='white active'
            data-color='white'
            onClick={ this.handleColorSelect }
          />
          <li
            className='blue'
            data-color='blue'
            onClick={ this.handleColorSelect }
          />
          <li
            className='green'
            data-color='green'
            onClick={ this.handleColorSelect }
          />
          <li
            className='yellow'
            data-color='yellow'
            onClick={ this.handleColorSelect }
          />
          <li
            className='pink'
            data-color='pink'
            onClick={ this.handleColorSelect }
          />
        </ul>
        <ul className='gen'>
          <li
            id='generate'
            className={ this.props.allowGen ? '' : 'forbidden' }
            onClick={ this.onPosterGenerate }
          >
            生成
          </li>
          <li
            id='preview'
            onClick={ this.onPosterPreview }
          >
            预览
          </li>
        </ul>
        <canvas
          className='poster-canvas'
          id='poster_canvas'
          width={ this.props.posterSize.width }
          height={ this.props.posterSize.height }
        />
        <div className='poster-bg' />
      </div>
    );
  }
}