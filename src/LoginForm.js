import React, { Component } from 'react'
import { Button, Input, Form, Segment, Grid } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    }
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Segment>
                            <Form onSubmit={(e) => { this.props.onSubmit(e, this.state) }}>
                                <Form.Input
                                    type='text'
                                    name='username'
                                    label='User'
                                    value={this.state.username}
                                    required={true}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    type='email'
                                    name='email'
                                    label='Email'
                                    value={this.state.email}
                                    onChange={this.handleChange}

                                />

                                <Form.Input
                                    label='Password'
                                    name='password'
                                    type='password' 
                                    value={this.state.password}
                                    required={true}
                                    placeholder='Password' 
                                    onChange={this.handleChange}    
                                />
                                <Button type='submit'>Submit</Button>
                            </Form>                            
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        )
    }
}
