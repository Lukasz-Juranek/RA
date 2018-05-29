import React from 'react';
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