import React, { Component } from 'react';
import store from './store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import ItemSelect from './ItemSelect';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import ReactGridLayout from 'react-grid-layout';

let cash_category = [
  {name:"Dolar", value:1000},
  {name:"Polski Złoty", value:300},
  {name:"Rubelski", value:6300},
];

var layout = [
  {i: 'a', x: 0, y: 0, w: 1, h: 1, static: true},
  {i: 'b', x: 1, y: 0, w: 3, h: 1, static: true},
  {i: 'c', x: 4, y: 0, w: 1, h: 1, static: true}
];

function DisplayView() {
    let rows = [];
    cash_category.map ((i) => {
      rows.push(
        <Card>                 
            <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
              <div key="a">{i.name} </div>
              <div key="b">{i.value}</div>              
            </ReactGridLayout>
        </Card>
      );
    });
    return <div>{rows}</div>;
}


export default class CategoryView extends React.Component {
    render() {
      return (
        <div className="App">
        <MuiThemeProvider>
            {DisplayView()}
             <FlatButton label="<-" primary={true} onClick={() => store.dispatch({type: "SET_VIEW", payload: "MAIN_VIEW"})} />
        </MuiThemeProvider>
        </div>
      );
    }
  
  }