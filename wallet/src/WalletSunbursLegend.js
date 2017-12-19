import React, {Component} from 'react';
import DiscreteColorLegend from 'react-vis/es/legends/discrete-color-legend';

const ITEMS = [
  'stock',
  'cash',
  'assets'
];

const COLORS = [
  '#C73E0C',
  '#016165',
  'yellow',
];

export default class WalletSunbursLegend extends Component {
  state = {
    hoveredItem: false
  };
  render() {
    const {hoveredItem} = this.state;
    return (
      <DiscreteColorLegend
        colors={COLORS}
        onItemMouseEnter={i => this.setState({hoveredItem: i})}
        onItemMouseLeave={() => this.setState({hoveredItem: false})}
        orientation="horizontal"
        width={300}
        items={ITEMS.map((item, key) =>
          hoveredItem === item ?
            <div key={key}>{item}<br />{'SELECTED'}</div> :
            item
        )}
        />
    );
  }
}