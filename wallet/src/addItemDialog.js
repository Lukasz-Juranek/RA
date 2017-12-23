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
      this.setState({open : store.getState().windows.item_add});
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
    store.dispatch({type: "ITEM_ADD_WINDOW_VISIBILITY", payload: false})
  };

  handleSubmit = () => {
    store.dispatch({type: "ITEM_ADD_WINDOW_VISIBILITY", payload: false})
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
          title="Add new Item"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >           
        <ItemSelect/>

        <DatePicker
          onChange={this.handleChangeMaxDate}
          autoOk={this.state.autoOk}
          floatingLabelText="Acquire Date"
          defaultDate={this.state.maxDate}
        />
        <TextField hintText="Quantity" style={this.tf_style} underlineShow={true} />
        <TextField hintText="Price" style={this.tf_style} underlineShow={true} />
        </Dialog>
      </div>
    );
  }
}