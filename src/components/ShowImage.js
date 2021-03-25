import React, { Component } from 'react';

class ShowImage extends Component {

    handleDelete = () => {
        this.props.handleDelete()
    }

    render() {
        return (
            <div>
            <div className = "ui placeholder segment">
                <img src={this.props.img.src} alt=""/>
                <div className="ui segment">
                <button className="ui button red" onClick={this.handleDelete}>Delete</button>
                </div>
                </div>
            </div>
        );
    }
}

export default ShowImage;