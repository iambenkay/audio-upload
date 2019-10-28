import React from 'react';
import { FormLabel, FormGroup, FormControl, Col, FormCheck, Container, Alert } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

const INITIAL_SIGNIN_STATE = {
    email: '',
    password: '',
    error: null,
    loading: false,
}


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_SIGNIN_STATE };
    }
    onSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, password } = this.state;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.error) throw new Error(data.error)
                this.setState({ ...INITIAL_SIGNIN_STATE })
                this.props.changeParentState({ authorized: true, token: data.token })
            })
            .catch(error => {
                this.setState({ error })
            })
            .finally(() => {
                this.setState({ loading: false })
            })
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        const { email, password, error, loading } = this.state;
        const isInvalid = password === '' || email === '' || loading;
        return (
            <Container className="py-5 row mx-auto">
                <Col xs={12} md={5} className="mx-md-auto">
                    <form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <FormControl id="email" name="email" value={email} onChange={this.onChange} type="email" placeholder="Enter Email" />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl id="password" name="password" value={password} onChange={this.onChange} type="password" placeholder="Enter password" />
                        </FormGroup>
                        <FormCheck>
                            <FormCheckInput id="checkbox" />
                            <FormCheckLabel htmlFor="checkbox">Remember Me</FormCheckLabel>
                        </FormCheck>
                        <button disabled={isInvalid} className="mt-4 btn btn-success">Submit <div className={`spinner-border spinner-border-sm ${loading ? "" : "d-none"}`} role="status">
                            <span className="sr-only">Loading...</span>
                        </div></button>
                        {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
                    </form>
                    <br />
                </Col>
            </Container>
        );
    }
}

export default SignIn;
