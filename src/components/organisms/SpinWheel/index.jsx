/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import styles from './SpinWheel.module.scss';

class SpinWheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: 1,
          name: 'The First Category',
          icon: 'https://img.icons8.com/ios-filled/154/plus-key.png',
        },
        {
          id: 2,
          name: 'The Second Category',
          icon: 'https://img.icons8.com/ios-filled/154/plus-key.png',
        },
        {
          id: 3,
          name: 'The Third Category',
          icon: 'https://img.icons8.com/ios-filled/154/plus-key.png',
        },
        {
          id: 4,
          name: 'The Fourth Category',
          icon: 'https://img.icons8.com/ios-filled/154/plus-key.png',
        },
        {
          id: 5,
          name: 'The Fifth Category',
          icon: 'https://img.icons8.com/ios-filled/154/plus-key.png',
        },
        {
          id: 6,
          name: 'The Sixth Category',
          icon: 'https://img.icons8.com/ios-filled/154/plus-key.png',
        },
      ],
      // list: ['$100', '$500', '$9,999', '$1', '$60', '$1,000', '$4.44'],
      radius: 75, // PIXELS
      rotate: 0, // DEGREES
      easeOut: 0, // SECONDS
      angle: 0, // RADIANS
      top: null, // INDEX
      offset: null, // RADIANS
      // eslint-disable-next-line react/no-unused-state
      net: null, // RADIANS
      result: null, // INDEX
      spinning: false,
    };
  }

  componentDidMount() {
    // generate canvas wheel on load
    this.renderWheel();
  }

  // eslint-disable-next-line react/sort-comp
  renderWheel() {
    // determine number/size of sectors that need to created
    // eslint-disable-next-line react/destructuring-assignment
    const numOptions = this.state.list.length;
    const arcSize = (2 * Math.PI) / numOptions;
    this.setState({
      angle: arcSize,
    });

    // get index of starting position of selector
    this.topPosition(numOptions, arcSize);

    // dynamically generate sectors from state list
    let angle = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numOptions; i++) {
      // eslint-disable-next-line react/destructuring-assignment
      const text = this.state.list[i].name;
      const ico = this.state.list[i].icon;
      this.renderSector(i + 1, text, ico, angle, arcSize, this.getColor());
      angle += arcSize;
    }
  }

  topPosition = (num, angle) => {
    // set starting index and angle offset based on list length
    // works upto 9 options
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    this.setState({
      top: topSpot - 1,
      offset: degreesOff,
    });
  };

  renderSector(index, text, ico, start, arc, color) {
    // create canvas arc for each list element
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const { radius } = this.state;
    const startAngle = start;
    const endAngle = start + arc;
    const angle = index * arc;
    const baseSize = radius * 3.33;
    const textRadius = baseSize - 150;
    const image = new Image();
    // eslint-disable-next-line max-len
    image.src = `${ico}`;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius,
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);

    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    image.onload = () => {
      ctx.drawImage(image, -ctx.measureText(text).width / 20, 0, 100, 100);
    };
    ctx.restore();
  }

  // eslint-disable-next-line class-methods-use-this
  getColor() {
    // randomly generate rbg values for wheel sectors
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  }

  spin = () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation
    const randomSpin = Math.floor(Math.random() * 900) + 500;
    this.setState({
      rotate: randomSpin,
      easeOut: 2,
      spinning: true,
    });

    // calcalute result after wheel stops spinning
    setTimeout(() => {
      this.getResult(randomSpin);
    }, 2000);
  };

  getResult = (spin) => {
    // find net rotation and add to offset angle
    // repeat substraction of inner angle amount from total distance traversed
    // use count as an index to find value of result from state list
    const {
      angle, top, offset, list,
    } = this.state;
    const netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel -= angle;
      // eslint-disable-next-line no-plusplus
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = list.length + count;
    }

    // set state variable to display result
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      net: netRotation,
      result,
    });
  };

  reset = () => {
    // reset wheel and result
    this.setState({
      rotate: 0,
      easeOut: 0,
      result: null,
      spinning: false,
    });
  };

  render() {
    const {
      list,
      result,
      spinning,
      rotate,
      easeOut,
    } = this.state;

    const players = list.map((item) => item.name);

    return (
      <div className="App">
        <canvas
          id="wheel"
          width="500"
          height="500"
          style={{
            WebkitTransform: `rotate(${rotate}deg)`,
            WebkitTransition: `-webkit-transform ${easeOut}s ease-out`,
          }}
        />

        {spinning ? (
          <button type="button" className={styles.spinButton} id="reset" onClick={this.reset}>
            reset
          </button>
        ) : (
          <button type="button" className={styles.spinButton} id="spin" onClick={this.spin}>
            spin
          </button>
        )}
        <div className="display">
          <span id="readout">
            YOU WON:
            {players[result] ? players[result] : null}
          </span>
        </div>
      </div>
    );
  }
}

export default SpinWheel;
