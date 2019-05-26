import React from "react"
import SliderComponent from "./SliderComponent"
import Button from '@material-ui/core/Button';


const SliderContainer = ({
  paused,
  currentYear,
  previousYear,
  onButtonClick,
  justPlayed,
}) => {
  return (
    <div className="Slider-Container">
      <Button variant="contained" color="primary" id="play-button" onClick={onButtonClick}>
        {paused === false ? "Pause" : "Play"}
      </Button>
      <SliderComponent
        paused={paused}
        currentYear={currentYear}
        previousYear={previousYear}
        justPlayed={justPlayed}
      />
    </div>
  );
}

export default SliderContainer