import React from 'react'

const BarComponent = ({
  xPos,
  yPos,
  height,
  previousHeight,
  island,
  width,
  paused,
  justPlayed,
  color,
}) => {
  
  return (
    <g className="Bar-Component" transform="scale(1,-1) translate(0, -600)">
      <rect y={yPos} x={xPos} width={width} height={previousHeight} fill={color}>
        <animate
          className="rect-bars-animation"
          attributeName="height"
          from={paused || justPlayed ? height : previousHeight}
          to={height}
          begin="0.1s"
          dur="0.25s"
          fill="freeze"
          restart="always"
          repeatCount="1"
        />
      </rect>
      <text className="bar-label" x={xPos + 10} y={0} transform="rotate(-180) scale(-1, 1)" alignmentBaseline="middle" >{island}</text>
    </g>
  );
}

export default BarComponent;
