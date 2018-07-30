import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {
    RaisedButton,
} from 'material-ui';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            students: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            users: nextProps.users,
            students: nextProps.students,
        })
    }
    render() {
        return (
            <div>
                <Table
                    style={{ maxHeight: "500px" }}
                    selectable={false}

                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        {
                            this.state.users !== undefined
                                ?
                                this.state.students
                                    ?
                                    <TableRow>
                                        <TableHeaderColumn tooltip="Index">Index</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="E-Mail">E-Mail</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Education">Education</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Skills">Skills</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Experience">Experience</TableHeaderColumn>
                                        {this.props.admin
                                            ?
                                            <TableHeaderColumn tooltip="Delete User">Delete</TableHeaderColumn>
                                            :
                                            null
                                        }
                                    </TableRow>
                                    :
                                    <TableRow>
                                        <TableHeaderColumn tooltip="Index">Index</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="E-Mail">E-Mail</TableHeaderColumn>
                                        {this.props.admin
                                            ?
                                            <TableHeaderColumn tooltip="Delete User">Delete</TableHeaderColumn>
                                            :
                                            null
                                        }
                                    </TableRow>
                                :
                                null
                        }
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        {
                            this.state.users !== undefined
                                ?
                                this.state.students
                                    ?
                                    this.state.users.map((row, index) => {
                                        return <TableRow key={index}>
                                            <TableRowColumn>{index + 1}</TableRowColumn>
                                            <TableRowColumn>{row.Name}</TableRowColumn>
                                            <TableRowColumn>{row.Email}</TableRowColumn>
                                            <TableRowColumn>{row.Education}</TableRowColumn>
                                            <TableRowColumn>{row.Skills}</TableRowColumn>
                                            <TableRowColumn>{row.Experience}</TableRowColumn>
                                            {this.props.admin
                                                ?
                                                <TableRowColumn>
                                                    <RaisedButton
                                                        primary={true}
                                                        onClick={() => this.props.remove(row.Uid)}
                                                        label="Delete" style={{ margin: "0px" }}
                                                    />
                                                </TableRowColumn>
                                                :
                                                null
                                            }
                                        </TableRow>
                                    })
                                    :
                                    this.state.users.map((row, index) => {
                                        return <TableRow key={index}>
                                            <TableRowColumn>{index + 1}</TableRowColumn>
                                            <TableRowColumn>{row.Name}</TableRowColumn>
                                            <TableRowColumn>{row.Email}</TableRowColumn>
                                            {this.props.admin
                                                ?
                                                <TableRowColumn>
                                                    <RaisedButton
                                                        primary={true}
                                                        onClick={() => this.props.remove(row.Uid)}
                                                        label="Delete" style={{ margin: "0px" }}
                                                    />
                                                </TableRowColumn>
                                                :
                                                null
                                            }
                                        </TableRow>
                                    })
                                :
                                null
                        }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default List;