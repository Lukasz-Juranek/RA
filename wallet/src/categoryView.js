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
  {i: 'a', x: 0, y: 0, w: 1, h: 1, static: true},
  {i: 'b', x: 1, y: 0, w: 3, h: 1, static: true},
  {i: 'c', x: 3, y: 1, w: 3, h: 1, static: true}
];

function DisplayView(disp_cat) {
    let rows = [];
    walletDB.item
    .filter((i) => {return i.category === disp_cat})
    .map ((i) => {
      rows.push(
        <Card>                 
          <ReactGridLayout className="layout" layout={layout} cols={4} rowHeight={30} width={800}>
            <div key="a">{i.name} </div>
            <div key="b">{i.price} zł</div>
            <div key="c">{i.quantity} pcs</div>              
          </ReactGridLayout>
          <Divider />
        </Card>
      );
    });
    return <div>{rows}</div>;
}

export default class CategoryView extends React.Component {
  state = {
    openItemView: false,
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
        {DisplayView("Cash")}            
      </div>
    );
  }
  
  }