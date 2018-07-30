import { RaisedButton, Paper } from 'material-ui';
import React, { Component } from 'react';
import Name from "./Name";

export default class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div style={{ float: "left", margin: "10px", padding: "10px", width: "225px" }}>
                <Paper>
                    <div style={{ padding: "5px 10px", }}>
                        <div style={{ backgroundColor: "#76FF03", color: "#303030", padding: "1px 0px" }}>
                            {this.props.store === undefined ? null : <h2>{this.props.jobs.name}</h2>}
                            <h3> Position: {this.props.jobs.position} </h3>
                        </div>
                        <div>
                            <h4> Requirements </h4>
                            <h5>
                                Education: {this.props.jobs.edu} <br />
                                Experience: {this.props.jobs.exp} <br />
                                Salary: {this.props.jobs.salary} <br />
                                Shift: {this.props.jobs.shift} <br />
                                Timing: {this.props.jobs.timing}
                            </h5>
                            {this.props.store === undefined || this.props.show
                                ?
                                <div>
                                    <div style={{ height: "36px", overflow: "auto" }} >
                                        {this.props.jobs.apply.map((key) => {
                                            return <Name key={key.Uid} keys={key} jobs={this.props.jobs} />
                                        })}
                                    </div>
                                    <RaisedButton
                                        primary={true} onClick={() => { this.props.delete(this.props.jobs.index) }}
                                        label="Delete" style={{ margin: "3px" }}
                                    />
                                </div>
                                :
                                <RaisedButton
                                    primary={true} onClick={() => { this.props.apply(this.props.jobs.index, this.props.store) }}
                                    label={this.props.jobs.apply ? "Applied" : "Apply"} style={{ margin: "3px" }} disabled={this.props.jobs.apply}
                                />
                            }
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}