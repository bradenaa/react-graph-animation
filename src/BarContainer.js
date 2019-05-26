import React, { Fragment, Component } from 'react'
import BarComponent from "./BarComponent"
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/teal';

class BarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.paused === nextProps.paused) {
      this.svgRef.setCurrentTime(0);
    }
  }

  render() {
    const { currentYear, dataToShow, maxPopulation, previousPopulations, paused, justPlayed } = this.props;

    // Graph Dimensions
    const graphWidth = 900;
    const graphHeight = 650;
    const topPadding = 100;
    const bottomPadding = 25;
    const leftPadding = 75;
    const barWidth = 80;

    // BarComponent Colors
    const firstBlue = blue[400];
    const secondBlue = blue[200]

    // Axis-Line Colors
    const firstTeal = teal[400]

    // BarComponents
    const barComponents = dataToShow.map((data, i) => {
      const newHeight = (graphHeight - topPadding + bottomPadding) * (data.pigPopulation / maxPopulation)
      const previousHeight = (graphHeight - topPadding + bottomPadding) * (previousPopulations[data.island] / maxPopulation);
      const color = i % 2 === 0 ? firstBlue : secondBlue
      return (
        <g key={data.year.toString() + i.toString()}>
          <BarComponent 
            xPos={i * 100}
            yPos={20}
            width={barWidth}
            height={newHeight}
            previousHeight={previousHeight}
            island={data.island}
            graphHeight={graphHeight}
            bottomPadding={bottomPadding}
            topPadding={topPadding}
            paused={paused}
            justPlayed={justPlayed}
            color={color}
          />
        </g>
      )
    });

    // Y-Axis Tick marks
    const yTicks = [];
    for (let i = 0; i < 4; i += 1) {
      const yHeight = (graphHeight - 40) - ((i / 3) * ((graphHeight - 40) - (topPadding - bottomPadding - 30)))
      const value = maxPopulation * (i/3)
      yTicks.push(
        <Fragment key={value.toString() + i}>
          <line x1={leftPadding - 15} y1={yHeight} x2={leftPadding} y2={yHeight} stroke={firstTeal} strokeWidth={3} />
          <text className="y-tickmark" alignmentBaseline="middle" x={0} y={yHeight}>{value}</text>
        </Fragment>
      )
    }

    return (
      <div className="Bar-Container">
        <svg xmlns="http://www.w3.org/2000/svg" width={graphWidth} height={graphHeight} aria-labelledby="title" ref={(svg) => { this.svgRef = svg }}>
          <g className="svg-bar-container">

            {/* Title */}
            <text className="title" x={leftPadding + 40} y="20">Pig Data for the year {currentYear}</text>

            {/* X & Y Axis Lines */}
            <line x1={leftPadding} y1="0" x2={leftPadding} y2={graphWidth - 2} stroke={firstTeal} strokeWidth={3} />
            <line x1={leftPadding} y1={graphHeight - 2} x2={graphWidth} y2={graphHeight - 2} stroke={firstTeal} strokeWidth={3} />

            {/* Y-Axis Tick Marks */}
            {yTicks}

            {/* Bar Component Graphs */}
            <g className="bar-graph-components" transform="translate(100, 30)">
              {barComponents}
            </g>
          </g>
        </svg>
      </div>
    );
  };
}


export default BarContainer
