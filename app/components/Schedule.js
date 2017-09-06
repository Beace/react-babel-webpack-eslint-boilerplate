import React from 'react';

class Schedule extends React.Component {
  state = {
    ticking: 0,
  }

  onClick = () => {
    this.setState({
      ticking: this.state.ticking + 1,
    });
  }

  render() {
    return (
      <div>
        {this.state.ticking}
        <button onClick={this.onClick}>ticking</button>
      </div>
    );
  }
}

export default Schedule;
