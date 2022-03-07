import React from 'react';
import './../styles/styles.css';
import List from './List';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        description: '',
        fromDate: '',
        toDate: '',
        rooms: '',
        price: '',
        size: '',
        type: '',
        address: '',
      },
      showList: false,
    };
  }

  handleChange = e => {
    const modState = {
      ...this.state,
    };
    modState.form[e.target.id] = e.target.value;
    this.setState(modState);
  };

  renderField(field, type, options) {
    return (
      <div className="form-group mb-6">
        <input
          type={type}
          id={field}
          value={this.state.form[field]}
          onChange={this.handleChange}
          placeholder={field}
        />
      </div>
    );
  }

  showList = e => {
    const modState = {
      ...this.state,
      showList: true,
    };
    this.setState(modState);
  };

  handleCallback = () => {
    const originalState = {
      form: {
        title: '',
        description: '',
        fromDate: '',
        toDate: '',
        rooms: '',
        price: '',
        size: '',
        type: '',
        address: '',
      },
      showList: false,
    };
    this.setState(originalState);
  };

  render() {
    let list;
    if (this.state.showList) {
      list = (
        <div className="split right centered block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <List
            values={this.state.form}
            parentCallback={this.handleCallback}
          ></List>
        </div>
      );
    } else {
      list = <br></br>;
    }
    return (
      <div>
        <div className="split left centered block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          {this.renderField('title')}
          {this.renderField('description')}
          {this.renderField('fromDate')}
          {this.renderField('toDate')}
          {this.renderField('rooms')}
          {this.renderField('price')}
          {this.renderField('size')}
          {this.renderField('type')}
          {this.renderField('address')}
          <div className="button-wrapper">
            <button onClick={this.showList} className="">Submit</button>
          </div>
        </div>
        {list}
      </div>
    );
  }
}
