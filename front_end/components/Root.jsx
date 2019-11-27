const React = require('react');

const D3Gauge = require('./D3Gauge.jsx');

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gaugePercent: 0.10,
    };

    window.setGauge = this.setGauge;
  }

  setGauge = (per) => {
    this.setState({gaugePercent: per});
  }

  render() {
    return (
      <div className='root'>
        CarHUD
        <D3Gauge percentage={this.state.gaugePercent}/>
      </div>
    );
  }
}

module.exports = Root;
