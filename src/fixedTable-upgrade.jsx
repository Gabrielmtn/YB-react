import React from 'react';

import compact from 'lodash/array/compact';
import map from 'lodash/collection/map';
import sortBy from 'lodash/collection/sortBy';

// Loosely based on but much simpler than
// https://facebook.github.io/fixed-data-table/

let ColumnHeader = React.createClass({
  handleClick () {
    this.props.onColToggle(this.props.property);
  },
  render () {
    let { property, active, direction } = this.props;
    let cssClass = compact(['cell', property, active ? 'active' : null]).join(' ');
    // TODO see about not hardcoding `is_enabled` special case
    return (
      <span
        onClick={ this.handleClick }
        className={ cssClass }>
        { property === 'is_enabled' ? 'E' : property }
        { active ? <span className="direction">{ direction.split('').join(' ') }</span> : null }
      </span>
    );
  }
})



let Cell = React.createClass({
  render () {
    let { row, property } = this.props;
    let cssClass = compact(['cell', property]).join(' ');
    // TODO see about not hardcoding `is_enabled` special case
    return (
      <span
        className={ cssClass }>
        { property === 'is_enabled' ? ( row[property] ? '\u2714' : '\u2718') : row[property] }
      </span>
    );
  }
})


let FilterInput = React.createClass({
  handleChange: function() {
        this.props.onUserInput(
            this.refs.filterInput.getDOMNode().value
        );
    },

  render: function() {
    return (
      <input 
      ref="filterInput"
      onChange={this.handleChange}
      className={this.props.className} 
      placeholder={this.props.placeholder} />
  );
  }
})


// Just hardcode the columns for simplicity
let COLUMN_PROPERTIES = ['name', 'email', 'is_enabled', 'company', 'office', 'uid'];




export let TableUpgrade = React.createClass({
  onColToggle (newColumn) {
    this.props.onColToggle(newColumn);
  },
  render () {
    let { rowData, sortColumn, sortDirection } = this.props;
    return (
      <div className="flip-the-table">
        <div className="row header">
          {map(COLUMN_PROPERTIES, (key) => (
            <ColumnHeader
              onColToggle={ this.onColToggle }
              active={ sortColumn === key }
              direction={ sortDirection }
              property={ key } />
            )
          )}  
        </div>

        <div className="row header">
          {map(COLUMN_PROPERTIES, (key) => (
            <FilterInput
              className={key + "-filter"}
              placeholder={ key === 'is_enabled' ? 'E' : key } />
            )
          )}
        </div>
        { map(rowData, (d) => {
          return (
            <div className="row">
              {map(COLUMN_PROPERTIES, (key) => (
                <Cell
                  row={ d }
                  property={ key } />
                )
              )}
            </div>
          )
        })}
      </div>
    );
  }
});
