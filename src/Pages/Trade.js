import React from 'react';
import {Button, Container, TextField, InputAdornment} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames'
import InLineLink from '../Component/InLineLink';
import TokenModal from '../Component/TokenModal';
import BNB from '../Images/BNB.png';
import ETH from '../Images/ETH.png';
import BUSD from '../Images/BUSD.png';
import USDT from '../Images/USDT.png';
import BTCB from '../Images/BTCB.png';

const useStyles = makeStyles((theme) => ({
  container: {
      marginTop: '20px',
      backgroundColor: '#303032',
      width: 400,
      height: 400,
      padding: '16px',
      paddingTop: '24px',
      textAlign: 'start',
  },
  button: {
    color: 'white !important',
    minWidth: 'auto',
    textTransform: "initial",
    height: '30px !important',
    borderRadius: 'unset',
    paddingLeft: '8px',
    paddingRight: '8px',
    borderLeftWidth: '1px',
    borderColor: '#303032',
    borderStyle: 'solid'
  },
  tab: {
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
  },
  tabSelected: {
    backgroundColor: '#565e64',
    borderColor: '#51585e',
  },
  slippage: {
    backgroundColor: '#6c757d'
  },
  slippageSelected: {
    backgroundColor: '#53CA42'
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
    marginTop: 15
  },
  updown: {
    borderWidth: 0,
    margin: 15,
    marginBottom: 0,
    backgroundColor: '#262626',
    borderRadius: '999px',
    padding: 0,
    width: '30px',
    height: '30px'
  }
}));

const CssTextField = withStyles({
  root: {
    width: '100%',
    '& .MuiInputBase-input': {
      color: 'white',
      backgroundColor: '#262626',
      paddingLeft: '10px'
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
      zIndex: '11'
    },
    '& .MuiInputBase-root': {
      backgroundColor: '#262626'
    },
    '& .MuiTypography-colorTextSecondary': {
      color: 'white',
    },
  },
})(TextField);


export default function Trade() {

  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [slippage, setSlippage] = React.useState(0);
  const [isAutoSlippage, setIsAutoSlippage] = React.useState(false);
  const [fromAmount, setFromAmount] = React.useState();
  const [fromToken, setFromToken] = React.useState("");
  const [fromBalance, setFromBalance] = React.useState(0);
  const [toAmount, setToAmount] = React.useState();
  const [toToken, setToToken] = React.useState("");
  const [toBalance, setToBalance] = React.useState(0);

  const handleChange = (newValue) => {
    setTabIndex(newValue);
    console.log(newValue);
  };

  const toPancakeSwap = (tabIndex == 1 ? <InLineLink url="https://v1exchange.pancakeswap.finance/#/swap" text="Pancake v1" fontSize="14"/> : <InLineLink url="https://pancakeswap.finance/swap#/swap" text="Pancake v2" fontSize="14"/> )

  const onAutoSlippage = () => {
    setSlippage(0.5);
    setIsAutoSlippage(!isAutoSlippage);
  }

  const onSlippageChange = (event) => {
    setSlippage(event.target.value);
  }

  const onFromTokenChange = (tk) => {
    setFromToken(tk);
  }

  const onToTokenChange = (tk) => {
    setToToken(tk);
  }

  const onChangeFromAmount = (event) => {

    const val = event.target.value;
    setFromAmount(val);
  }

  const onChangeToAmount = (event) => {
    const val = event.target.value;
    setToAmount(val);
  }

  const autoSlippage = (isAutoSlippage ? classNames(classes.button, classes.slippageSelected): classNames(classes.button, classes.slippage));

  return (
      <Container fixed className={classes.container}>
        <div className={classes.options}>
          <div>
            <Button onClick={() => handleChange(0)} variant="contained" className={tabIndex == 0 ? classNames(classes.tabSelected, classes.button) : classNames(classes.tab, classes.button)}>Auto</Button>
            <Button onClick={() => handleChange(1)} variant="contained" className={tabIndex == 1 ? classNames(classes.tabSelected, classes.button) : classNames(classes.tab, classes.button)}>Pancake V1</Button>
            <Button onClick={() => handleChange(2)} variant="contained" className={tabIndex == 2 ? classNames(classes.tabSelected, classes.button) : classNames(classes.tab, classes.button)}>Pancake V2</Button>
          </div>
          <div>
            <Button variant="contained" className={classNames(classes.tab, classes.button)} ><Icon>code</Icon></Button>
            <Button variant="contained" className={classNames(classes.tab, classes.button)} ><Icon>link</Icon></Button>
          </div>
        </div>
        <div style={{marginTop: '15px'}}>
          {toPancakeSwap}
        </div>
        <div>
          <div className={classes.label}>
            <span>Slippage</span>
          </div>
          <CssTextField
            id="standard-start-adornment"
            InputProps={{
              disableUnderline: true,
              value: slippage,
              onChange: onSlippageChange,
              disabled: isAutoSlippage,
              endAdornment: 
                <InputAdornment position="end">
                  <span style={{color:'white'}}>%</span>
                  <Button variant="contained" onClick={onAutoSlippage} className={autoSlippage}>Auto Slippage</Button>
                </InputAdornment>,
            }}
          />
          <div className={classes.label}>
            <span>From ({fromToken})</span>
            <span>Balance: {fromBalance}</span>
          </div>
          <CssTextField
            InputProps={{
              disableUnderline: true,
              value: fromAmount,
              placeholder: '0.0',
              onChange: onChangeFromAmount,
              endAdornment: 
                <InputAdornment position="end">
                  <Button className={classes.button}>MAX</Button>
                  {/* <Button className={classes.button}><img src={BTCB} width="23px"/>&nbsp;{fromToken}</Button> */}
                  <TokenModal css={classes.button} tokenChange={onFromTokenChange} />
                </InputAdornment>
            }}
          />
          <div style={{textAlign: 'center'}}>
            <Button variant="contained" className={classNames(classes.updown, classes.button)}><ArrowDownwardTwoToneIcon/></Button>
          </div>
          <div className={classes.label}>
            <span>To ({toToken})</span>
            <span>Balance: {toBalance}</span>
          </div>
          <CssTextField
            id="standard-start-adornment"
            InputProps={{
              disableUnderline: true,
              value: toAmount,
              placeholder: '0.0',
              onChange: onChangeToAmount,
              endAdornment: 
                <InputAdornment position="end">
                  <TokenModal css={classes.button} tokenChange={onToTokenChange} />
                </InputAdornment>,
            }}
          />

          <div className={classes.label}>
            <span>Connect your wallet</span>
          </div>
        </div>
      </Container>
  )
}