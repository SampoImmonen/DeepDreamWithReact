import React, { Component } from 'react';

class Slider extends Component {

    handleChange = (e) => {
        this.props.handleChange(e)
    }

    render() {
        return (
            <div>
                <div className="ui label">{this.props.name}</div>
                <div>
                    <input type="range" min={this.props.min} max={this.props.max} value={this.props.value} step={this.props.step} onChange={this.handleChange} className="ui slider" id="myRange"/>
                    <div className="ui input">
                        {this.props.value}
                    </div>
                </div>
            </div>
        );
    }
}

export default Slider;