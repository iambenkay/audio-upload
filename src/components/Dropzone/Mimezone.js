import React from 'react'

export default class Mimezone extends React.Component {
    constructor(props) {
        super(props)
        this.MimeRef = React.createRef()
        this.state = {highlight: false}
    }
    selectFile = () => {
        this.MimeRef.current.click()
    }
    onFileAdded = event => {
        const files = event.target.files
        if (files) this.props.onFile(files[0])
    }
    onDragOver = event => {
        event.preventDefault()
        this.setState({ highlight: true })
    }
    onDragLeave = () => {
        this.setState({ highlight: false })
    }
    onDrop = event => {
        event.preventDefault()
        const files = event.dataTransfer.files
        this.props.onFile(files[0])
        this.setState({ highlight: false })
    }
}
