import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>EXPERIMENT</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/lab_bench1.png'
              text='Sign up for experiment 1'
              label='Social Psychology'
              path='/services'
            />
            <CardItem
              src='images/lab_bench1.png'
              text='Sign up for experiment 2'
              label='Neuroscience'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/lab_bench1.png'
              text='Sign up for experiment 3'
              label='Microbiology'
              path='/services'
            />
            <CardItem
              src='images/lab_bench1.png'
              text='Sign up for experiment 4'
              label='Chemistry'
              path='/products'
            />
            <CardItem
              src='images/lab_bench1.png'
              text='Sign up for experiment 5'
              label='Genetics'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
