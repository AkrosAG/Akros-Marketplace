import React from 'react';
import './../styles/styles.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  reset = event => {
    this.props.parentCallback();
    event.preventDefault();
  };

  render() {
    console.log(Object.entries(this.state.values));
    const listItems = Object.entries(this.state.values).map(element =>
      element[1] ? (
        <li>
          <span className="font-bold capitalize">{element[0]}: </span>
          {element[1]}
        </li>
      ) : (
        <li>
          <p>
            No value for <span>{element[0]}</span>
          </p>
        </li>
      )
    );
    return (
      <div className="list">
        <h2>Values received form Form component</h2>
        <ul>{listItems}</ul>
        <div className="button-wrapper">
          <button className='red' onClick={this.reset}>RESET</button>
        </div>
      </div>
    );
  }
}
