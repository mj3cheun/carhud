const React = require('react');
const PropTypes = require('prop-types');
const d3 = require('d3');

const TWOPI = Math.PI * 2;

class D3Gauge extends React.Component {
  static propTypes = {
    radius: PropTypes.number,
    border: PropTypes.number,
    padding: PropTypes.number,
    color: PropTypes.string,
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    percentage: PropTypes.number,
    speed: PropTypes.number,
    children: PropTypes.node
  }

  static defaultProps = {
    radius: 100,
    border: 5,
    padding: 30,
    color: '#FFFFFF',
    startAngle: 225 / 360 * TWOPI,
    endAngle: 495 / 360 * TWOPI,
    percentage: 0,
    speed: 0.01 // percentage per tick
  }

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };

    this.currentPercent = 0;
  }

  componentDidMount() {
    this.renderGauge();

    this.stepGauge();
  }

  componentDidUpdate(prevProps) {
    const {radius, border, padding, color, startAngle, endAngle, percentage} = this.props;
    if(prevProps.percentage !== percentage) {
      const startPercent = startAngle / TWOPI;
      const endPercent = startPercent + ((endAngle - startAngle) / TWOPI * percentage);

      this.stepGauge();
    }
  }


  renderGauge = () => {
    const {radius, border, padding, color, startAngle, endAngle, percentage} = this.props;

    var startPercent = startAngle / TWOPI;
    var endPercent = startPercent + ((endAngle - startAngle) / TWOPI * percentage);

    var boxSize = (radius + padding) * 2;

    this.arc = d3.arc()
        .startAngle(startAngle)
        .innerRadius(radius)
        .outerRadius(radius - border);

    var parent = d3.select(this.refs.rootElement);

    var svg = parent.append('svg')
        .attr('width', boxSize)
        .attr('height', boxSize);

    var defs = svg.append('defs');

    var filter = defs.append('filter')
        .attr('id', 'blur');

    filter.append('feGaussianBlur')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', '2');

    var g = svg.append('g')
        .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

    var meter = g.append('g')
        .attr('class', 'progress-meter');

    meter.append('path')
        .attr('class', 'background')
        .attr('fill', '#ccc')
        .attr('fill-opacity', 0.5)
        .attr('d', this.arc.endAngle(endAngle));

    this.foreground = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1)
        .attr('stroke', color)
        .attr('stroke-width', 5)
        .attr('stroke-opacity', 1)
        .attr('filter', 'url(#blur)');

    this.front = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1);

    this.numberText = meter.append('text')
        .attr('fill', '#fff')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');

    this.currentPercent = startPercent;
  }

  stepGauge = () => {
    this.updateGauge(this.currentPercent);

    const {startAngle, endAngle, percentage, speed} = this.props;

    var startPercent = startAngle / TWOPI;
    var endPercent = startPercent + ((endAngle - startAngle) / TWOPI * percentage);

    const step = Math.abs(endPercent - this.currentPercent) < speed ? Math.abs(endPercent - this.currentPercent) : speed;
    if (step > 0) {
        this.currentPercent += (endPercent < this.currentPercent ? -1 : 1) * step;
        setTimeout(this.stepGauge, 10);
    }
  }

  updateGauge = currentPercent => {
    const {startAngle, endAngle} = this.props;
    const formatPercent = d3.format('.0%');

    this.foreground.attr('d', this.arc.endAngle(TWOPI * currentPercent));
    this.front.attr('d', this.arc.endAngle(TWOPI * currentPercent));
    // turn off for now
    // this.numberText.text(formatPercent((currentPercent * TWOPI - startAngle) / (endAngle - startAngle)));
  }


  render() {
    return (
      <div className='D3Gauge' ref="rootElement">
        {this.props.children}
      </div>
    );
  }
}

module.exports = D3Gauge;
