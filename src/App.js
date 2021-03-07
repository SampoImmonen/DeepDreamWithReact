import React, { Component } from 'react';
import UploadApp from './components/UploadApp.js'
class App extends Component {

  handleApitest = () => {
    fetch('/test')
    .then(response => console.log(response))
  }

  render() {
    return (
      <div>
        <button className="ui basic button" onClick={this.handleApitest}>test api</button>
        <UploadApp />
      </div>
    );
  }
}

export default App;
