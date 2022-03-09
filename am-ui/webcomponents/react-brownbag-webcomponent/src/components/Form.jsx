import React from 'react';
import './../styles/styles.css';
import List from './List';
import Select from 'react-select';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        type: '',
        location: '',
        fromDate: '',
        toDate: '',
        fromRooms: '',
        toRooms: '',
        fromPrice: '',
        toPrice: '',
        fromSize: '',
        toSize: '',
      },
      showList: false,
    };
  }

  handleChange = e => {
    const modState = {
      ...this.state,
    };
    if (e.target) {
      modState.form[e.target.id] = e.target.value;
    } else {
      modState.form[e.id] = e.value;
    }
    this.setState(modState);
  };

  renderField(field, type, placeholder) {
    switch (type) {
      case 'text':
        return (
          <div className="form-group mb-6">
            <input
              type={type}
              id={field}
              value={this.state.form[field]}
              onChange={this.handleChange}
              placeholder={placeholder}
            />
          </div>
        );
      case 'dates':
        return (
          <div className="form-group mb-6">
            <input
              className="dates-input"
              type="date"
              id="fromDate"
              value={this.state.form['fromDate']}
              onChange={this.handleChange}
            />
            <input
              className="dates-input float-right"
              type="date"
              id="toDate"
              value={this.state.form['toDate']}
              onChange={this.handleChange}
            />
          </div>
        );
      case 'prices':
        return (
          <div className="form-group mb-6">
            <input
              className="dates-input"
              type="text"
              id="fromPrice"
              value={this.state.form['fromPrice']}
              onChange={this.handleChange}
              placeholder="Price from"
            />
            <input
              className="dates-input float-right"
              type="text"
              id="toPrice"
              value={this.state.form['toPrice']}
              onChange={this.handleChange}
              placeholder="Price to"
            />
          </div>
        );
      case 'sizes':
        return (
          <div className="form-group mb-6">
            <input
              className="dates-input"
              type="text"
              id="fromSize"
              value={this.state.form['fromSize']}
              onChange={this.handleChange}
              placeholder="Size from"
            />
            <input
              className="dates-input float-right"
              type="text"
              id="toSize"
              value={this.state.form['toSize']}
              onChange={this.handleChange}
              placeholder="Size to"
            />
          </div>
        );
      default:
    }
    return (
      <div className="form-group mb-6">
        <input
          type={type}
          id={field}
          value={this.state.form[field]}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
      </div>
    );
  }

  renderRadio(value) {
    return (
      <div className="form-check form-check-inline flex-1 pl-4">
        <input
          className="inline-block w-4 cursor-pointer"
          type="radio"
          name="requestOrOffer"
          id="offerRadio"
          checked
          onChange={this.handleChange}
        />
        <label
          className="form-check-label inline-block text-gray-800 pl-4"
          htmlFor="offerRadio"
        >
          {value}
        </label>
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
        type: '',
        location: '',
        fromDate: '',
        toDate: '',
        fromRooms: '',
        toRooms: '',
        fromPrice: '',
        toPrice: '',
        fromSize: '',
        toSize: '',
      },
      showList: false,
    };
    this.setState(originalState);
  };

  buildRoomsValues(id) {
    return [
      {value: '0', label: '0', id},
      {value: '1', label: '1', id},
      {value: '2', label: '2', id},
      {value: '3', label: '3', id},
      {value: '4', label: '4', id},
      {value: '5', label: '5', id},
      {value: '6', label: '6', id},
      {value: '7', label: '7+', id},
    ];
  }

  render() {
    let list;
    const types = [
      {value: 'appartment', label: 'Appartment', id: 'type'},
      {value: 'house', label: 'House', id: 'type'},
      {value: 'room', label: 'Room', id: 'type'},
      {value: 'parking', label: 'Parking space', id: 'type'},
    ];

    if (this.state.showList) {
      list = (
        <div className="split right centered block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <List
            values={this.state.form}
            parentCallback={this.handleCallback}
          ></List>
        </div>
      );
    }
    return (
      <div>
        <div className="split left centered block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <div className="mb-4 flex">
            {this.renderRadio('Offers')}
            {this.renderRadio('Requests')}
          </div>
          <div className="form-group mb-6">
            <Select
              options={types}
              onChange={this.handleChange}
              id="type"
              placeholder="Type of accomodation"
              // value={this.state.form.type}
            />
          </div>
          {this.renderField('location', 'text', 'Region, City or State')}
          {this.renderField('dates', 'dates')}
          <div className="form-group mb-6">
            <Select
              options={this.buildRoomsValues('fromRooms')}
              onChange={this.handleChange}
              id="fromRooms"
              className="rooms-selector"
              placeholder="Rooms from"
              // value={this.state.form.fromRooms}
            />
            <Select
              options={this.buildRoomsValues('toRooms')}
              onChange={this.handleChange}
              id="toRooms"
              className="rooms-selector float-right"
              placeholder="Rooms up to"
              // value={this.state.form.toRooms}
            />
          </div>
          {this.renderField('prices', 'prices')}
          {this.renderField('sizes', 'sizes')}
          <div className="button-wrapper">
            <button onClick={this.showList} className="">
              Submit
            </button>
          </div>
        </div>
        {list}
      </div>
    );
  }
}
