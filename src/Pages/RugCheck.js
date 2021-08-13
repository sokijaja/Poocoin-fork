import React from 'react';

import { Card, CardContent } from '@material-ui/core';
import CustomizedInputs from '../Component/basic/input';
import { Autocomplete } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import TokenSelect from '../Component/TokenSelect';
import TokenInput from '../Component/TokenInput';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from "@material-ui/styles";


const useStyles = makeStyles (theme => ({
  root: {
    textAlign: '-webkit-center',
    color: 'white',
  },
  card: {
    maxWidth: '1116px',
    backgroundColor: '#303032',
    padding: '10px',
    paddingBottom: '15px',    
    color: 'white',
    [theme.breakpoints.down("lg")] : {
      maxWidth: '1116px'
      },
    [theme.breakpoints.down("md")] : {
      maxWidth: '936px'
      },
    [theme.breakpoints.down("sm")] : {
      maxWidth: '696px'
      },
    [theme.breakpoints.down("xs")] : {
      maxWidth: '516px'
      },          
  },
  cardContent: {
      padding: '10px 15px ',
  },
  comboBox: {
    //   height: '56px',
  }
}));

export default function RugCheck () {
  const classes = useStyles();
  const theme = useTheme();
  const tokens = [
    { name: 'token1', address: 'address1' },
    { name: 'token2', address: 'address2' },
    { name: 'token3', address: 'address3' },
  ];
  const defaultProps = {
    options: tokens,
    getOptionLabel: (option) => option.name,
  };

  const flatProps = {
    options: tokens.map((option) => option.name),
  };

  const [inputBox, setInputBox] = React.useState(0);

  function handleChange () {
    inputBox == 0 ? setInputBox(1): setInputBox(0)
  };
  let input;
  if (inputBox == 1) {
    input = <Autocomplete className={classes.comboBox} 
                {...defaultProps}
                id="select-on-focus"
                selectOnFocus
                renderInput={(params) => <TextField {...params} style={{backgroundColor: 'white', paddingBottom: '9px', outlineColor: 'white'}} InputProps={{ disableUnderline: true }} label="Enter token name/address" />}
    /> ;                        
    } else {
    input = <TokenInput></TokenInput>;
  }
  return (
      <div className={classes.root} >
          <h1>RugCheck</h1>
          <Card className={classes.card}>
              <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TokenSelect></TokenSelect>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                  </Grid>
              </CardContent>
          </Card>
      </div>
  )
}