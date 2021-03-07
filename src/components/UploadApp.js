import React, { Component } from 'react';
import ImageUpload from './ImageUpload.js'
import ShowImage from './ShowImage.js';
import Slider from './Slider.js'
import './components.css'

class UploadApp extends Component {

    state = {
        img: false,
        resultimg:false,
        OctaveLow:-2,
        OctaveHigh:2,
        num_iters:10,
        octavestep:1.4,
        layer:12,
    }

    handleImageUpload = (file) => {
        this.setState({img:file})
    }

    handleImageDelete = () => {
        this.setState({img: false})
    }

    handleOctaveMinChange = (e) => {
        if (e.target.value < this.state.OctaveHigh){
            this.setState({OctaveLow:e.target.value})
        }
    }

    handleOctaveMaxChange = (e) => {
        if (e.target.value > this.state.OctaveLow){
        this.setState({OctaveHigh:e.target.value})
        }
    }

    handleItersChange = (e) => {
        this.setState({num_iters:e.target.value})
    }

    handleLayerChange = (e) => {
        this.setState({layer:e.target.value})
    }

    handleOctaveStepChange = (e) => {
        this.setState({octavestep:e.target.value})
    }

    toggleMode = () => {
        if (this.state.img){
            return(
                <ShowImage img={this.state.img} handleDelete={this.handleImageDelete}/>
            )
        } else {
            return <ImageUpload handleUpload={this.handleImageUpload}/>
        }
    }

    render() {
        return (
            <div className="ui grid container">
                <div className="one column centered grid">
                    <div className="ui segment centerheader">
                        <h1 className="handwriting">DeepDreams are made of these</h1>
                    </div>
                    
                    <div className="ui segment">
                    <div class="ui steps">
                        <a class="active step">
                            <div class="content">
                        <div class="title">Upload settings</div>
                            </div>
                        </a>
                        <a class="step">
                            <div class="content">
                        <div class="title">Results</div>
                            </div>
                        </a>
                    </div>
                {this.toggleMode()}
                    </div>
                    <div className="ui segment centercontent">
                    <Slider name={"OctavesMin"} min={-8} max={8} value={this.state.OctaveLow} handleChange={this.handleOctaveMinChange}/>
                    <Slider name={"OctavesMax"} min={-8} max={8} value={this.state.OctaveHigh} handleChange={this.handleOctaveMaxChange}/>
                    <Slider name={"OctaveStep"} min={1} max={2}  step={0.1} value={this.state.octavestep} handleChange={this.handleOctaveStepChange}/>
                    <Slider name={"Number of iterations"} min={5} max={100} value={this.state.num_iters} handleChange={this.handleItersChange}/>
                    <Slider name={"layer"} min={1} max={13} value={this.state.layer} handleChange={this.handleLayerChange}/>
                    </div>
                    <button className="ui button green">DeepDream</button>
                </div>
            </div>
        );
    }
}

export default UploadApp;