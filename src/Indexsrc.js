import React from 'react';
import Audio from './components/Audio';
import Video from './components/Video';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { current: 1 }
  }
  render() {
    let component;
    switch (this.state.current) {
      case 1:
        component = <Audio token={this.props.token} />
        break
      default:
        component = <Video token={this.props.token} />
        break
    }
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class={`nav-item ${this.state.current === 1 ? 'active' : ''}`}>
                <button class="nav-link btn btn-link" onClick={() => { this.setState({current: 1}) }}>Upload Music <span class="sr-only">(current)</span></button>
              </li>
              <li class={`nav-item ${this.state.current === 2 ? 'active' : ''}`}>
                <button class="nav-link btn btn-link" onClick={() => { this.setState({current: 2}) }}>Upload Video <span class="sr-only">(current)</span></button>
              </li>
            </ul>
          </div>
        </nav>
        {component}
      </>
    )
  }
}

export default Index;
