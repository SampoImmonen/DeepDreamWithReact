import React, { Component } from 'react';
import {trackPromise} from 'react-promise-tracker'

import ImageUpload from './ImageUpload.js'
import ShowImage from './ShowImage.js';
import Slider from './Slider.js'
import ImageInfoPanel from './ImageInfoPanel.js'
import ShowResultImage from './ShowResultImage.js';
import LoadingIndicator from './LoadingIndicator.js'

import './components.css'

import axios from 'axios';


class UploadApp extends Component {

    state = {
        img: false,
        img_file: false,
        resultimg:false,
        mode: 'upload',
        OctaveLow:-2,
        OctaveHigh:2,
        num_iters:10,
        octavestep:1.4,
        layer:12,
    }

    handleImageUpload = (file) => {

        var img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = () => {
            this.setState({img:img})
            this.setState({img_file:file})    
        }
        
    }

    handleImageDelete = () => {
        this.setState({img: false, img_file: false})
    }

    handleOctaveMinChange = (e) => {
        if (e.target.value < this.state.OctaveHigh){
            this.setState({OctaveLow:e.target.value})
        }
    }

    handleOctaveMaxChange = (e) => {
        if (e.target.value > this.state.OctaveLow){
            this.setState({OctaveHigh:e.target.value});
        }
    }

    handleItersChange = (e) => {
        this.setState({num_iters:e.target.value});
    }

    handleLayerChange = (e) => {
        this.setState({layer:e.target.value})
    }

    handleOctaveStepChange = (e) => {
        this.setState({octavestep:e.target.value})
    }

    toggleMode = () => {

    if (this.state.mode==='upload'){
        if (this.state.img){
            return(
                <ShowImage img={this.state.img} handleDelete={this.handleImageDelete}/>
            )
        } else {
            return( 
                <ImageUpload handleUpload={this.handleImageUpload}/>
            )
        }
        }else {
            return( <ShowResultImage img={this.state.resultimg} handleBackToSettings={this.handleModeToUpload}/>)
        }

    }

    validateSettings = () => {
        return true;
    }

    handleSubmit = () => {
        if (this.validateSettings()){

            const formdata = new FormData()
            formdata.append('image', this.state.img_file)
            formdata.append('octavestep', this.state.octavestep)
            formdata.append('octavesmin', this.state.OctaveLow)
            formdata.append('octavesmax', this.state.OctaveHigh)
            formdata.append('num_iters', this.state.num_iters)
            formdata.append('layer_index', this.state.layer)

            trackPromise(
            axios.post("/deepdream", formdata, {responseType: 'blob', headers: {'Content-type' : 'multipart-formdata'}})
            .then(response => {
                if (response){
                    const blob = new Blob([response.data], {type: "image/*"})
                    const res_img = new File([blob], "resultingimage.png")
                    this.setState({resultimg:blob, mode:'result'})
                }
            })
            )
        }
    }



    handleModeToResult = (e) => {
        e.preventDefault()
        if (this.state.resultimg) {
            this.setState({mode:'result'})
        }
    }

    handleModeToUpload = (e) => {
        e.preventDefault()
        this.setState({mode: 'upload'})
        
    }

    render() {
        return (
            <div className="ui grid container">
                <div className="one column centered grid">
                    <div className="ui segment centerheader">
                        <h1 className="handwriting">DeepDream image generator</h1>
                    </div>
                    
                    <div className="ui segment">
                    <div className="ui steps">
                        <a className={`${this.state.mode==='upload' ? "active" : ""} step`} href="" onClick={this.handleModeToUpload}>
                            <div className="content">
                        <div className="title">Upload settings</div>
                            </div>
                        </a>
                        <a className={`${this.state.mode!=='upload' ? "active" : ""} step`} href="" onClick={this.handleModeToResult}>
                            <div className="content">
                        <div className="title">Results</div>
                            </div>
                        </a>
                    </div>
                {this.toggleMode()}
                    </div>
                    <div className="ui segment lifted">
                        <div className="ui two column centered grid">
                            <div className="four column centered row">
                                <LoadingIndicator/>
                                <div className="column">
                                    <Slider name={"OctavesMin"} min={-8} max={8} value={this.state.OctaveLow} handleChange={this.handleOctaveMinChange}/>
                                    <Slider name={"OctavesMax"} min={-8} max={8} value={this.state.OctaveHigh} handleChange={this.handleOctaveMaxChange}/>
                                    <Slider name={"OctaveStep"} min={1} max={2}  step={0.1} value={this.state.octavestep} handleChange={this.handleOctaveStepChange}/>
                                    <Slider name={"Number of iterations"} min={5} max={100} value={this.state.num_iters} handleChange={this.handleItersChange}/>
                                    <Slider name={"layer"} min={1} max={13} value={this.state.layer} handleChange={this.handleLayerChange}/>
                                </div>
                                <div className="bordered column">
                                   <ImageInfoPanel 
                                   img={this.state.img} 
                                   octavestep={this.state.octavestep} 
                                   octavemin={this.state.OctaveLow}
                                   octavemax={this.state.OctaveHigh}
                                   />
                                </div>
                                </div>
                        </div>
                    </div>
                    <button className="ui button green" onClick={this.handleSubmit}>DeepDream</button>
                </div>
            </div>
        );
    }
}

export default UploadApp;