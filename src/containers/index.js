import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthAction from '../store/actions/AuthAction';
import { Config } from "./firebase/firebase";
import React, { Component } from 'react';
import Auth from "./Authentication/Auth";
import Student from "./Student/Student";
import Company from "./Company/Company";
import { connect } from 'react-redux';
import Admin from "./Admin/Admin";
import firebase from "firebase";

function mapStateToProps(state) {
  return {
    Store: state.AuthReducer.auth,
    Jobs: state.Jobs.jobs,
    Users: state.Users.users,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signup: (email, password, name, catogary) => {
      dispatch(AuthAction.signup(email, password, name, catogary))
    },
    signin: (email, password) => {
      dispatch(AuthAction.signin(email, password))
    },
    signout: () => {
      dispatch(AuthAction.signout())
    },
    data: () => {
      dispatch(AuthAction.data())
    },
    update: (obj, uid) => {
      dispatch(AuthAction.update(obj, uid))
    },
    post: (job) => {
      dispatch(AuthAction.post(job))
    },
    companyjobs: (uid) => {
      dispatch(AuthAction.companyjobs(uid))
    },
    delete: (index,Uid) => {
      dispatch(AuthAction.delete(index,Uid))
    },
    studentjobs: (uid) => {
      dispatch(AuthAction.studentjobs(uid))
    },
    apply: (index, store) => {
      dispatch(AuthAction.apply(index, store))
    },
    getusers: () => {
      dispatch(AuthAction.getusers())
    },
    getjobs: () => {
      dispatch(AuthAction.getjobs())
    },
    remove: (index,jobs) => {
      dispatch(AuthAction.remove(index,jobs))
    },
  };
}

class Main extends Component {
  constructor() {
    super();
    this.state = {}
    firebase.initializeApp(Config)
  }
  
  render() {
    return (
      <div className="container" >
        <Router >
          <div>
            <Route exact path="/"
              render={
                (props) => <Auth
                  signin={this.props.signin}
                  signup={this.props.signup}
                  Auth={this.props.Store}
                  history={props.history}
                  data={this.props.data}
                />
              }
            />
            <Route path="/student"
              render={
                (props) => <Student
                  users={this.props.Users.companies}
                  getcompanies={this.props.getusers}
                  getjobs={this.props.studentjobs}
                  signout={this.props.signout}
                  update={this.props.update}
                  Store={this.props.Store}
                  apply={this.props.apply}
                  history={props.history}
                  jobs={this.props.Jobs}
                  data={this.props.data}
                />
              }
            />
            <Route path="/company"
              render={
                (props) => <Company
                  users={this.props.Users.students}
                  getstudents={this.props.getusers}
                  getjobs={this.props.companyjobs}
                  signout={this.props.signout}
                  delete={this.props.delete}
                  Store={this.props.Store}
                  history={props.history}
                  jobs={this.props.Jobs}
                  data={this.props.data}
                  post={this.props.post}
                />
              }
            />
            <Route path="/admin"
              render={
                (props) => <Admin
                  getusers={this.props.getusers}
                  signout={this.props.signout}
                  getjobs={this.props.getjobs}
                  remove={this.props.remove}
                  delete={this.props.delete}
                  Store={this.props.Store}
                  users={this.props.Users}
                  history={props.history}
                  data={this.props.data}
                  jobs={this.props.Jobs}
                />
              }
            />
          </div>
        </Router>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);