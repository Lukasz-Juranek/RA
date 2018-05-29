import React from 'react';
import 'react-vis/dist/style.css';
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
    case ("CATEGORY_VIEW"):
      return (
          <CategoryView category={store.getState().active_category}></CategoryView>
    );  
    default : 
      return ;
  }
}

var divStyle = {
  // width: 400,
  // height: 400
};

export default class App extends React.Component {
  state = {
    View: "MAIN_VIEW",
  }
  
  componentWillMount()
  {
    this.unsubscribe = store.subscribe(() => {
      let store_state = store.getState();
      localStorage.setItem('reduxState', JSON.stringify(store.getState()))
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
          <div>
            <WalletAppBar> </WalletAppBar>
            {DisplayView(this.state.View)}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}