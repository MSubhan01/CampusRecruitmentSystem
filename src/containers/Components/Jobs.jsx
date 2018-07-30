import React, { Component } from 'react';
import Job from "./Job";

export default class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            jobs: nextProps.jobs,
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.jobs.map((key) => {
                        return <Job
                            show={this.props.show}
                            delete={this.props.delete}
                            store={this.props.store}
                            apply={this.props.apply}
                            jobs={key}
                            key={key.index}
                        />
                    })
                }
            </div>
        );
    }
}