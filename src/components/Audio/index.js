import React from 'react'
import audio from '../../upload-audio.png'
import picture from '../../upload-picture.png'
import Audiozone from '../Dropzone/Audiozone'
import Imagezone from '../Dropzone/Imagezone'
import { Modal, Alert } from 'react-bootstrap'

const INITIAL_STATE = {
	trackName: "",
	trackArtist: "",
	trackText: "",
	trackCategory: "",
	track: null,
	image: null,
	imageData: null,
	show: false,
	playing: false,
	error: null,
	success: null,
}

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...INITIAL_STATE}
		this.player = null
		this.SeekRef = React.createRef()
    }
    onChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    audioAdded = file => {
		if(!file.type.startsWith("audio/")) return
        this.setState({track: file})
    }
    imageAdded = file => {
		if(!file.type.startsWith("image/")) return
		const reader = new FileReader()
        reader.addEventListener('load', () => {
            this.setState({imageData: reader.result, image: file})
        })
        reader.readAsDataURL(file)
    }
    closePreview = () => {
        this.setState({show: false, playing: false})
		this.player.pause()
		this.player = null
    }
    openPreview = () => {
		if(!this.state.image || !this.state.track) return
		const reader = new FileReader()
		reader.addEventListener('load', () => {
			this.player = new Audio(reader.result)
			this.player.addEventListener('timeupdate', () => {
				if(this.player) this.SeekRef.current.value = (this.player.currentTime / this.player.duration) * 1000
			})
			this.player.play()
			this.setState({show: true, playing: true})
		})
		reader.readAsDataURL(this.state.track)
    }
	onSubmit = () => {
		const {
			trackName,
			trackArtist,
			trackText,
			trackCategory,
			track,
			image,
		} = this.state
		if(!image ||
			!trackName ||
			!trackText ||
			!trackArtist ||
			!trackCategory ||
			!track){
				return
			}
		const formData = new FormData()
		formData.append('musicName', trackName)
		formData.append('musicArtist', trackArtist)
		formData.append('musicText', trackText)
		formData.append('musicCategory', trackCategory)
		formData.append('file', track)
		formData.append('file', image)

		fetch("/music/add/", {
			method: "POST",
			headers: {
				"Authorization": `Token ${this.props.token}`
			},
			body: formData,
		}).then(response => response.json())
		.then(data => {
			if(!data.success) throw new Error("Failed to upload music")
			this.setState({success: "Resource was created successfully", error: null})
		})
		.catch(error => {
			this.setState({success: null, error: error.message})
		})
	}
    render() {
        const {
			trackName,
			trackArtist,
			trackText,
			trackCategory,
			imageData,
			track,
			image,
			show,
			playing,
			error,
			success
		} = this.state
		const disabled = !image || !trackName || !trackText || !trackArtist || !trackCategory || !track
        return (
            <>
                <Modal show={show} onHide={this.closePreview}>
                    <Modal.Body className="bg-dark row preview">
						<div className="col-2"><img src={imageData} className={`preview-icon ${playing ? "spin": ""}`} height={70} width={70} alt="preview icon" /></div>
						<div className="col container align-items-center d-flex">
							<div className="w-100">
								<span className="text-white font-weight-bold">{trackName}</span>
								<progress value={0} max={1000} ref={this.SeekRef}></progress>
							</div>
						</div>
					</Modal.Body>
                </Modal>
                <div className="row h-100">
                    <div className="h-100 col d-flex align-items-center justify-content-center">
                        <div className="card pb-5 col-8 h-75">
						<h3 className="card-title text-center mt-4">New Track</h3>
						{error && <Alert variant="danger">{error}</Alert>}
						{success && <Alert variant="success">{success}</Alert>}
                            <div className="card-body overflow-auto">
                                <form className="container">
                                    <div className="form-group">
                                        <label htmlFor="track-name">Track Name</label>
                                        <input type="text" className="form-control" value={trackName} name="trackName" id="track-name" onChange={this.onChange} placeholder="Enter track name" />
                                    </div>
									<div className="form-group">
                                        <label htmlFor="track-artist">Track Artist</label>
                                        <input type="text" className="form-control" value={trackArtist} name="trackArtist" id="track-artist" onChange={this.onChange} placeholder="Enter track artist" />
                                    </div>
									<div className="form-group">
                                        <label htmlFor="track-text">Track Text</label>
                                        <input type="text" className="form-control" value={trackText} name="trackText" id="track-text" onChange={this.onChange} placeholder="Enter track text" />
                                    </div>
									<div className="form-group">
                                        <label htmlFor="track-category">Track Category</label>
                                        <input type="text" className="form-control" value={trackCategory} name="trackCategory" id="track-category" onChange={this.onChange} placeholder="Enter track category" />
                                    </div>
                                    <div className="row">
                                        <Imagezone icon={picture} file={imageData} onFile={this.imageAdded} helpText="Drag cover here or click to browse" />
                                        <Audiozone icon={audio} file={track} onFile={this.audioAdded} helpText="Drag audio here or click to browse" />
                                    </div>
                                </form>
                            </div>
                            <div className="row container mt-4">
                                <div className="col-8">
                                    <button className="btn btn-success w-100 mx-auto" disabled={disabled} onClick={this.onSubmit}>Upload song</button>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-info w-100 mx-auto" disabled={disabled} onClick={this.openPreview}>Preview</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
