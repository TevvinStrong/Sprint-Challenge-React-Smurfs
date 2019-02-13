import React, { Component } from 'react';
import Axios from 'axios';
import { Route } from 'react-router-dom';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import NavBar from './components/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    /*
    Axios.get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
    */
    this.getSmurfs();
  }

  getSmurfs = () => {
    Axios.get('http://localhost:3333/smurfs')
      /*.then(res => this.setState({ smurfs: res.data }))*/
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => console.log(err));
  }

  deleteSmurf = id => {
    Axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }
  updateSmurf = (id, info) => {
    Axios.put(`http://localhost:3333/smurfs/${id}`, info)
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Route
          path='/'
          component={NavBar}

        />

        <Route
          exact
          path='/'

          render={props => <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} updateSmurf={this.updateSmurf} />}
        />

        <Route
          path='/smurf-form'
          render={props => <SmurfForm {...props} getSmurfs={this.getSmurfs} />}

        />
      </div>
    );
  }
}

export default App;
