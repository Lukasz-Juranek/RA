import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

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


  const style = {
    background: 'white',
    color: 'white'
  };
  

export default class ItemSelect extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      dv : props.defaultValue
    } 
  }  
  
  render() {
      return (
        <div> 
          <AutoComplete
            hintText="Name"
            filter={AutoComplete.noFilter}
            dataSource={dataSource1}
            openOnFocus={true}
            style={style}
          />
        </div>
      );
    }
  
  }