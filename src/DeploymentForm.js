import React from 'react';
import axios from 'axios';
import MicroservicesStatus from './MicroservicesStatus'

class DeploymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { payload: '', answer: '', message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ payload: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handlePayload('http://localhost:8080/deploy', res => {
      this.setState({ answer: res.data.data, message: 'OK' })
    });
  }

  dryRun(event) {
    this.handlePayload('http://localhost:8080/deploy?dryRun', res => {
      this.setState({ message: `Is Cyclic: ${res.data.data.cyclic}` })
    });
  }

  handlePayload(url, resolution){
    if (!this.state.payload) {
      this.setState({ message: "Need some input" });
      return;
    }
    try {
      const payload = JSON.parse(this.state.payload)
      axios.post(url, payload)
        .then(resolution)
        .catch((error)=>{
          console.log(`Problem with the server response: ${error}`)
          this.setState({ message: `No good`, answer: ''})
          return Promise.reject(error);
        })
    } catch (e) {
      console.log(e);
      this.setState({ message: "Problem with input or program" });
      return;
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h3>Deployment Configuration</h3>
            <textarea rows="30" cols="80" value={this.state.value} onChange={this.handleChange} />
          </label>
          <p />
          <input type="submit" value="Deploy" />
          <input type="button" value="Dry Run" onClick={() => this.dryRun()} />
        </form>
        <div>{this.state.message}</div>
        <h2>Instances</h2>
        <MicroservicesStatus answer={this.state.answer}/>

      </div>
    );
  }
}

export default DeploymentForm;