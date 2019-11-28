const React = require('react');
const PropTypes = require('prop-types');

const D3Gauge = require('./D3Gauge.jsx');

const TWOPI = Math.PI * 2;

class SpeedometerAnalog extends React.Component {
  static propTypes = {
    speed: PropTypes.number,
    unit: PropTypes.string,
    maxSpeed: PropTypes.number,
    children: PropTypes.node
  }

  static defaultProps = {
    speed: 0,
    unit: 'km/h',
    maxSpeed: 200 // km/h
  }

  render() {
    const {speed, maxSpeed} = this.props;
    const percentage = speed/maxSpeed;

    return (
      <div className='SpeedometerAnalog'>
        <D3Gauge
          startAngle={180 / 360 * TWOPI}
          endAngle={405 / 360 * TWOPI}
          percentage={percentage}
          children={this.props.children}
        />
      </div>
    );
  }
}

module.exports = SpeedometerAnalog;
