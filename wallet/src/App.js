import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import './App.css'

import WalletSunburst from './WalletSunburst';
import WalletSunburstLegend from './WalletSunbursLegend';
import ItemSelect from './ItemSelect';
import {connect} from "react-redux";
import store from './store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

function DisplayView(displayView) {
  switch (displayView)  
  {
    case ("MAIN_VIEW"):
      return (
      <div>
        <WalletSunburst> </WalletSunburst>
        <WalletSunburstLegend> </WalletSunburstLegend>
      </div>
    );
    break;
    case ("CATEGORY_VIEW"):
      return (
        <div>
          <MuiThemeProvider>
             <FlatButton label="BACK" primary={true} onClick={() => store.dispatch({type: "SET_VIEW", payload: "MAIN_VIEW"})} />
          </MuiThemeProvider>
        </div>
      );  
    default : 
      return ;
    break;
  }
}

export default class App extends React.Component {
  state = {
    View: "MAIN_VIEW",
  }
  
 
  render() {
    console.log(this.props);
    store.subscribe(() => {
      let store_state = store.getState();
      console.log(store_state);
      console.log("seet");
      this.setState({View : store_state.active_view});
    }).bind(this);
    
    return (
      <div className="App">
        <ItemSelect> </ItemSelect>
        {DisplayView(this.state.View)}
      </div>
    );
  }
}