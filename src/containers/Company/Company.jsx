import SwipeableViews from 'react-swipeable-views';
import React, { Component } from 'react';
import Post from './Post'
import Jobs from '../Components/Jobs'
import {
    Tabs, Tab,
    FlatButton,
    ToolbarGroup,
    ToolbarTitle,
    MenuItem,
    Toolbar,
} from 'material-ui'
import List from "../Components/List";

export default class Company extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            jobs: [],
        };
    }

    componentWillMount() {
        this.props.data()
        setTimeout(() => {
            this.props.getjobs(this.props.Store.Uid)
        }, 3000)
        this.props.getstudents()
    }
    cs
    componentWillReceiveProps(nextProps) {
        this.setState({
            jobs: nextProps.jobs
        })
        if (nextProps.Store.Catogary === "Student") {
            nextProps.history.push("/student")
        } else if (nextProps.Store.Catogary === "Admin") {
            this.props.history.push("/admin")
        } else if (nextProps.Store.Catogary === "") {
            nextProps.history.push("/")
        } else { }
    }

    handleChange(value) { this.setState({ value }) };

    signout() {
        this.props.signout()
        this.props.history.push("/")
    }

    render() {
        return (
            <div className="container">
                <Toolbar style={{ margin: "auto 2%" }}>
                    <ToolbarGroup firstChild={true}>
                        <MenuItem>
                            <ToolbarTitle style={{ color: "white" }} text={this.props.Store.Name} />
                        </MenuItem>
                    </ToolbarGroup>
                    <ToolbarGroup style={{ width: "100%", margin: "auto" }} >
                        <Tabs
                            style={{ width: "30%", margin: "auto" }}
                            onChange={this.handleChange.bind(this)}
                            value={this.state.value}
                        >
                            <Tab label="Post" value={0} />
                            <Tab label="Jobs" value={1} />
                            <Tab label="Students" value={2} />
                        </Tabs>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <FlatButton label="SignOut" onClick={this.signout.bind(this)} />
                    </ToolbarGroup>
                </Toolbar>
                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChange.bind(this)}
                >
                    <div style={{ margin: "0% 0% 0% 38%", padding: 10 }}>
                        <Post post={this.props.post} store={this.props.Store} />
                    </div>
                    <div style={{ padding: 10 }}>
                        <Jobs show={false} delete={(index) => { this.props.delete(index, this.props.Store.Uid) }} jobs={this.state.jobs} />
                    </div>
                    <div style={{ padding: 10 }}>
                        <List students={true} users={this.props.users} />
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}