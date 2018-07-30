import { RaisedButton, TextField, Paper, DropDownMenu, MenuItem } from 'material-ui';
import React, { Component } from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education: ["Matric", "Bachelars", "InterMediate", "Masters"],
      experience: ["None", "1 Year", "2 Year", "3 Year", "4 Year", "5 Year"],
      edu: 0,
      exp: 0,
      skills: "",
      margin: 12,
    };
  }
  edu = (event, index, value) => this.setState({ edu: value });
  exp = (event, index, value) => this.setState({ exp: value });
  componentWillReceiveProps(nextProps) {
    if (nextProps.store.Education !== "") {
      this.setState({
        edu: this.state.education.indexOf(nextProps.store.Education),
        exp: this.state.experience.indexOf(nextProps.store.Experience),
        skills: nextProps.store.Skills,
      })
    } else {
      this.setState({
        exp: this.state.experience.indexOf(nextProps.store.Experience),
        skills: nextProps.store.Skills,
      })
    }
  }
  submit(e) {
    e.preventDefault(e);
    let { edu, exp, skills, education, experience } = this.state;
    let obj = { Experience: experience[exp], Skills: skills, Education: education[edu] }
    this.props.update(obj, this.props.store.Uid);
  }
  render() {
    return (
      <div style={{ width: "fit-content" }}>
        <Paper style={{ padding: "20px", width: "fit-content" }}>
          <form onSubmit={this.submit.bind(this)}>
            <TextField
              onChange={(val) => { this.setState({ skills: val.target.value }) }}
              hintText="Web Developer" floatingLabelText="Skills"
              value={this.state.skills}
            />
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
            <RaisedButton
              primary={true} onClick={this.submit.bind(this)}
              label="Update" style={{ margin: "3px" }}
            />
          </form>
        </Paper>
      </div>
    );
  }
}