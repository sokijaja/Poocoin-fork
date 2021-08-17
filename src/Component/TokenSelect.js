import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Select, Button, Icon } from '@material-ui/core';
import TokenInput from './TokenInput';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    backgroundColor: 'white',
    fontSize: '10px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tokenSelectParent: {
    flexBasis: '450px'
  },
  tokenSelect: {
    width: '100%',
    '& .MuiInputBase-input': {
      padding: '.75rem 3rem .75rem .75rem',
      fontSize: '1rem',
      fontWeight: 400,
      color: 'rgb(128 128 128)',
      zIndex: 9999,
    },
    '& svg': {
      zIndex: 9999,
      borderLeft: '1px solid'
    },
    '& .MuiSelect-select': {
      fontSize: '13px',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #9fdcff!important',
      outline: 0,
      boxShadow: '0 0 0 .25rem rgba(62,184,255,.25)'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      backgroundColor: 'white'
    },
  },
  option: {
    marginTop: '2rem',
  },
  button: {
    marginLeft: 5,
    backgroundColor: 'white',
    minWidth: '25px!important'
  }
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [isToken, setIsToken] = React.useState(1);

  const handleChange = (event) => {
  };

  const onOnlyToken = () => {
    setIsToken(!isToken);
  }
  const [state, setState] = React.useState({
    tokenName: 10,
  });
  const handleSelectChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  let search;
  if (isToken)
    search = (
      <FormControl variant="outlined" className={classes.tokenSelect}>
        <Select
          native
          value={state.router}
          onChange={handleSelectChange}
          inputProps={{
            name: 'tokenName',
            id: 'outlined-age-native-simple',
          }}
        >
          <option vaule="">Enter token name / address...</option>
        </Select>
      </FormControl>
    )
  else
    search = (<TokenInput></TokenInput>)
  return (
    <div className={classes.tokenSelectParent}>
      <div style={{ display: 'flex' }}>
        {search}
        <Button className={classes.button} onClick={onOnlyToken}><Icon>edit</Icon></Button>
      </div>
    </div>
  );
}
