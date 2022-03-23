import React from 'react';

export default class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.results}</div>;
  }
}
