import React from 'react';
import Select from 'react-select';
// import {default as Select} from 'react-select'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

export default function CustomSelect ({onChange,options, value, className }) {

    const defaultValue = (options,value) => {
        console.log("value==>",value)
        console.log("options==>",options)
        return options ? options.find(option=>option.value === value):""
    }

    return(
        <div className={className}>
               <Select
                    value={defaultValue(options,value)}
                    onChange={value=>{onChange(value)}} 
                    options = {options}>            
                </Select>
        </div>
    )
}