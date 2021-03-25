import React, { Component } from 'react';

class ShowResultImage extends Component {

    handleClick = (e) => {
        if (e.target.name === 'download'){
            var element = document.createElement("a");
            element.href = URL.createObjectURL(this.props.img)
            element.download = "results.png"
            element.click()
            return
        }
        if (e.target.name === 'backtosettings') {
            this.props.handleBackToSettings(e)
        }

    }

    render() {
        return (
            <div>
                <div className = "ui placeholder segment">
                    <img src={URL.createObjectURL(this.props.img)} alt=""/>
                </div>
                <div>
                    <button className="ui green button" name="download" onClick={this.handleClick}>Download</button>
                    <button className="ui basic black button" name="backtosettings" onClick={this.handleClick}>Back to Settings</button>
                </div>
            </div>
        );
    }
}

export default ShowResultImage;