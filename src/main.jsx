import React from 'react';

// import { USER_DATA } from './smallUsers';
import { USER_DATA } from './smallUsers';
// import { USER_DATA } from './largeUsers';

import { Table } from './fixedTable.jsx!';
import sortBy from 'lodash/collection/sortBy';

let sorted = sortBy(USER_DATA, 'name');

let App = React.createClass({
  getInitialState () {
    return {
      sortColumn: 'name',
      sortDirection: 'az',
    };
  },
  handleColToggle (newColumn) {
    let newDirection = (this.state.sortDirection === 'az' && this.state.sortColumn === newColumn) ? 'za' : 'az'
    this.setState({
      sortColumn: newColumn,
      sortDirection: newDirection,
    });
    // TODO consider special casing the `is_enabled` sort
    if (newDirection === 'az') {
      sorted = sortBy(USER_DATA, newColumn);
    } else {
      sorted = sortBy(USER_DATA, newColumn).reverse();
    }
  },
  render () {
    return (
      <div>
        <h1>Welcome to the Jungle</h1>
        <p>There are { sorted.length } users in the system.</p>
        <Table
          onColToggle={ this.handleColToggle }
          sortColumn={ this.state.sortColumn }
          sortDirection={ this.state.sortDirection }
          rowData={ sorted }></Table>
      </div>
    );
  }
});

React.render(<App/>, document.body);
