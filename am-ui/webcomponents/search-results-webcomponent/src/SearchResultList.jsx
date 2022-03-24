import React from 'react';

export default class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.results.length === 0) {
      return <h1>No results found!</h1>;
    } else {
      return <div>{this.props.results}</div>;
    }
  }
}
