import React from 'react';

export default class extends React.Component {
  render() {    
    return (
      <div className='section loading'>
        <ul className='slogan'>
          <li>每一位程序员</li>
          <li>都有专属自己的套路</li>
        </ul>
        <div className='loader'>
          <div className='loader__bar'></div>
          <div className='loader__bar'></div>
          <div className='loader__bar'></div>
          <div className='loader__bar'></div>
          <div className='loader__bar'></div>
          <div className='loader__ball'></div>
        </div>
        <svg className='as-logo'>
          <use xlinkHref='/dist/poster/icons.svg#as-logo'/>
        </svg>
      </div>
    );
  }
}