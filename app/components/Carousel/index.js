import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';
import assign from 'lodash/assign';

import {
  CarouselContainer,
  ArrowContainer,
  Arrow,
  DotsContainer,
  Dot,
} from './styled';
import ArrowLeft from '../../images/arrow-left.svg';
import ArrowRight from '../../images/arrow-right.svg';

export default class Carousel extends Component {
  static propTypes = {
    CarouselItem: PropTypes.func.isRequired,
    carouselArr: PropTypes.array.isRequired,
    carouselHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    slideTime: PropTypes.number.isRequired,
    arrowOffset: PropTypes.number.isRequired,
  };

  static keys = {};

  static generateUniqueId = () => {
    let number = Math.floor(10000 * Math.random());
    while (Carousel.keys[number]) number = Math.floor(10000 * Math.random());
    return number;
  }

  static addIdsToArray = (array) => array.map((item) => {
    const objToReturn = assign({}, item);
    /* eslint-disable no-underscore-dangle */
    objToReturn._id = item._id || `${Carousel.generateUniqueId()}`;
    return objToReturn;
  });

  state = {
    currentXPos: 0,
    nextXPos: 0,
    carouselArr: Carousel.addIdsToArray(this.props.carouselArr),
    currentIndex: 0,
  };

  componentWillMount() {
    this.performCarouselAction = debounce(this.performCarouselAction, 200);
  }

  componentDidMount() {
    this.interval = this.setCarouselInterval();
  }

  setCarouselInterval = () => setInterval(() => this.performCarouselAction('right'), 5000);

  setCarouselState = (currentXPos, nextXPos, currentIndex) => this.setState({ currentXPos, nextXPos, currentIndex }, () => {
    setTimeout(() => this.setState({ currentXPos: nextXPos }), this.props.slideTime * 1000);
  });

  addToArray = (carouselArr) => this.setState({ carouselArr: Carousel.addIdsToArray(carouselArr.concat(this.props.carouselArr)) });

  performCarouselAction = (leftOrRight) => {
    const { currentXPos, currentIndex, carouselArr } = this.state;
    const nextXPos = leftOrRight === 'left' ? currentXPos + 100 : currentXPos - 100;
    if (currentIndex >= carouselArr.length - 2) this.addToArray(carouselArr);
    this.setCarouselState(currentXPos, nextXPos, currentIndex + (leftOrRight === 'left' ? -1 : 1));
  }

  handleDotClick = (evt) => {
    const { id } = evt.target;
    const { currentXPos, currentIndex } = this.state;
    const currentSelectedIndex = currentIndex % this.props.carouselArr.length;
    if (id !== currentSelectedIndex) {
      clearInterval(this.interval);
      const difference = currentSelectedIndex - id;
      if (id === this.props.carouselArr.length - 1) this.addToArray();
      this.setCarouselState(currentXPos, currentXPos + (difference * 100), currentIndex - difference);
      this.interval = this.setCarouselInterval();
    }
  }

  handleArrowClick = (evt) => {
    evt.persist();
    clearInterval(this.interval);
    this.performCarouselAction(evt.target.name);
    this.interval = this.setCarouselInterval();
  }

  render() {
    const { carouselArr, currentXPos, nextXPos, currentIndex } = this.state;
    const { CarouselItem, carouselHeight, slideTime, arrowOffset } = this.props;
    const currentSelectedIndex = currentIndex % this.props.carouselArr.length;
    return (
      <div>
        <ArrowContainer arrowOffset={arrowOffset}>
          <Arrow onClick={this.handleArrowClick} name="left" src={ArrowLeft} visibility={currentIndex === 0 ? 'hidden' : 'visible'} />
          <Arrow onClick={this.handleArrowClick} name="right" src={ArrowRight} visibility={currentIndex === carouselArr.length - 1 ? 'hidden' : 'visible'} />
        </ArrowContainer>
        <CarouselContainer
          currentXPos={currentXPos}
          nextXPos={nextXPos}
          carouselHeight={carouselHeight}
          slideTime={slideTime}
        >
          {carouselArr.map((item) => <CarouselItem {...item} key={item._id} />)}
        </CarouselContainer>
        <DotsContainer numDots={this.props.carouselArr.length}>
          {this.props.carouselArr.map((item, index) => <Dot id={index} key={Carousel.generateUniqueId()} selected={index === currentSelectedIndex} onClick={this.handleDotClick} />)}
        </DotsContainer>
      </div>
    );
  }
}
