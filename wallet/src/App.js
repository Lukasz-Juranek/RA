import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import './App.css'

import WalletSunburst from './WalletSunburst';
import WalletSunburstLegend from './WalletSunbursLegend';
import ItemSelect from './ItemSelect'


export default class App extends React.Component {
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