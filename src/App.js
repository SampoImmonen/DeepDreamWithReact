import React, { Component } from 'react';

class App extends Component {

  handleApitest = () => {
    fetch('/test')
    .then(response => console.log(response))
  }

  render() {
    return (
      <div>
        <button className="ui basic button" onClick={this.handleApitest}>test api</button>
      </div>
    );
  }
}

export default App;
