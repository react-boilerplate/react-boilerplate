import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';

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

  state = {
    carouselArr: this.props.carouselArr,
    prevIndex: 0,
    currentIndex: 0,
    nextIndex: 0,
  };

  componentWillMount() {
    this.performCarouselAction = debounce(this.performCarouselAction, 200);
  }

  componentDidMount() {
    this.interval = this.setCarouselInterval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setCarouselInterval = () => null // setInterval(() => this.performCarouselAction('right'), 5000);

  setCarouselState = (currentIndex, nextIndex, prevIndex, leftOrRight) => this.setState({ currentIndex, nextIndex, prevIndex }, () => {
    setTimeout(() => this.resetIndexes(leftOrRight === 'left' ? prevIndex : nextIndex), this.props.slideTime * 1000);
  });

  getCarouselItem = (index) => {
    const { carouselArr, CarouselItem } = this.props;
    return <CarouselItem {...carouselArr[index]} />;
  }

  performCarouselAction = (leftOrRight) => {
    const { currentIndex } = this.state;
    const { carouselArr } = this.props;
    let { prevIndex, nextIndex } = this.state;
    if (leftOrRight === 'left') {
      prevIndex = currentIndex === 0 ? carouselArr.length - 1 : currentIndex - 1;
    } else if (leftOrRight === 'right') {
      nextIndex = currentIndex === carouselArr.length - 1 ? 0 : currentIndex + 1;
    }
    this.setCarouselState(currentIndex, nextIndex, prevIndex, leftOrRight);
  }

  handleDotClick = (evt) => {
    const { id } = evt.target;
    const { currentIndex } = this.state;
    if (id !== currentIndex) {
      clearInterval(this.interval);
      const difference = currentIndex - id;
      const indexChange = currentIndex - difference;
      let { prevIndex, nextIndex } = this.state;
      const leftOrRight = difference > 0 ? 'left' : 'right';
      prevIndex = leftOrRight === 'left' ? indexChange : prevIndex;
      nextIndex = leftOrRight === 'right' ? indexChange : nextIndex;
      this.setCarouselState(currentIndex, nextIndex, prevIndex, leftOrRight);
      this.interval = this.setCarouselInterval();
    }
  }

  handleArrowClick = (evt) => {
    evt.persist();
    clearInterval(this.interval);
    this.performCarouselAction(evt.target.name);
    this.interval = this.setCarouselInterval();
  }

  resetIndexes = (index) => this.setState({ currentIndex: index, nextIndex: index, prevIndex: index });

  render() {
    const { currentIndex, prevIndex, nextIndex } = this.state;
    const { carouselArr, carouselHeight, slideTime, arrowOffset } = this.props;
    return (
      !!carouselArr.length && <div>
        <ArrowContainer arrowOffset={arrowOffset}>
          <Arrow onClick={this.handleArrowClick} name="left" src={ArrowLeft} />
          <Arrow onClick={this.handleArrowClick} name="right" src={ArrowRight} />
        </ArrowContainer>
        <CarouselContainer
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          prevIndex={prevIndex}
          carouselHeight={carouselHeight}
          slideTime={slideTime}
        >
          {this.getCarouselItem(prevIndex)}
          {this.getCarouselItem(currentIndex)}
          {this.getCarouselItem(nextIndex)}
        </CarouselContainer>
        <DotsContainer numDots={this.props.carouselArr.length}>
          {this.props.carouselArr.map(({ imgSrc }, index) => (
            <Dot
              id={index}
              key={imgSrc}
              selected={index === currentIndex}
              onClick={this.handleDotClick}
            />)
          )}
        </DotsContainer>
      </div>
    );
  }
}
