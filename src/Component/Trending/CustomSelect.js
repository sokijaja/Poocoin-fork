import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles({
  inLineLink: {
    color: '#3BAAEB'
  }
});

export default function CustomSelect (props) {
  const classes = useStyles();
  console.log(props.options);
  const [timeFrame, setTimeFrame] = React.useState(props.options);
  console.log()
  const handleChange = (newValue) => {
    setTimeFrame(newValue);
    console.log(newValue);
  };

  return (
      <select onChange={handleChange}>          
        timeFrame.forEach(element => {
            
        });
      </select>
  )
}