import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab, Paper } from 'material-ui';
import React, { Component } from 'react';
import Signin from './Signin'
import Signup from './Signup'

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  componentWillMount() {
    this.props.data()
  }

  handleChange = (value) => { this.setState({ value }) };

  componentWillReceiveProps(nextProps) {
    if (nextProps.Auth.Catogary === "Company") {
      this.props.history.push("/company")
    } else if (nextProps.Auth.Catogary === "Student") {
      this.props.history.push("/student")
    } else if (nextProps.Auth.Catogary === "Admin") {
      this.props.history.push("/admin")
    } else { }
  }

  render() {
    return (
      <div style={{ margin: "1% auto auto auto", display: "block", width: "40%" }}>
        <Paper style={{ paddingBottom: "10px" }}>
          <Tabs
            onChange={this.handleChange}
            value={this.state.value}
          >
            <Tab label="Sign In" value={0} />
            <Tab label="Sign Up" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={this.handleChange}
          >
            <div style={{ padding: 10 }}>
              <Signin signin={this.props.signin} />
            </div>
            <div style={{ padding: 10 }}>
              <Signup signup={this.props.signup} />
            </div>
          </SwipeableViews>
        </Paper>
      </div>
    );
  }
}