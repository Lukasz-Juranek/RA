import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';

const dataSource1 = [
    {
      text: 'Cryptocurrency',
      value: (
        <MenuItem
          primaryText="Cryptocurrency"
          leftIcon={<RemoveRedEye />}
        />
      ),
    },
    {
      text: 'Bank Deposits',
      value: (
        <MenuItem
          primaryText="Bank Deposits"
          leftIcon={<PersonAdd  />}
        />
      ),
    },
  ];

export default class ItemSelect extends React.Component {
    render() {
      return (
        <div className="App">
          <MuiThemeProvider>
          <AutoComplete
            hintText="add new category"
            filter={AutoComplete.noFilter}
            dataSource={dataSource1}
            openOnFocus={true}
          />
        </MuiThemeProvider>
        </div>
      );
    }
  
  }