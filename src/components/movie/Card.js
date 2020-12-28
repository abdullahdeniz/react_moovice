import React from 'react';
import styled, { keyframes } from 'styled-components';
import { pulse as anim, fade } from 'react-animations';

import placeholder from '../../placeholder.png'; // https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/DVD.png/360px-DVD.png
import '../../animate.css';

const animation = keyframes`${anim}`;
const fading = keyframes`${fade}`;


const Animate = styled.div`
  animation: 1s ${animation};
`;
const Fade = styled.div`
  animation: 1s ${fading};
`;

const Animator = ({ isFading, children }) => {
  if (isFading === true) {
    return (
      <Fade>{children}</Fade>
    );
  }
  return (
    <Animate>{children}</Animate>
  );
};

class Card extends React.Component {
  state = {
    isFading : false
  };

  // componentDidUpdate() {
  //   console.log('movie/Card#componentDidUpdate');
  //   if (this.state.isFading === false) {
  //     this.setState({
  //       isFading: true
  //     });
  //   }
  // }

  render() {
    const {
      title,
      img,
      description
    } = this.props;
    return (
      <div onClick={this.props.onClick} style={{
        cursor: 'pointer',
        textAlign: 'center'
      }}>
          <img src={img} alt={title} style={{
            width: 100
          }} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
}

Card.defaultProps = {
  img : placeholder
};

export default Card;