import React from 'react';
import $ from 'jquery';
import Swiper from 'swiper';

export default class extends React.Component {
  constructor() {
    super();
    
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.editPosition = this.editPosition.bind(this);
    this.quitEditPosition = this.quitEditPosition.bind(this);
  }
  
  componentDidMount() { 
    this.props.handleNumChange(1);
    this.props.handlePositionChange(this.props.data[1].name);
    
    let that = this, swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide : 1,
        longSwipes: false,
        followFinger: false,
        CSSWidthAndHeight: true,
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false          
        },

        onSlideNextStart: (swiper) => {
          let n     = that.props.data[that.props.posNum].name,
              one   = that.props.data[that.props.posNum].slogan1,
              two   = that.props.data[that.props.posNum].slogan2,
              three = that.props.data[that.props.posNum].slogan3;
          
          that.props.handleNumChange(that.props.posNum + 1);
          that.props.handlePositionChange(n);
          that.props.handleSloganOneChange(one);
          that.props.handleSloganTwoChange(two);
          that.props.handleSloganThreeChange(three);
        },
        onSlidePrevStart: (swiper) => {
          let n     = that.props.posNum > 1 ? that.props.data[that.props.posNum - 2].name : that.props.dName,
              one   = that.props.posNum > 1 ? that.props.data[that.props.posNum - 2].slogan1 : '',
              two   = that.props.posNum > 1 ? that.props.data[that.props.posNum - 2].slogan2 : '',
              three = that.props.posNum > 1 ? that.props.data[that.props.posNum - 2].slogan3 : '';
          
          that.props.handleNumChange(that.props.posNum - 1);
          that.props.handlePositionChange(n);
          that.props.handleSloganOneChange(one);
          that.props.handleSloganTwoChange(two);
          that.props.handleSloganThreeChange(three);
        }
      });
  }
  
  handlePositionChange(event) {
    this.props.handlePositionChange(event.target.value);
  }
  
  editPosition(event) {
    event.stopPropagation();
    
    $('#pos_show').addClass('hide');
    $('#pos_status_edit').addClass('hide');
    $('#pos_edit').removeClass('hide').focus();
    $('#pos_status_res').removeClass('hide');
  }
  
  quitEditPosition(event) {
    $('#pos_show').removeClass('hide');
    $('#pos_status_edit').removeClass('hide');
    $('#pos_edit').addClass('hide');
    $('#pos_status_res').addClass('hide');
  }
  
  render() {
    let that = this,
        demos = this.props.data.map((d, i) => {
          return (
            <div
              className='swiper-slide'
              key={ i + 1 }
            >
              <img className='title-1' src={ that.props.title1 } />
              <img className='title-2' src={ that.props.title2 } />
              <ul>
                <li>
                  <img src='/dist/poster/item.png' />
                  <span>{ d.slogan1 }</span>
                </li>
                <li>
                  <img src='/dist/poster/item.png' />
                  <span>{ d.slogan2 }</span>
                </li>
                <li>
                  <img src='/dist/poster/item.png' />
                  <span>{ d.slogan3 }</span>
                </li>
              </ul>
              <img className='character' src={ d.src } />
            </div>
          );
        });
    
    return (
      <div
        className='section selector'
        onClick={ this.quitEditPosition }
      >
        <div className='title'>
          <span>我是</span>
          <span
            className='pos-show'
            id='pos_show'
            onClick={ this.editPosition }
          >
            { this.props.posName }
          </span>
          <input
            className='pos-edit hide'
            id='pos_edit'
            type='text'
            placeholder=''
            value={ this.props.posName }
            onChange={ this.handlePositionChange }
            onClick={ (event) => {event.stopPropagation();} }
            size={ this.props.posName.length + 1 }
            minLength='1'
            maxLength={ this.props.posLimit }
          />
          <div
            className='pos-status edit'
            id='pos_status_edit'
            onClick={ this.editPosition }
          >
            <svg><use xlinkHref='/dist/poster/icons.svg#edit'/></svg>
            <span>编辑</span>
          </div>
          <div
            className='pos-status res hide'
            id='pos_status_res'
          >
            剩余{ this.props.posLimit - this.props.posName.length }字
          </div>
        </div>
        <div className='swiper-container demos'>
          <div className='swiper-wrapper'>
            <div
              className='swiper-slide'
              key={ 0 }
            >
              <img className='title-1' src={ this.props.title1 } />
              <img className='title-2' src={ this.props.title2 } />
              <ul>
                <li>
                  <img src='/dist/poster/item.png' />
                  <span>本页可以编辑职位头衔</span>
                </li>
                <li>
                  <img src='/dist/poster/item.png' />
                  <span>套路口号在下一页修改</span>
                </li>
                <li>
                  <img src='/dist/poster/item.png' />
                  <span>先预览才能生成发布</span>
                </li>
              </ul>
              <img
                className='character-diy'
                src={ this.props.photo }
              />
              <input
                className='diy-photo'
                id='diy_photo'
                type='file'
                onChange={ this.props.onPhotoLoad }
                accept='image/*'
              />
              <label htmlFor='diy_photo'>
                <i />
                <i />
              </label>
            </div>
            { demos }
          </div>
        </div>
        <div className='next-edit'>
          <span>编辑文案</span>
          <div className='next-slide'>
            <svg><use xlinkHref='/dist/poster/icons.svg#up'/></svg>
            <svg><use xlinkHref='/dist/poster/icons.svg#up'/></svg>
          </div>
        </div>
      </div>
    );
  }
}