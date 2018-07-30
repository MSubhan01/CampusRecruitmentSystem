import { RaisedButton, TextField, Paper, DropDownMenu, MenuItem } from 'material-ui';
import React, { Component } from 'react';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "",
      salary: "",
      edu: 0,
      exp: 0,
      shift: 0,
    };
  }
  post(e) {
    e.preventDefault(e);
    let education = ["Matric", "Bachelars", "InterMediate", "Masters"]
    let experience = ["None", "1 Year", "2 Year", "3 Year", "4 Year", "5 Year"]
    let shifts = ["Morning", "Afternoon", "Evening", "Night"]
    let timing = ["5am - 12pm", "12pm - 5pm", "5pm - 9pm", "9pm - 5am"]
    let { position, salary, edu, exp, shift } = this.state;
    let obj = { position, edu: education[edu], exp: experience[exp], shift: shifts[shift], timing: timing[shift], salary, uid: this.props.store.Uid, name: this.props.store.Name }
    if (position !== "" || salary !== "") {
      this.props.post(obj);
      alert("Job Posted")
      this.setState({
        position: "",
        salary: "",
        edu: 0,
        exp: 0,
        shift: 0,
      })
    } else {
      alert("All Fields Required!!!")
    }
  }
  edu = (event, index, value) => this.setState({ edu: value });
  exp = (event, index, value) => this.setState({ exp: value });
  shift = (event, index, value) => this.setState({ shift: value });
  render() {
    return (
      <div style={{ width: "fit-content" }}>
        <Paper style={{ padding: "20px", width: "fit-content" }}>
          <form onSubmit={this.post.bind(this)}>
            <TextField
              onChange={(val) => { this.setState({ position: val.target.value }) }}
              hintText="Employee" floatingLabelText="Position"
              value={this.state.position}
            />
            <br />
            <TextField
              onChange={(val) => { this.setState({ salary: val.target.value }) }}
              hintText="20000" floatingLabelText="Salary"
              value={this.state.salary} type="number"
            />
            <br />
            <h4 style={{ marginBottom: 0 }} >Requirement</h4>
            <br />
            <DropDownMenu
              autoWidth={false}
              value={this.state.edu}
              onChange={this.edu}
              style={{ width: "100%" }}
            >
              <MenuItem value={0} primaryText="Matric" />
              <MenuItem value={1} primaryText="Bachelars" />
              <MenuItem value={2} primaryText="InterMediate" />
              <MenuItem value={3} primaryText="Masters" />
            </DropDownMenu>
            <br />
            <DropDownMenu
              autoWidth={false}
              value={this.state.exp}
              onChange={this.exp}
              style={{ width: "100%" }}
            >
              <MenuItem value={0} primaryText="None" />
              <MenuItem value={1} primaryText="1 Year" />
              <MenuItem value={2} primaryText="2 Year" />
              <MenuItem value={3} primaryText="3 Year" />
              <MenuItem value={4} primaryText="4 Year" />
              <MenuItem value={5} primaryText="5 Year" />
            </DropDownMenu>
            <br />
            <DropDownMenu
              autoWidth={false}
              value={this.state.shift}
              onChange={this.shift}
              style={{ width: "100%" }}
            >
              <MenuItem value={0} primaryText="Morning" />
              <MenuItem value={1} primaryText="Afternoon" />
              <MenuItem value={2} primaryText="Evening" />
              <MenuItem value={3} primaryText="Night" />
            </DropDownMenu>
            <br />
            <DropDownMenu
              autoWidth={false}
              value={this.state.shift}
              onChange={this.shift}
              style={{ width: "100%" }}
            >
              <MenuItem value={0} primaryText="5 am - 12 pm" />
              <MenuItem value={1} primaryText="12 pm - 5 pm" />
              <MenuItem value={2} primaryText="5 pm - 9 pm" />
              <MenuItem value={3} primaryText="9 pm - 5 am" />
            </DropDownMenu>
            <br />
            <RaisedButton
              primary={true} onClick={this.post.bind(this)}
              label="Submit" style={{ margin: "3px" }}
            />
          </form>
        </Paper>
      </div>
    );
  }
}