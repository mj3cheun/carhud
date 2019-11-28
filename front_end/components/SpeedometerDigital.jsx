const React = require('react');
const PropTypes = require('prop-types');

const D3Gauge = require('./D3Gauge.jsx');

class SpeedometerDigital extends React.Component {
  static propTypes = {
    speed: PropTypes.number,
    unit: PropTypes.string
  }

  static defaultProps = {
    speed: 0,
    unit: 'km/h'
  }

  render() {
    const {speed, unit} = this.props;
    return (
      <div className='SpeedometerDigital D3GaugeCenter'>
        <div className='SpeedometerDigitalSpeed'>
          {speed}
        </div>
        <div className='SpeedometerDigitalUnit'>
          {unit}
        </div>
      </div>
  );
  }
}

module.exports = SpeedometerDigital;
