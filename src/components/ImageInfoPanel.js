import React, { Component } from 'react';

class ImageInfoPanel extends Component {




    getImageSize = () => {
        if (this.props.img){
            return  {'height':this.props.img.height, 'width' : this.props.img.width}
        }
        else {
            return "No Image"
        }
    }

    getOctaveMinSize = () =>{
        if (this.props.img) {
            const newheight = (this.props.octavestep**this.props.octavemin)*this.getImageSize().height
            const newwidth = (this.props.octavestep**this.props.octavemin)*this.getImageSize().width
            return {'height':Math.floor(newheight), 'width':Math.floor(newwidth)}
        } else {
            return ' '
        }
    }

    getOctaveMaxSize = () => {

        var imgsize = this.getImageSize()
        if (this.props.img) {
            const newheight = (this.props.octavestep**this.props.octavemax)*imgsize.height
            const newwidth = (this.props.octavestep**this.props.octavemax)*imgsize.width
            return {'height':Math.floor(newheight), 'width':Math.floor(newwidth)}
        } else {
            return ' '
        }
    }

    getContent = () => {
        if (this.props.img.complete){
            var imgsize = this.getImageSize()
            var octaveminsize = this.getOctaveMinSize()
            var octavemaxsize = this.getOctaveMaxSize()

            return (
                <div>
                    <div className="ui segment lifted">
                    <h2>Image Size {imgsize.height}X{imgsize.width}</h2>
                    </div>
                    <div className="ui segment lifted">
                    <h2>Min Octave Size {octaveminsize.height}X{octaveminsize.width}</h2>
                    </div>
                    <div className="ui segment lifted">
                    <h2>Max Octave Size {octavemaxsize.height}X{octavemaxsize.width}</h2>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>No Image</h1>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.getContent()}
            </div>
        );
    }
}

export default ImageInfoPanel;