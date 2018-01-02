import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from "react-redux";
import store from './store';

import CategoryView from './categoryView';
import MainView from './mainView';

import WalletAppBar from './WalletAppBar'

function DisplayView(displayView) {
  switch (displayView)  
  {
    case ("MAIN_VIEW"):
      return (
        <MainView></MainView>
    );
    break;
    case ("CATEGORY_VIEW"):
      return (
          <CategoryView category={store.getState().active_category}></CategoryView>
      );  
    default : 
      return ;
    break;
  }
}

var divStyle = {
  // width: 400,
  // height: 400
};

export default class App extends React.Component {
  state = {
    View: "CATEGORY_VIEW",
  }
  
  componentWillMount()
  {
    this.unsubscribe = store.subscribe(() => {
      let store_state = store.getState();
      this.setState({View : store_state.active_view});
    }).bind(this);
  }

  componentWillUnmount()
  {
    this.unsubscribe();
  }
 
  render() {
    console.log(this.props);
    return (
      <div style={divStyle} className="App">
        <MuiThemeProvider>
          <WalletAppBar> </WalletAppBar>
          {DisplayView(this.state.View)}
        </MuiThemeProvider>
      </div>
    );
  }
}