import { RaisedButton, TextField, DropDownMenu, MenuItem } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import React, { Component } from 'react';
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      catogary: ["Student", "Company"],
      name: "",
      email: "",
      password: "",
    };
  }
  signup(e) {
    e.preventDefault(e);
    let catogary = this.state.catogary[this.state.value];
    if (this.state.name !== "") {
      this.props.signup(
        this.state.email,
        this.state.password,
        this.state.name,
        catogary,
      )
    } else { alert("Something Went Wrong") }
  }
  handleChange(event, index, value) {
    this.setState({ value: value })
  };
  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
          <MenuItem value={0} primaryText="Student" />
          <MenuItem value={1} primaryText="Company" />
        </DropDownMenu>
        <SwipeableViews
                index={this.state.value}
              >
                <div style={{padding:10}}>
                  <form onSubmit={this.signup.bind(this)}>
                    <TextField
                      onChange={(val) => {this.setState({name: val.target.value})}} 
                      hintText="Example" floatingLabelText="User Name"
                      className="name-up"
                    />
                    <br />
                    <TextField
                      onChange={(val) => {this.setState({email: val.target.value})}} 
                      hintText="someone@example.com" floatingLabelText="E-Mail"
                      className="email-up"
                    />
                    <br />
                    <TextField
                      onChange={(val) =>{this.setState({password: val.target.value})}}
                      hintText="Key Word" floatingLabelText="Password"
                      type="password" className="password-up"
                    />
                    <br />
                    <RaisedButton 
                      primary={true} onClick={this.signup.bind(this)} 
                      label="Sign Up" style={{margin:"3px"}} 
                    />
                  </form>
                </div>
                <div style={{padding:10}}>
                  <form onSubmit={this.signup.bind(this)}>
                    <TextField
                      onChange={(val) => {this.setState({name: val.target.value})}} 
                      hintText="Example" floatingLabelText="Company Name"
                      className="name-up"
                    />
                    <br />
                    <TextField
                      onChange={(val) => {this.setState({email: val.target.value})}} 
                      hintText="someone@example.com" floatingLabelText="E-Mail"
                      className="email-up"
                    />
                    <br />
                    <TextField
                      onChange={(val) =>{this.setState({password: val.target.value})}}
                      hintText="Key Word" floatingLabelText="Password"
                      type="password" className="password-up"
                    />
                    <br />
                    <RaisedButton 
                      label="Sign Up" style={{margin:"3px"}} 
                      primary={true} onClick={this.signup.bind(this)} 
                    />
                  </form>
                </div>
              </SwipeableViews>
        {/* <form onSubmit={this.signup.bind(this)}>
          <SwipeableViews index={this.state.value} styl >
            <TextField
              onChange={(val) => { this.setState({ name: val.target.value }) }}
              hintText="Example" floatingLabelText="User Name"
              className="name-up"
            />
            <TextField
              onChange={(val) => { this.setState({ name: val.target.value }) }}
              hintText="Example" floatingLabelText="Company Name"
              className="name-up"
            />
          </SwipeableViews>
          <br />
          <TextField
            onChange={(val) => { this.setState({ email: val.target.value }) }}
            hintText="someone@example.com" floatingLabelText="E-Mail"
            className="email-up"
          />
          <br />
          <TextField
            onChange={(val) => { this.setState({ password: val.target.value }) }}
            hintText="Key Word" floatingLabelText="Password"
            type="password" className="password-up"
          />
          <br />
          <RaisedButton
            primary={true} onClick={this.signup.bind(this)}
            label="Sign Up" style={{ margin: "3px" }}
          />
        </form> */}
      </div>
    );
  }
}
export default Signup;