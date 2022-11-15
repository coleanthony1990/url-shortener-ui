import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: ''
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => this.setState({urls: data.urls}))
    .catch(error => this.setState({error: error}))
  }
  postNewUrl = (input) => {
    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(input)
    })
    .then(res => res.json())
    .then(data => this.setState({urls: [...this.state.urls, data]}))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm postNewUrl={this.postNewUrl}/>
        </header>

        <UrlContainer urls={this.state.urls} error={this.state.error}/>
      </main>
    );
  }
}

export default App;
