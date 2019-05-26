import React, { Component } from "react";
import pigData from "./wild-pig-data.json";
import BarContainer from "./BarContainer"
import SliderContainer from "./SliderContainer"

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      justPlayed: true,
      previousPopulations: {},
      dataToShow: [],
      currentYear: null,
      previousYear: null,
      intervalID: null,
      maxPopulation: 15000,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const year = Number(params.get('year'));
    const paused = params.get('paused') === 'true' ? true : false;

    if (year) {
      this.setState(prevState => {
        const dataToShow = pigData["PIG POPULATIONS"].filter((data) => {
          return data.year === year;
        })
        const previousPopulations = dataToShow.reduce((acc, data) => {
          acc[data.island] = 0;
          return acc;
        }, {})
        return { ...prevState, previousPopulations, dataToShow, paused, previousYear: 2000, currentYear: year }
      })
    } else {
      this.setState(prevState => {
        const dataToShow = pigData["PIG POPULATIONS"].filter((data) => {
          return data.year === 2000;
        })
        const previousPopulations = dataToShow.reduce((acc, data) => {
          acc[data.island] = 0;
          return acc;
        }, {})
        return { ...prevState, previousPopulations, dataToShow, paused, previousYear: 2000, currentYear: 2000 }
      });
    }

    if (!paused) this.onButtonClick();
  }

  onButtonClick() {
    if (this.state.paused) {
      const intervalID = setInterval(() => {
        this.updateYear();
      }, 1000);
      this.setState(prevState => {
        return { ...prevState, intervalID, paused: false, justPlayed: true }
      })
    } else {
      clearInterval(this.state.intervalID);
      this.setState(prevState => {
        return { ...prevState, intervalID: null, paused: true }
      })
    }
  }

  updateYear() {
    const { currentYear } = this.state;
    const newYear = currentYear === 2005 ? 2000 : currentYear + 1;
    const dataToShow = pigData["PIG POPULATIONS"].filter((data) => {
      return data.year === newYear;
    });

    this.setState(prevState => {
      const previousPopulations = prevState.dataToShow.reduce((acc, data) => {
        acc[data.island] = data.pigPopulation;
        return acc;
      }, {})
      return {
        ...prevState,
        previousPopulations,
        dataToShow,
        previousYear: prevState.currentYear,
        currentYear: newYear,
        justPlayed: false,
      }
    })
  }

  render() {
    const { paused, previousPopulations, dataToShow, currentYear, previousYear, maxPopulation, justPlayed } = this.state;
    return (
      <div className="Graph-Container">
        <BarContainer
          dataToShow={dataToShow}
          previousPopulations={previousPopulations}
          currentYear={currentYear}
          previousYear={previousYear}
          maxPopulation={maxPopulation}
          paused={paused}
          justPlayed={justPlayed}
        />
        <SliderContainer 
          paused={paused}
          onButtonClick={this.onButtonClick}
          currentYear={currentYear}
          previousYear={previousYear}
          justPlayed={justPlayed}
        />
      </div>
    );
  };
}

export default GraphContainer;