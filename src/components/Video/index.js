import React from 'react'
import picture from '../../upload-picture.png'
import Imagezone from '../Dropzone/Imagezone'
import { Alert } from 'react-bootstrap'

const INITIAL_STATE = {
    videoName: "",
    videoArtist: "",
    videoText: "",
    videoCategory: "",
    videoUrl: null,
    image: null,
    imageData: null,
    success: null,
    error: null,
}

export default class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE }
        this.player = null
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    imageAdded = file => {
        if (!file.type.startsWith("image/")) return
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            this.setState({ imageData: reader.result, image: file })
        })
        reader.readAsDataURL(file)
    }
    onSubmit = () => {
        const {
            videoName,
            videoArtist,
            videoText,
            videoCategory,
            videoUrl,
            image,
        } = this.state
        if (!image ||
            !videoName ||
            !videoArtist ||
            !videoText ||
            !videoCategory ||
            !videoUrl) {
            return
        }
        const formData = new FormData()
        formData.append('videoName', videoName)
        formData.append('videoArtist', videoArtist)
        formData.append('videoText', videoText)
        formData.append('videoCategory', videoCategory)
        formData.append('videoUrl', videoUrl)
        formData.append('file', image)

        fetch("/videos/add/", {
            method: "POST",
            headers: {
				"Authorization": `Token ${this.props.token}`
			},
            body: formData,
        }).then(response => response.json())
            .then(data => {
                if (!data.success) throw new Error("Failed to upload video")
                this.setState({
                    success: "Resource was created successfully",
                    error: null,
                    videoName: "",
                    videoArtist: "",
                    videoText: "",
                    videoCategory: "",
                    videoUrl: null,
                    image: null,
                    imageData: null,
                })
            })
            .catch(error => {
                this.setState({ success: null, error: error.message })
            })
    }
    render() {
        const {
            videoName,
            videoArtist,
            videoText,
            videoCategory,
            imageData,
            videoUrl,
            image,
            error,
            success
        } = this.state
        const disabled = !image || !videoName || !videoText || !videoArtist || !videoCategory || !videoUrl
        return (
            <>
                <div className="row h-100">
                    <div className="h-100 col d-flex align-items-center justify-content-center">
                        <div className="card pb-5 col-8 h-75">
                            <h3 className="card-title text-center mt-4">New Video</h3>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <div className="card-body overflow-auto">
                                <form className="container">
                                    <div className="form-group">
                                        <label htmlFor="track-name">Video Name</label>
                                        <input type="text" className="form-control" value={videoName} name="videoName" id="track-name" onChange={this.onChange} placeholder="Enter video name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="track-artist">Video Artist</label>
                                        <input type="text" className="form-control" value={videoArtist} name="videoArtist" id="track-artist" onChange={this.onChange} placeholder="Enter video artist" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="track-text">Video Text</label>
                                        <input type="text" className="form-control" value={videoText} name="videoText" id="track-text" onChange={this.onChange} placeholder="Enter video text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="track-category">Video Category</label>
                                        <input type="text" className="form-control" value={videoCategory} name="videoCategory" id="track-category" onChange={this.onChange} placeholder="Enter video category" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="track-url">Video Url (Youtube)</label>
                                        <input type="text" className="form-control" value={videoUrl} name="videoUrl" id="track-url" onChange={this.onChange} placeholder="Enter video url" />
                                    </div>
                                    <div className="row">
                                        <Imagezone icon={picture} file={imageData} onFile={this.imageAdded} helpText="Drag cover here or click to browse" />
                                    </div>
                                </form>
                            </div>
                            <div className="row container mt-4">
                                <div className="col-12">
                                    <button className="btn btn-success w-100 mx-auto" disabled={disabled} onClick={this.onSubmit}>Upload video</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
