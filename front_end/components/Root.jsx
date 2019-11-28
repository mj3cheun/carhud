const React = require('react');

const SpeedometerAnalog = require('./SpeedometerAnalog.jsx');
const SpeedometerDigital = require('./SpeedometerDigital.jsx');

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicleState: {
        speed: 60,
        unit: 'km/h'
      }
    }

    window.x = (y) => this.setState(y);
    window.vehicle = (y) => this.setState({vehicleState: y});
  }

  render() {
    const centerDisplacement = 20;
    const zoom = 1.2;
    return (
      <div
        className='root'
        style={{
          marginTop: `${-centerDisplacement}vh`,
          transform: `scale(${zoom})`
        }}
      >
        <SpeedometerAnalog {...this.state.vehicleState}>
          <SpeedometerDigital {...this.state.vehicleState}/>
        </SpeedometerAnalog>
      </div>
    );
  }
}

module.exports = Root;
