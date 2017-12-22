import React, { Component } from 'react';
import store from './store';
import AddItemDialog from './addItemDialog';

import WalletSunburst from './WalletSunburst';
import WalletSunburstLegend from './WalletSunbursLegend';

export default class MainView extends React.Component {
    render() {
      return (
        <div className="App">
            <AddItemDialog/>
            <WalletSunburst> </WalletSunburst>
            <WalletSunburstLegend> </WalletSunburstLegend>
        </div>
      );
    }
  
  }