import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    console.log(this.refs.inValue.value)
    this.props.btnSubmit(this.refs.inValue.value);
  }

  render() {
    return (
      <div>
        <fieldset>
          <legend>{this.props.title}</legend>
          <input type="text" ref="inValue" onChange={this.props.handleInput} /><button type="button" onClick={this.handleSubmit}>Submit</button>
        </fieldset>
      </div>
    )
  }
}

export default Form;