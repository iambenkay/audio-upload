import React from 'react'
import './App.css'
import Index from './Indexsrc'
import Auth from './Auth'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { authorized: false, token: null }
    }
    changeState = (state) => {
        this.setState(state)
    }
    render() {
        return this.state.authorized
            ?  <Index changeParentState={this.changeState} token={this.state.token} />
            : <Auth changeParentState={this.changeState} />
        
    }
}

export default App;
