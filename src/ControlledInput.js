import React from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';

class ControlledInput extends React.Component {
  state = { inputValue: '' };

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
  };

  componentWillMount() {
    const { inputValue } = this.props;
    if (inputValue) {
      this.setState({ inputValue });
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleInputKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { inputValue } = this.state;
    const { onSubmit } = this.props;

    onSubmit(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;
    const { placeholder, buttonText } = this.props;

    return (
      <InputGroup>
        <FormControl
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
        <InputGroup.Button>
          <Button bsStyle="primary" onClick={this.handleSubmit}>
            {buttonText}
          </Button>
        </InputGroup.Button>
      </InputGroup>
    );
  }
}

export default ControlledInput;