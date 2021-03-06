import React, { Component } from 'react';

class Smurf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      nameInput: this.props.name,
      ageInput: this.props.age,
      heightInput: this.props.height,
    };
  }
  handleUpdate = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  initializeUpdate = e => {
    e.preventDefault();
    const [name, age, height] = [this.state.nameInput, this.state.ageInput, this.state.heightInput];
    this.setState({ editing: false });
    this.props.updateSmurf(this.props.id, { name, age, height });
  }
  render() {
    return this.state.editing
      ? (
        <form onSubmit={this.initializeUpdate} className="updateForm">
          <span className="return" onClick={() => this.setState({ editing: false })}></span>
          <input
            placeholder="Name"
            onChange={this.handleUpdate}
            name="nameInput"
            value={this.state.nameInput}
          />
          <input
            placeholder="Age"
            type="number"
            onChange={this.handleUpdate}
            name="ageInput"
            value={this.state.ageInput}
          />
          <input
            placeholder="Height"
            onChange={this.handleUpdate}
            name="heightInput"
            value={this.state.heightInput}
          />
          <button>Submit</button>
        </form>
      )
      : (
        <div className="Smurfs">
          <span className="editSmurf" onClick={() => this.setState({ editing: true })}></span>
          <h3>{this.props.name}</h3>
          <strong>{this.props.height} tall</strong>
          <p>{this.props.age} smurf years old</p>
          <span className="deleteSmurf" onClick={() => this.props.deleteSmurf(this.props.id)}></span>
        </div>
      );
  }
}

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

