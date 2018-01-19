import React, { Component } from 'react';
import store from './store';

import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import ReactGridLayout from 'react-grid-layout';
import AddItemDialog from './addItemDialog';
import Divider from 'material-ui/Divider';

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

function buyClickHandle() {
  store.dispatch({type: "ITEM_ADD_WINDOW_VISIBILITY", 
                payload: {visible : true,
                          item_name : this.name,
                          category_name : this.category,                          
                          price : this.price,
                          title : "BUY"
  }});
}

function sellClickHandle() {
  store.dispatch({type: "ITEM_ADD_WINDOW_VISIBILITY", 
                payload: {visible : true,
                          item_name : this.name,
                          category_name : this.category,
                          quantity : this.quantity,
                          price : this.price,
                          title : "SELL"
  }});
}


function DisplayView(disp_cat) {
    let rows = [];
    let filtered_cats = store.getState().wallet.item
    .filter((i) => {return i.category.includes(disp_cat)});
    if (filtered_cats.length == 0) filtered_cats =  store.getState().wallet.item;
    filtered_cats.map ((i) => {
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
              onClick = {buyClickHandle.bind(i)} 
            />         
            <FlatButton
              style={buy_sell_style}
              label="Sell"
              primary={true}
              onClick={sellClickHandle.bind(i)}
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
    return (
      <div className="App">  
        <AddItemDialog/>
        {DisplayView(this.state.activeCategory)}            
      </div>
    );
  }
  
  }