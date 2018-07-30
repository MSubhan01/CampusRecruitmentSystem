import SwipeableViews from 'react-swipeable-views';
import React, { Component } from 'react';
import List from "../Components/List";
import Jobs from '../Components/Jobs';
import {
    ToolbarGroup,
    ToolbarTitle,
    FlatButton,
    MenuItem,
    Toolbar,
    Tabs,
    Tab,
} from 'material-ui'

export default class Admin extends Component {
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
            this.props.getjobs()
        }, 3000)
        this.props.getusers()
    }
    componentWillReceiveProps(nextProps) {
        this.setState({jobs: nextProps.jobs})
        if (nextProps.Store.Catogary === "Company") {
            nextProps.history.push("/company")
        } else if (nextProps.Store.Catogary === "Student") {
            this.props.history.push("/student")
        } else if (nextProps.Store.Catogary === "") {
            nextProps.history.push("/")
        } else { }
    }
    handle(value) { this.setState({ value }) }
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
                            onChange={this.handle.bind(this)}
                            value={this.state.value}
                        >
                            <Tab label="Jobs" value={0} />
                            <Tab label="Students" value={1} />
                            <Tab label="Companies" value={2} />
                        </Tabs>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <FlatButton label="SignOut" onClick={this.signout.bind(this)} />
                    </ToolbarGroup>
                </Toolbar>
                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handle}
                >
                    <div style={{ padding: 10 }}>
                        <Jobs show={true} delete={this.props.delete} store={this.props.Store} jobs={this.state.jobs} />
                    </div>
                    <div style={{ padding: 27 }}>
                        <List remove={this.props.remove} admin={true} students={true} users={this.props.users.students} />
                    </div>
                    <div style={{ padding: 10 }}>
                        <List remove={(index)=>this.props.remove(index,this.state.jobs)} admin={true} students={false} users={this.props.users.companies} />
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}