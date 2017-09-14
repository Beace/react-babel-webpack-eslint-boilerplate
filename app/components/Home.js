import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      ticking: 0,
    };
  }

  onClick = (e) => {
    e.preventDefault();
    this.setState({
      ticking: this.state.ticking + 1,
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick}>ticking1</button>
        <p>
          {this.state.ticking}
        </p>
      </div>
    );
  }
}

export default Home;
