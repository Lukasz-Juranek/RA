import React from 'react';
import ActionHome from 'material-ui/svg-icons/content/undo';
import AddItemIcon from 'material-ui/svg-icons/content/add-box';
import SaveStateItem from 'material-ui/svg-icons/action/backup';
import IconMenu from 'material-ui/IconMenu';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import store from './store';

function render_select (_this) {
  var rows = [];
  for (var i =0; i < store.getState().wallet.category.length; i++)
  {
    rows.push(<MenuItem value={i} primaryText={store.getState().wallet.category[i].name} />)
  } 
  return (
  <SelectField                
    value = {_this.state.select_value}
    onChange={(event,index,value) => {
        _this.setState({select_value: value})
        store.dispatch({type: "SET_CATEGORY", payload: store.getState().wallet.category[value].name})                                               
    }}
    >{rows}
  </SelectField>);
}

let backup_data = "";

export default class WalletAppBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        select_value: 3,
        search_val: ""
      };
    }
  
  componentWillMount(){
    backup_data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.getState().wallet));
    this.unsubscribe = store.subscribe(() => {
      this.setState({search_val: store.getState().active_category});
      backup_data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.getState().wallet));
    }).bind(this);
  }

  componentWillUnmount()
  {
    this.unsubscribe();
  }


    render() {

     
      
      

      return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <IconButton tooltip="Switch view" onClick={() => {
              if (store.getState().active_view === "MAIN_VIEW")
                store.dispatch({type: "SET_VIEW", payload: "CATEGORY_VIEW"});
              else
                store.dispatch({type: "SET_VIEW", payload: "MAIN_VIEW"});
            }}
            ><ActionHome /></IconButton>
            <IconButton tooltip="Add item" onClick={() => store.dispatch({type: "ITEM_ADD_WINDOW_VISIBILITY", 
                                                                          payload: {visible : true,
                                                                          title: "Add item"}})}>        
            <AddItemIcon /></IconButton>
            
            <IconButton 
                download= {'backup.json'}
                href= {'data:'+backup_data} 
                tooltip="Backup state"><SaveStateItem />
            </IconButton>
            
            <div style={{position: 'relative', display: 'inline-block'}}>
              <SearchIcon style={{position: 'absolute', right: 0, top: 15, width: 20, height: 20}}/>
              {render_select(this)}              
           </div>
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