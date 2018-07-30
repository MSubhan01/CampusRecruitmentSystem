import React, { Component } from 'react';
import {
    FlatButton,
    Dialog,
} from 'material-ui';

class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    };

    handleClose() {
        this.setState({
            open: false,
        });
    };
    render() {
        return (
            <p
                style={{ margin: 0 }}
                key={this.props.jobs.index}
                onClick={this.handleOpen.bind(this)}
            >
                {this.props.keys.Name}
                <Dialog
                    title="Student Details"
                    actions={
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.handleClose.bind(this)}
                        />
                    }
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}
                    contentStyle={{ height: "80%" }}
                >
                    <div style={{ marginLeft: "40%" }} >
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name:</td><td>{this.props.keys.Name}</td>
                                </tr>
                                <tr>
                                    <td>Skills:</td><td>{this.props.keys.Skills}</td>
                                </tr>
                                <tr>
                                    <td>Education:</td><td>{this.props.keys.Education}</td>
                                </tr>
                                <tr>
                                    <td>Experience:</td><td>{this.props.keys.Experience}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Dialog>
            </p>
        );
    }
}

export default Name;