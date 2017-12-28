import React from 'react';
import ActionHome from 'material-ui/svg-icons/content/undo';
import AddItemIcon from 'material-ui/svg-icons/content/add-box';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import store from './store';


export default class WalletAppBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 3,
      };
    }
  
    handleChange = (event, index, value) => this.setState({value});
  
    render() {
      return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <IconButton onClick={() => store.dispatch({type: "SET_VIEW", payload: "MAIN_VIEW"})}><ActionHome /></IconButton>
            <IconButton onClick={() => store.dispatch({type: "ITEM_ADD_WINDOW_VISIBILITY", 
                                              payload: {visible : true,
                                                        title: "Add item"}})}>
            <AddItemIcon /></IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            {/* <RaisedButton label="BTN" primary={true} /> */}
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
            >
              <MenuItem primaryText="Download" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      );
    }
  }