import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, InputAdornment, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames'
import InLineLink from '../Component/InLineLink';
import TokenModal from '../Component/TokenModal';
import DefaultTokens from '../config/default_tokens.json';
import { useStatePersist } from 'use-state-persist';
import { useWallet } from 'use-wallet';
import '../css/Trade.css';

import { tokenBalance, bnbBalance, getRate, tokenSwap, approveToken, getAllowance, getAmountsOut } from '../PooCoin';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#e9ecef !important'
  },
  container: {
    margin: '20px auto 40px auto',
    backgroundColor: '#303032',
    width: 400,
    height: 'auto',
    padding: '20px',
    paddingTop: '24px',
    textAlign: 'start',
    borderRadius: '8px',
    [theme.breakpoints.down("xs")]: {
      width: '100%',
    },
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
  tolabel: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
  },
  updown: {
    visibility: 'hidden',

    borderWidth: 0,
    margin: 15,
    marginBottom: 0,
    backgroundColor: '#262626',
    borderRadius: '999px',
    padding: 0,
    width: '30px',
    height: '30px'
  },
  swapBtn: {
    backgroundColor: '#53CA42',
    width: '100%',
    color: '#fff'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  swapInfo: {
    marginTop: '10px',
    backgroundColor: '#262626',
    padding: '10px'
  },
  swapInfoText: {
    fontSize: 13
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

const TxType = {
  None: 0,
  Approve: 1,
  Deposit: 2,
  Withdraw: 3,
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Trade() {

  const classes = useStyles();

  // select swap version
  const [tabIndex, setTabIndex] = React.useState(0);

  // slippage
  const [slippage, setSlippage] = React.useState(0);
  const [isAutoSlippage, setIsAutoSlippage] = React.useState(false);

  // from(to) tokenaddress, symbol, swap amount, balance
  const [fromAmount, setFromAmount] = React.useState();
  const [fromToken, setFromToken] = React.useState("");
  const [fromTokenSymbol, setFromTokenSymbol] = React.useState("");
  const [fromBalance, setFromBalance] = React.useState(0);
  const [toAmount, setToAmount] = React.useState();
  const [toToken, setToToken] = React.useState("");
  const [toTokenSymbol, setToTokenSymbol] = React.useState("");
  const [toBalance, setToBalance] = React.useState(0);

  // for metamask
  const { account, ethereum } = useWallet();

  // check approve or swap
  const [allowance, setAllowance] = useState(0);

  // swap infos
  const [minimumReceived, setMinimumReceived] = useState(0);
  const [priceImpact, setPriceImpact] = useState(0);
  const [price0, setPrice0] = useState(0);
  const [price1, setPrice1] = useState(0);

  const settedTokens = [
    ["BNB", "0x0000000000000000000000000000000000000000"],
    ["BUSD", "0xe9e7cea3dedca5984780bafc599bd69add087d56"],
    ["USDT", "0x55d398326f99059ff775485246999027b3197955"],
    ["BTCB", "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c"],
    ["ETH", "0x2170ed0880ac9a755fd29b2688956bd959f933f8"],
  ]

  const handleChange = (newValue) => {
    setTabIndex(newValue);
  };

  const toPancakeSwap = (tabIndex == 1 ? <InLineLink url="https://v1exchange.pancakeswap.finance/#/swap" text="Pancake v1" fontSize="14" /> : <InLineLink url="https://pancakeswap.finance/swap#/swap" text="Pancake v2" fontSize="14" />)

  const onAutoSlippage = () => {
    setSlippage(0.5);
    setIsAutoSlippage(!isAutoSlippage);
  }

  const onSlippageChange = (event) => {
    setSlippage(event.target.value);
  }

  const setFromTokenBalanceData = (data) => {
    setFromBalance(parseFloat(data).toFixed(8));
  }

  const setToTokenBalanceData = (data) => {
    setToBalance(parseFloat(data).toFixed(8));
  }

  const onclickMaxBtn = () => {
    let token_address;
    // for (var i = 0; i < settedTokens.length; i++) {
    //   if (settedTokens[i][0] === fromToken && fromToken === "BNB") {
    //     bnbBalance(account, setFromAmount);
    //     break;
    //   } else if (settedTokens[i][0] === fromToken && fromToken !== 'BNB') {
    //     token_address = settedTokens[i][1];
    //     // set token balance
    //     tokenBalance(account, token_address, setFromAmount);
    //     break;
    //   }
    // }
  }

  // update allowance callback
  const updateAllowance = (allowance_) => {
    setAllowance(allowance_);
    console.log(allowance_);
  }

  // update amounts out callback
  const updateAmountsOut = (amount_out) => {
    setToAmount(amount_out);
    setMinimumReceived(amount_out * (100 - slippage) / 100);
    const from_price = amount_out / fromAmount;
    setPrice0(from_price);
    setPrice1(1 / from_price);
  }

  const updateTokenPrice = (price) => {

  }

  // update Infos
  const updateInfos = () => {

    const from_token_address = (fromToken == DefaultTokens.BNB.address ? DefaultTokens.WBNB.address : fromToken);
    if (ethereum && account && from_token_address)
      getAllowance(ethereum, account, from_token_address, updateAllowance);

    updateAmountsOut(0);
    updateTokenPrice(0);
    if (fromAmount && fromAmount > 0 && from_token_address && toToken) {
      getAmountsOut(fromAmount, from_token_address, toToken, updateAmountsOut);
      getRate(from_token_address, toToken, updateTokenPrice);
    }
  }

  const onFromTokenChange = async (token, token_symbol) => {

    setFromToken(token);
    setFromTokenSymbol(token_symbol);

    if (token == DefaultTokens.BNB.address)
      bnbBalance(account, setFromTokenBalanceData);
    else
      tokenBalance(account, token, setFromTokenBalanceData);
  }

  const onToTokenChange = async (token, token_symbol) => {
    setToToken(token);
    setToTokenSymbol(token_symbol);

    if (token == DefaultTokens.BNB.address)
      bnbBalance(account, setToTokenBalanceData);
    else
      tokenBalance(account, token, setToTokenBalanceData);
  }

  const onclickFromToChange = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setFromBalance(toBalance);
    setToBalance(fromBalance);
  }

  const onChangeFromAmount = async (event) => {

    const val = event.target.value;
    setFromAmount(val);
  }

  const onChangeToAmount = async (event) => {
    const val = event.target.value;
    setToAmount(val);
  }

  // swap callback
  const swapcallback = () => {

  }

  // approve token
  const onApprove = () => {
    approveToken(ethereum, fromToken, fromAmount, account);
  }

  // swap tokens
  const onSwap = () => {
    tokenSwap(ethereum, fromAmount, fromToken, toToken, account, minimumReceived, swapcallback);
  }

  const requireApprove = () => {
    if (account) {
      return fromAmount > allowance || allowance === 0;
    }
    return false;
  }

  useEffect(() => {

    setFromBalance(0);
    setFromAmount(0);
    setToBalance(0);
    setToAmount(0);
    setSlippage(0.5);

  }, [account]);

  useEffect(() => {
    updateInfos();
  }, [fromToken, fromAmount, toToken, slippage]);

  const autoSlippage = (isAutoSlippage ? classNames(classes.button, classes.slippageSelected) : classNames(classes.button, classes.slippage));
  const [modalOpen, setModalOpen] = React.useState(false);

  const [modalStyle] = React.useState(getModalStyle);

  const swapInfoEnable = minimumReceived > 0 && fromAmount && fromAmount > 0 && fromToken && toToken ? true : false;
  const swapButtonDisable = (fromAmount < fromBalance) && swapInfoEnable ? false : true;

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="d-flex flex-column">
        <div className="text-end unpad-2">
          <i className="fas fa-times btn btn-link"></i>
        </div>
        <p>Select your token in the "To" field to embed the trade interface with your token pre-selected.</p>
        <p>Then copy the code below:</p>
        <textarea readOnly="" className="flex-grow-1" style={{ fontsize: '14px' }}>
          &lt;iframe
          src="https://poocoin.app/embed-swap"
          width="420"
          height="630"
          &gt;&lt;/iframe&gt;
        </textarea>
      </div>
    </div>
  );
  return (
    <div className={classes.root}>
      <Container fixed className={classes.container}>
        <div className={classes.options}>
          <div>
            <Button onClick={() => handleChange(0)} variant="contained" className={tabIndex == 0 ? classNames(classes.tabSelected, classes.button) : classNames(classes.tab, classes.button)}>Auto</Button>
            <Button onClick={() => handleChange(1)} variant="contained" className={tabIndex == 1 ? classNames(classes.tabSelected, classes.button) : classNames(classes.tab, classes.button)}>Pancake V1</Button>
            <Button onClick={() => handleChange(2)} variant="contained" className={tabIndex == 2 ? classNames(classes.tabSelected, classes.button) : classNames(classes.tab, classes.button)}>Pancake V2</Button>
          </div>
          <div>
            <Button variant="contained" className={classNames(classes.tab, classes.button)} onClick={handleOpen}><Icon>code</Icon></Button>
            <Modal
              open={modalOpen}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
            <Button variant="contained" className={classNames(classes.tab, classes.button)} ><Icon>link</Icon></Button>
          </div>
        </div>
        <div style={{ marginTop: '15px' }}>
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
              placeholder: '0.5',
              onChange: onSlippageChange,
              disabled: isAutoSlippage,
              endAdornment:
                <InputAdornment position="end">
                  <span style={{ color: 'white' }}>%</span>
                  <Button variant="contained" onClick={onAutoSlippage} className={autoSlippage}>Auto Slippage</Button>
                </InputAdornment>,
            }}
          />
          <div className={classes.label}>
            <span>From ({fromTokenSymbol})</span>
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
                  <Button className={classes.button} onClick={() => onclickMaxBtn()}>MAX</Button>
                  {/* <Button className={classes.button}><img src={BTCB} width="23px"/>&nbsp;{fromToken}</Button> */}
                  <TokenModal css={classes.button} tokenChange={onFromTokenChange} />
                </InputAdornment>
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <Button variant="contained" className={classNames(classes.updown, classes.button)} onClick={() => onclickFromToChange()}><ArrowDownwardTwoToneIcon /></Button>
          </div>
          <div className={classes.tolabel}>
            <span>To ({toTokenSymbol})</span>
            <span>Balance: {toBalance}</span>
          </div>
          <CssTextField
            id="standard-start-adornment"
            InputProps={{
              disableUnderline: true,
              value: toAmount > 0 ? parseFloat(toAmount).toFixed(8) : toAmount,
              placeholder: '0.0',
              onChange: onChangeToAmount,
              endAdornment:
                <InputAdornment position="end">
                  <TokenModal css={classes.button} tokenChange={onToTokenChange} />
                </InputAdornment>,
            }}
          />
          {
            swapInfoEnable ?
              <Container className={classes.swapInfo}>
                <Typography className={classes.swapInfoText}>Minimum Received: {minimumReceived.toFixed(8)}</Typography>
                <Typography className={classes.swapInfoText}>Price Impact: {priceImpact}</Typography>
                <Typography className={classes.swapInfoText}>Price: {parseFloat(price0).toFixed(8)} {toTokenSymbol}/{fromTokenSymbol}</Typography>
                <Typography className={classes.swapInfoText}>Price: {parseFloat(price1).toFixed(8)} {fromTokenSymbol}/{toTokenSymbol}</Typography>
              </Container>
              : ""
          }
          <div className={classes.label}>
            {!account && <span>Connect your wallet</span>}
            {
              account && fromToken && requireApprove() && <Button
                variant={"contained"}
                className={classes.swapBtn}
                onClick={() => onApprove()}
              >Approve</Button>
            }
            {
              account && !requireApprove() && <Button
                variant={"contained"}
                disabled={swapButtonDisable}
                className={classes.swapBtn}
                onClick={() => onSwap()}
              >Swap</Button>
            }
          </div>
        </div>
      </Container>
    </div>
  )
}