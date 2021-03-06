import React from 'react';
import {Sunburst} from 'react-vis';
import {EXTENDED_DISCRETE_COLOR_RANGE} from 'react-vis/dist/theme'
import {LabelSeries} from 'react-vis';
import {mapToD3FlareDate} from './map_store'
import store from './store'

const LABEL_STYLE = {
  fontSize: '15px',
  textAnchor: 'middle'
};


/**
 * Recursively work backwards from highlighted node to find path of valud nodes
 * @param {Object} node - the current node being considered
 * @returns {Array} an array of strings describing the key route to the current node
 */
function getKeyPath(node) {
  if (!node.parent) {
    return ['wallet'];
  }

  return [(node.data && node.data.name) || node.name].concat(getKeyPath(node.parent));
}

function getValue(node)
{
  if (node.children)
  {
    let sum = 0;
    node.children.forEach((child) => 
    {
      sum += getValue(child);
      
    });
    // console.log("sum " + node.value);
    return sum;
  }

//   console.log("vale " + node.value);
  return node.value;
}


/**
 * Recursively modify data depending on whether or not each cell has been selected by the hover/highlight
 * @param {Object} data - the current node being considered
 * @param {Object|Boolean} keyPath - a map of keys that are in the highlight path
 * if this is false then all nodes are marked as selected
 * @returns {Object} Updated tree structure
 */
function updateData(data, keyPath) {
  if (data.children) {
    data.children.map(child => updateData(child, keyPath));
  }
  // add a fill to all the uncolored cells
  if (!data.hex) {
    data.style = {
      fill: EXTENDED_DISCRETE_COLOR_RANGE[5]
    };
  }
  data.style = {
    ...data.style,
    fillOpacity: keyPath && !keyPath[data.name] ? 0.2 : 1
  };

  return data;
}

let decoratedData = updateData(mapToD3FlareDate(), false);

export default class WalletSunburst extends React.Component {
  state = {
    pathValue: false,
    data: decoratedData,
    finalValue: 'click to show category',
    clicked: false,
    clicked_item: false
  }

  updateDimensions (){
    let w = window.innerWidth;
    let h = window.innerHeight;
    this.setState({width: w, height: h});
  }

  componentWillMount()
  {
    decoratedData = updateData(mapToD3FlareDate(), false);
    this.setState({finalValue: "total: " + getValue(decoratedData)});    
    this.unsubscribe = store.subscribe(() => {
      decoratedData = updateData(mapToD3FlareDate(), false);
      this.forceUpdate();
    }).bind(this);
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount()
  {
    this.unsubscribe();
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
 
  
  
  
  
  render() {
    const {clicked, data, finalValue, pathValue} = this.state;
    
    return (
      <div className="sunburst" >
        {/* <div>{clicked ? 'click to unlock selection' : 'click to lock selection'}</div> */}
        <Sunburst
          animation
          hideRootNode
          onValueMouseOver={node => {
            // if (clicked) {
            //   return;
            // }
            const path = getKeyPath(node).reverse();
            const item_value = getValue(node);
            const pathAsMap = path.reduce((res, row) => {
              res[row] = true;
              return res;
            }, {});
            this.setState({
              finalValue: path[path.length - 1] + ": " + item_value,
              pathValue: path.join(' > '),
              data: updateData(decoratedData, pathAsMap)
            });
          }}
          onValueMouseOut={() => clicked ? () => {} : this.setState({
            pathValue: false,
            finalValue: "total: " + getValue(decoratedData),
            data: updateData(decoratedData, false)
          })}
          onValueClick={() => 
            {
              let data = this.state.pathValue.split(' > ');
              // console.log(data[1]);
              if (this.state.clicked_item === this.state.pathValue)
              {
                store.dispatch({type: "SET_VIEW", payload: "CATEGORY_VIEW"});
                store.dispatch({type: "SET_CATEGORY", payload: data[1]});                
              } 
              this.setState({
                clicked: !clicked,
                clicked_item: this.state.pathValue
              })
            }
          }
            
          style={{
            stroke: 'white',
            strokeOpacity: 0.8,
            strokeWidth: '4.5'
          }}
          colorType="literal"
          getSize={d => d.value}
          getColor={d => d.hex}
          data={data}
          height={window.innerHeight * 0.40}
          width={window.innerWidth * 0.70}
          >
          {finalValue && <LabelSeries data={[
            {x: 0, y: 0, label: finalValue, style: LABEL_STYLE}
          ]} />}
        </Sunburst>
        <div className="basic-sunburst-example-path-name">{pathValue}</div>
      </div>
    );
  }

}