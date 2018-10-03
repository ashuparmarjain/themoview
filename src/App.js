import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './Style/App.css';
import Home from './Page/Home';
import UpcomingMovies from './Page/Upcoming';
import Movie from './Page/Movie';
import Header from './Component/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>  
          <main id="page-wrapper">
              <Route exact path="/" component={Home} />
              <Route path="/upcoming-movies" component={UpcomingMovies} />
              <Route exact path="/movie/:id" render={(props) => (
              <Movie key={props.match.params.id} {...props} />)} />
          </main>     
      </div>
    );
  }
}
export default App;
