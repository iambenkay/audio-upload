import React from 'react'
import Mimezone from './Mimezone'
import audio from '../../audio.png'

export default class Audiozone extends Mimezone {
    render() {
        return (
            <div className={`upload d-flex flex-column ${this.state.highlight ? "highlight" : ""} text-center align-items-center justify-content-center mx-auto`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.selectFile}>
                <input type="file" ref={this.MimeRef} onChange={this.onFileAdded} accept="audio/*" className="d-none" />
                {
                    this.props.file
                        ? <>
                            <img src={audio} style={{ borderRadius: "50%" }} height={50} alt="dropzone icon" />
                            {(this.props.file.size / (1024 * 1024)).toFixed(2)} MB
                        </>
                        : <>
                            <img src={this.props.icon} height={70} alt="dropzone icon" />
                            {this.props.helpText}
                        </>
                }
            </div>
        )
    }
}
