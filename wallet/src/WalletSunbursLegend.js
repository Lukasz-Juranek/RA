import React, {Component} from 'react';
import DiscreteColorLegend from 'react-vis/es/legends/discrete-color-legend';
import {mapToGetCategoryName, mapToGetCategoryColor, walletDB} from './walletDB';


export default class WalletSunbursLegend extends Component {
  state = {
    hoveredItem: false
  };
  render() {
    const {hoveredItem} = this.state;
    return (
      <DiscreteColorLegend
        colors={mapToGetCategoryColor()}
        onItemMouseEnter={i => this.setState({hoveredItem: i})}
        onItemMouseLeave={() => this.setState({hoveredItem: false})}
        orientation="horizontal"
        width={window.innerWidth * 0.70}
        items={mapToGetCategoryName().map((item, key) =>
          // hoveredItem === item ?
            // <div key={key}>{item}<br />{'SELECTED'}</div> :
            item
            
        )}
        />
    );
  }
}