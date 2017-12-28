import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ItemSelect from './ItemSelect';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import store from './store';

export default class AddItemDialog extends React.Component {
  constructor(props)
  {
    super(props);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      open: false,
      maxDate: maxDate,
    };

    const tf_style = {
      marginLeft: 20,
      display: 'inline-block'
    };
   
  }

  componentWillMount()
  {
    this.unsubscribe = store.subscribe(() => {
      this.setState({open : store.getState().add_item_window.visible,
                     item_name : store.getState().add_item_window.item_name,
                     category_name : store.getState().add_item_window.category_name, 
                     quantity : store.getState().add_item_window.quantity,
                     price : store.getState().add_item_window.price,
                     title : store.getState().add_item_window.title
      });
    }).bind(this);
  }

  componentWillUnmount()
  {
    this.unsubscribe();
  }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    store.dispatch({type: "ITEM_ADD_WINDOW_VISIBILITY", 
                                  payload: {visible : false}})
  };

  handleSubmit = () => {
    store.dispatch({type: "ADD_ITEM", payload: {
      name : "Test Kasa",
      category: "Cash",
      quantity: 123,
      price: 46
  }})
    store.dispatch({type: "ITEM_ADD_WINDOW_VISIBILITY", 
                                  payload: {visible : false}})
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
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
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.state.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        > 

        <TextField hintText="Category name" defaultValue={this.state.category_name} style={this.tf_style} underlineShow={true} floatingLabelText="Category"
          floatingLabelFixed={true}/>

        {typeof(this.state.item_name) === undefined ? 
          <ItemSelect defaultValue={this.state.item_name}/> :
          <TextField hintText="Item name" defaultValue={this.state.item_name} style={this.tf_style} underlineShow={true} floatingLabelText="Item name"
          floatingLabelFixed={true}/>
        }

        <DatePicker
          onChange={this.handleChangeMaxDate}
          autoOk={this.state.autoOk}
          floatingLabelText="Operation date"
          defaultDate={this.state.maxDate}
        />
        <TextField hintText="Quantity" defaultValue={this.state.quantity} style={this.tf_style} underlineShow={true} floatingLabelText="Quantity"
      floatingLabelFixed={true}/>
        <TextField hintText="Price" defaultValue={this.state.price} style={this.tf_style} underlineShow={true} floatingLabelText="Price"
      floatingLabelFixed={true} />
        </Dialog>
      </div>
    );
  }
}