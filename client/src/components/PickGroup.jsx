import React from 'react';
import axios from 'axios';
import AddTransaction from './AddTransaction.jsx';
import Home from './Home.jsx';

class PickGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      group: '',
      showTransaction: false
    };
  }

  componentDidMount() {
    // get groups for logged in user
    axios.get('/groups')
    .then(result => {
      console.log(result)
      this.setState({
        groups: result.data,
        group: result.data[0]
      });
    });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit() {
    console.log('in on submit', this.state.group)
    this.setState({
      showTransaction: true
    })
  }

  render() {
    let optionItems = this.state.groups.map((group, i) => {
      return (
        <option key={i}>
          {group}
        </option>
      );
    });
    return (
      <div>
      <Home />
      <div className="jumbotron">
          <div className="form-group">
            <label>Pick the Group</label>&nbsp;&nbsp;
            <select className="form-control" name="group" value={this.state.group} onChange={this.onChange.bind(this)} >
              {optionItems}
            </select>
          </div>
          <button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Submit</button>
          {this.state.showTransaction && <AddTransaction group={this.state.group} />}
      </div>
      </div>
    );
  }
}

export default PickGroup;