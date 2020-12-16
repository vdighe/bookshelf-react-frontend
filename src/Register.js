import React, { Component } from 'react';
import { Button, Input, Form, Segment, Grid } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";



export default class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        fullname: '',
    };

    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    }
    render() {
        return (
            <div className='form'>
                <div class="ui medium header">Register for BookShelf</div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Segment>
                                <Form onSubmit={(e) => { this.props.onSubmit(e, this.state);
                                 this.setState({ username: '', email: '', password: '', fullname:'' }); }}>
                                    <Form.Input
                                        type='text'
                                        name='username'
                                        label='User'
                                        value={this.state.username}
                                        required={true}
                                        onChange={this.handleChange}
                                    />

                                    <Form.Input
                                        type='text'
                                        name='fullname'
                                        label='Full Name'
                                        value={this.state.fullname}
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
            </div>

        )
    }
}


