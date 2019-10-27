import React from 'react'
import Mimezone from './Mimezone'

export default class Audiozone extends Mimezone {
    render() {
        return (
            <div className={`upload d-flex flex-column ${this.state.highlight ? "highlight" : ""} text-center align-items-center justify-content-center mx-auto`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.selectFile}>
                <input type="file" ref={this.MimeRef} onChange={this.onFileAdded} accept="image/*" className="d-none" />
                {
                    this.props.file
                        ? <img src={this.props.file} className="image" height={148} width={148} alt="dropzone icon" />
                        : <>
                            <img src={this.props.icon} height={70} width={70} alt="dropzone icon" />
                            {this.props.helpText}
                        </>
                }
            </div>
        )
    }
}
