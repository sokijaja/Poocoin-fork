import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
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
import { useStatePersist } from 'use-state-persist';
import { useWallet } from 'use-wallet';
import '../css/Trade.css';
// import Geyser, {getTotalStats} from './trade/geyser';
// import UniswapPool from './trade/uniswap-pool';
import routerAbi from '../PooCoin/router.json';
import { tokenBalance, bnbBalance, getRate, tokenSwap } from '../PooCoin';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '50px auto 40px auto',
    backgroundColor: '#303032',
    width: 400,
    height: 400,
    padding: '20px',
    paddingTop: '24px',
    textAlign: 'start',
    borderRadius: '8px',
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

  const statsLabels = [{
    id: "all_time_total_rewards_token",
    name: "Total Rewards",
    unit: "GUH"
  }, {
    id: "current_locked_rewards_token",
    name: "Locked Rewards",
    unit: "GUH"
  }, {
    id: "program_duration_days",
    name: "Maximum bonus at",
    unit: "days"
  }, {
    id: "current_total_staked",
    name: "Total Deposits",
    unit: "USD"
  }, {
    id: "current_unlocked_rewards_token",
    name: "Unlocked Rewards",
    unit: "GUH"
  }, {
    id: "current_reward_rate_30d_token",
    name: "Reward unlock rate",
    unit: `GUH / month`
  },
  {
    id: "apy_estimate",
    name: "APY",
    unit: "%"
  }];

  const [items, setItems] = React.useState([
    {
      name: "Total Rewards",
      value: "-- GUH",
    }, {
      name: "Locked Rewards",
      value: "-- GUH",
    }, {
      name: "Program duration",
      value: "-- days left",
    }, {
      name: "Total Deposits",
      value: "-- USD",
    }, {
      name: "Unlocked Rewards",
      value: "-- GUH",
    }, {
      name: "Reward unlock rate",
      value: "-- GUH / month",
    }
  ]);

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

  // for swap
  const [userDisconnected, setUserDisconnected] = useStatePersist(true);
  const { account, connect, reset, ethereum } = useWallet();
  const [pending, setPending] = useState(false);
  const [geyser, setGeyser] = useState(null);
  const [withdraw, setWithdraw] = useState(0);
  const [depositedBalance, setDepositedBalance] = useState(0);
  const [, setPendingTxType] = useState(TxType.None);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [depositedLiquidityEquivalent, setDepositedLiquidityEquivalent] = useState(null);
  const [accumulatedRewards, setAccumulatedRewards] = useState(null);
  const [totalStaked, setTotalStaked] = useState(0);
  const [rewardRate30, setRewardRate30] = useState(0);
  const [uniswapPool, setUniswapPool] = useState(null);
  const [pairRate, setPairRate] = useState();
  const [tokenIn, setTokenIn] = useState();
  const [tokenOut, setTokenOut] = useState();
  const [open, setOpen] = useState();

  const settedTokens = [
    ["BNB", ""],
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
    setFromBalance(data);
  }

  const setToTokenBalanceData = (data) => {
    setToBalance(data);
  }

  const onclickMaxBtn = () => {
    let token_address;
    for (var i = 0; i < settedTokens.length; i++) {
      if (settedTokens[i][0] === fromToken && fromToken === "BNB") {
        bnbBalance(account, setFromAmount);
        break;
      } else if (settedTokens[i][0] === fromToken && fromToken !== 'BNB') {
        token_address = settedTokens[i][1];
        // set token balance
        tokenBalance(account, token_address, setFromAmount);
        break;
      }
    }
  }

  const onFromTokenChange = async (tk) => {
    setFromToken(tk);

    if (toToken !== "") {
      for (var j = 0; j < settedTokens.length; j++) {
        if (settedTokens[j][0] === fromToken) {
          setTokenIn(settedTokens[j][1]);
        }
        if (settedTokens[j][0] === toToken) {
          setTokenOut(settedTokens[j][1]);
        }
      }

      try {
        await getRate(tokenIn, tokenOut, setTokenRate);
      } catch (e) {

      }

      if (toAmount !== 0)
        setToAmount(parseFloat(pairRate) * parseFloat(toAmount));
    }

    let token_address;
    for (var i = 0; i < settedTokens.length; i++) {
      if (settedTokens[i][0] === tk && tk === "BNB") {
        bnbBalance(account, setFromTokenBalanceData);
        break;
      } else if (settedTokens[i][0] === tk && tk !== 'BNB') {
        token_address = settedTokens[i][1];
        // set token balance
        tokenBalance(account, token_address, setFromTokenBalanceData);
        break;
      }
    }
  }

  const setTokenRate = async (data) => {
    await setPairRate(data);
  }

  const onToTokenChange = async (tk) => {
    setToToken(tk);

    if (fromToken !== "") {
      for (var j = 0; j < settedTokens.length; j++) {
        if (settedTokens[j][0] === fromToken) {
          setTokenIn(settedTokens[j][1]);
        }
        if (settedTokens[j][0] === toToken) {
          setTokenOut(settedTokens[j][1]);
        }
      }

      try {
        await getRate(tokenIn, tokenOut, setTokenRate);
      } catch (e) {

      }
      if (fromAmount !== 0 && fromToken !== '')
        setToAmount(parseFloat(pairRate) * parseFloat(fromAmount));

    }

    let token_address;
    for (var i = 0; i < settedTokens.length; i++) {
      if (settedTokens[i][0] === tk && tk === "BNB") {
        bnbBalance(account, setToTokenBalanceData);
        break;
      } else if (settedTokens[i][0] === tk && tk !== 'BNB') {
        token_address = settedTokens[i][1];
        // set token balance
        tokenBalance(account, token_address, setToTokenBalanceData);
        break;
      }
    }
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
    await setFromAmount(val);
    console.log(val);
    console.log(pairRate);
    // if(toToken !== '' && pairRate !== 'undefined')
    //     setToAmount(parseFloat(pairRate) * parseFloat(val));
  }

  const onChangeToAmount = async (event) => {
    const val = event.target.value;
    await setToAmount(val);

    console.log(val);
    console.log(pairRate);
    // if(fromToken !== '' && pairRate !== 'undefined')
    //     setFromAmount(parseFloat(pairRate) * parseFloat(val));
  }

  // swap

  const swapcallback = () => {

  }
  
  const tokenFromToSwap = () => {
    tokenSwap(ethereum, routerAbi, "0.001", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0xb27adaffb9fea1801459a1a81b17218288c097cc", account, swapcallback);
  }

  useEffect(() => {

    setFromBalance(0);
    setFromAmount(0);
    setToBalance(0);
    setToAmount(0);
    setSlippage(0.5);

  }, [account]);

  const autoSlippage = (isAutoSlippage ? classNames(classes.button, classes.slippageSelected) : classNames(classes.button, classes.slippage));
  const [modalOpen, setModalOpen] = React.useState(false);

  const [modalStyle] = React.useState(getModalStyle);

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
                <Button className={classes.button} onClick={() => onclickMaxBtn()}>MAX</Button>
                {/* <Button className={classes.button}><img src={BTCB} width="23px"/>&nbsp;{fromToken}</Button> */}
                <TokenModal css={classes.button} tokenChange={onFromTokenChange} />
              </InputAdornment>
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" className={classNames(classes.updown, classes.button)} onClick={() => onclickFromToChange()}><ArrowDownwardTwoToneIcon /></Button>
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
          {!account && <span>Connect your wallet</span>}
          {
            account && fromAmount && toAmount && <Button
              variant={"contained"}
              className={classes.swapBtn}
              onClick={() => tokenFromToSwap()}
            >Swap</Button>
          }
        </div>
      </div>
    </Container>
  )
}