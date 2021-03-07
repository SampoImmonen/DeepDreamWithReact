import React, { Component } from 'react';

class ImageUpload extends Component {

    handleUpload = (e) => {
        var file = e.target.files[0]
        this.props.handleUpload(file)
    }

    render() {
        return (
            <div>
                <div className="ui placeholder segment">
                    <div className="ui icon header">
                        <i className="image file outline icon"></i>
                        Upload a source image
                    </div>
                <input className="ui yellow button basic" type="file" onChange={this.handleUpload}/>
            </div>
            </div>
        );
    }
}

export default ImageUpload;