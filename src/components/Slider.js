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
                        <input type="text" value={this.props.value} className="ui input" readOnly/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slider;