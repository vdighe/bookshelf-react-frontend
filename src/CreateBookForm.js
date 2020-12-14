import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';
class CreateBookForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            subtitle: '',
            author: '',
            olid:'',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    }
    render() {
        return (
            <Segment>
                <h4>Add Book</h4>
                <Form
                    onSubmit={(e) => {
                        this.props.addBook(e, this.state);
                        this.setState({ title: '', subtitle: '', author: '', olid :'' });
                    }}
                >
                    <Label>Title:</Label>
                    <Form.Input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
                    <Label>SubTitle:</Label>
                    <Form.Input type='text' name='subtitle' value={this.state.subtitle} onChange={this.handleChange} />
                    <Label>Author:</Label>
                    <Form.Input type='text' name='author' value={this.state.author} onChange={this.handleChange} />

                    <Label>OLID:</Label>
                    <Form.Input type='text' name='olid' value={this.state.olid} onChange={this.handleChange} />

                    <Button type='Submit'>Add Book</Button>
                </Form>
            </Segment>
        )
    }
}
export default CreateBookForm;