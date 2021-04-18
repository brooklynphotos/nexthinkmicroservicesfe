import React from 'react';
import axios from 'axios';

class DeploymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { payload: '', answer: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ payload: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = JSON.parse(this.state.payload)
    axios.post('http://localhost:8080/deploy', payload)
      .then(res => {
        this.setState({ answer: res.data.data.value})
      })
  }

  renderPostResult() {
    return this.state.answer.order.map((n)=>(<p><b>{n}</b>: {this.state.answer.microservices[n].map(o=>o.id)}</p>))
  }

  render() {
    const answer = this.state.answer ? this.renderPostResult() : null
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h3>Deployment Configuration</h3>
            <textarea rows="30" cols="80" value={this.state.value} onChange={this.handleChange} />
          </label>
          <p />
          <input type="submit" value="Deploy" />
        </form>
        <h2>Instances</h2>
        {answer}

      </div>
    );
  }
}

export default DeploymentForm;