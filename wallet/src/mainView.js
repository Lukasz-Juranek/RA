import React, { Component } from 'react';
import store from './store';

import WalletSunburst from './WalletSunburst';
import WalletSunburstLegend from './WalletSunbursLegend';
import ItemSelect from './ItemSelect';

export default class MainView extends React.Component {
    render() {
      return (
        <div className="App">
            <ItemSelect> </ItemSelect>
            <WalletSunburst> </WalletSunburst>
            <WalletSunburstLegend> </WalletSunburstLegend>
        </div>
      );
    }
  
  }