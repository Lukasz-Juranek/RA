import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import './App.css'

import {connect} from "react-redux";
import store from './store';

import CategoryView from './categoryView';
import MainView from './mainView';


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
          <CategoryView></CategoryView>
      );  
    default : 
      return ;
    break;
  }
}

export default class App extends React.Component {
  state = {
    View: "CATEGORY_VIEW",
  }
  
  componentWillMount()
  {
    store.subscribe(() => {
      let store_state = store.getState();
      console.log(store_state);
      this.setState({View : store_state.active_view});
    }).bind(this);
  }

  componentWillUnmount()
  {
    store.unsubscribe();
  }
 
  render() {
    console.log(this.props);
    return (
      <div className="App">
        {DisplayView(this.state.View)}
      </div>
    );
  }
}