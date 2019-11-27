const React = require('react');

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className='root'>
        CarHUD
      </div>
    );
  }
}

module.exports = Root;
