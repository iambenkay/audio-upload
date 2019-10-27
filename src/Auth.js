import React from 'react'
import {SignIn} from './components/Auth'

class Auth extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <button className="nav-link btn btn-link" onClick={() => { this.setState({auth: 1}) }}>Sign In <span className="sr-only">(current)</span></button>
              </li>
            </ul>
          </div>
        </nav>
        <SignIn changeParentState={this.props.changeParentState} />
      </>
    )
  }
}

export default Auth;
