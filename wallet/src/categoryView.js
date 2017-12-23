import React, { Component } from 'react';
import store from './store';

import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import ReactGridLayout from 'react-grid-layout';
import AddItemDialog from './addItemDialog';
import Divider from 'material-ui/Divider';

import {walletDB} from './walletDB';

var layout = [
  {i: 'a', x: 0, y: 0, w: 4, h: 1, static: true},
  {i: 'b', x: 1, y: 1, w: 2, h: 1, static: true},
  {i: 'c', x: 1, y: 2, w: 2, h: 1, static: true},
  {i: 'd', x: 3, y: 1, w: 2, h: 1, static: true}
];

const tail_width = 240;

const card_style = {
  margin: 20,
  width: tail_width+'px'
};

const buy_sell_style = {
  display: 'inline'
}

function DisplayView(disp_cat) {
    let rows = [];
    walletDB.item
    .filter((i) => {return i.category === disp_cat})
    .map ((i) => {
      rows.push(
        <Card style={card_style}>                 
          <ReactGridLayout className="layout" layout={layout} cols={6} rowHeight={30} rows={3} width={window.innerWidth > tail_width ? tail_width : window.innerWidth}>
            <div key="a">{i.name} </div>
            <div key="b">{i.quantity} szt</div>
            <div key="c">{i.price} zł</div>
            <div key="d"><FlatButton
              style={buy_sell_style}
              label="Buy/"
              primary={true}
              onClick={() => {;}}
            />         
            <FlatButton
              style={buy_sell_style}
              label="Sell"
              primary={true}
              onClick={() => {;}}
            />         
            </div>     
          </ReactGridLayout>
          <Divider />
        </Card>
      );
    });
    return <div>{rows}</div>;
}

export default class CategoryView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      openItemView: false,
      activeCategory: props.category
    }
  }
  
  componentWillMount()
  {
    this.unsubscribe = store.subscribe(() => {
      this.setState({activeCategory : store.getState().active_category});
    }).bind(this);
  }

  componentWillUnmount()
  {
    this.unsubscribe();
  }


  handleOpen = () => {
    this.setState({openItemView: true});
  };

  handleClose = () => {
    this.setState({openItemView: false});
  };

  render() {
    
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="App">  
        <AddItemDialog/>
        {DisplayView(this.state.activeCategory)}            
      </div>
    );
  }
  
  }