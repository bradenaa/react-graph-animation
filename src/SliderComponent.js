import React from 'react'
import blue from '@material-ui/core/colors/blue';

const SliderComponent = ({ currentYear, previousYear, paused, justPlayed}) => {
  const width = 500 * (1 - ((2005 - currentYear) / 5));
  const previousWidth = 500 * (1 - ((2005 - previousYear) / 5));
  const firstBlue = blue[400]

  var elements = document.getElementsByClassName("rect-animation");
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute("fill", "freeze");
    elements[i].beginElement();
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={500} height={20} id="svg-slider" aria-labelledby="title">
      <g>
        <rect x="0" y="0" width="500" height={20} fill="none" stroke={firstBlue} strokeWidth={2} />
        <rect className="filled-slider" x="0" y="0" width={previousWidth} height={20} fill={firstBlue} >
          <animate 
            className="rect-animation"
            attributeName="width"
            from={paused || justPlayed ? width : previousWidth}
            to={width}
            begin="0.1s"
            dur="0.25s"
            repeatCount="1"
          />
        </rect>
      </g>
    </svg>
  );
}

export default SliderComponent;