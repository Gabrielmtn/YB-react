import React from 'react';

import Griddle from 'griddle-react';

// import { USER_DATA } from './smallUsers';
import { USER_DATA } from './mediumUsers';
// import { USER_DATA } from './largeUsers';

import { Table } from './fixedTable.jsx!';
import { TableUpgrade } from './fixedTable-upgrade.jsx!';
import sortBy from 'lodash/collection/sortBy';

//inital sort of of the array by the name key
let sorted = sortBy(USER_DATA, 'name');



//It's actually incredible how legible this component is as compared to when I first approached it
let App = React.createClass({
  //Dash's docs tool has been super handy for learning React
  getInitialState () {
    return {
      sortColumn: 'name',
      sortDirection: 'az',
    };
  },

// #  ████████╗ ██████╗ ██████╗  ██████╗
// #  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
// #     ██║   ██║   ██║██║  ██║██║   ██║
// #     ██║   ██║   ██║██║  ██║██║   ██║
// #     ██║   ╚██████╔╝██████╔╝╚██████╔╝
// #     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝
// #

  //this method lead me to onColToggle, which I traced back to fixedTable. Will step through for clarity later
  handleColToggle (newColumn) {
    // I was originally perplexed by this line statement, but I've come to find ternary statements are awesome
    // I'm still tracing around the logic here, which while not vital for adding components, will be vital for building my own
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

           <h1>Updated Table</h1>
           <h4>This is going to remain as a proof of concept. I will demonstrate props and state understanding with other components.</h4>
        <p>There are { sorted.length } users in the system.</p>
        <TableUpgrade
          onColToggle={ this.handleColToggle }
          sortColumn={ this.state.sortColumn }
          sortDirection={ this.state.sortDirection }
          rowData={ sorted }></TableUpgrade>

<h1>Here goes nothing (drop in solution)</h1>
        <Griddle results={sorted} tableClassName="table" showFilter={true} showSettings={true} columns={["name", "company", "email", "phone", "office", "uid"]}
        sortAscendingComponent={<span className="fa fa-sort-alpha-asc"></span>}
        sortDescendingComponent={<span className="fa fa-sort-alpha-desc"></span>}/>

        <h1>Original Table</h1>
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
