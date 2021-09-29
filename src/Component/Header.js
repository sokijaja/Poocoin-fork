/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, Hidden, NativeSelect, Modal, Fade } from '@material-ui/core';
import { useWallet } from 'use-wallet'
import PoocoinIcon from '../Images/poocoin512.png';
import BNBIcon from '../Images/bnb1.png';
import TelegramIcon from '../Images/telegram.svg';
import { poocoinBalance } from '../PooCoin/index.js';
import { connectType, networkValue } from '../constants';
import { connectWalletStatus } from '../constants';
import Web3 from 'web3'
import { switchNetwork } from '../PooCoin/util';
import DefaultTokens from '../config/default_tokens.json'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  appBarSolid: {
    backgroundColor: '#262626',
    boxShadow: 'none',
    padding: 15,
    textAlign: 'center',
    borderBottom: '3px solid #484e53',
    position: 'initial'
  },
  Toolbar: {
    padding: "0px 50px 0px 50px",
    [theme.breakpoints.down("xs")]: {
      padding: '10px 0px 10px 10px',
    },
  },
  linkGroup: {
    textAlign: 'center',
    display: 'content',
    [theme.breakpoints.down("xs")]: {
      display: 'contents',
    },
  },
  link: {
    fontSize: 14,
    margin: 12,
    textDecoration: 'blink',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  chainLinkGroup: {
    marginLeft: 15,
    display: 'grid',
    marginRight: 15
  },
  chainLinkInput: {
    color: '#3eb8ff',
    '&:before': {
      display: 'none'
    },
    '&:after': {
      display: 'none'
    },
    '& svg': {
      display: 'none'
    }
  },
  chainLink: {
    fontSize: 15,
    backgroundColor: '#262626!important',
    color: 'white',
  },
  iconLink: {
    display: 'flex',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    textDecoration: 'blink'
  },
  icon: {
    marginLeft: "5px",
    height: "40px",
    width: "40px",
    cursor: "pointer",
    marginRight: "10px"
  },
  connect: {
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    color: theme.palette.common.white,
    backgroundColor: '#53CA42',
  },
  coinAmount: {
    color: '#adb5bd',
    textAlign: 'left',
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      textAlign: 'center'
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: '50px',
      textAlign: 'left',
    },
  },
  amountColor: {
    color: '#28a745'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#e9ecef',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: '40px 30px 30px 30px',
    display: 'grid',
    borderRadius: '8px',
  },
  connectBtn: {
    borderRadius: '4px',
    color: 'white',
    backgroundColor: '#262626',
    marginBottom: '.5rem',
    padding: '5px',
  },
  connectBtnDisable: {
    borderRadius: '4px',
    color: 'white',
    backgroundColor: '#262626',
    marginBottom: '.5rem',
    padding: '5px',
    cursor: 'not-allowed!important'
  },
  rightLink: {
    fontSize: '14px',
    margin: '0px',
    padding: '0px',
  },
  headerIcon: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: '10px'
    },
  },
}));

export default function Header(props) {
  const web3 = new Web3(window.ethereum);
  const classes = useStyles();
  const { connectControl, changeNetwork, networkChainId } = props;
  const history = useHistory();

  let connectStatus = localStorage.getItem('PoocoinConnectStatus'); //status connect to metamask
  if (connectStatus == null) {
    connectStatus = connectWalletStatus.disconnect;
    localStorage.setItem('PoocoinConnectStatus', connectWalletStatus.disconnect);
  }

  let [userDisconnected, setUserDisconnected] = useState(connectStatus);

  const { account, connect, reset, balance } = useWallet()
  const [poocoinBalanceData, setPoocoinBalanceData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [network, setNetwork] = useState(localStorage.getItem('PoocoinChainId'));
  const dispatch = useDispatch();

  const handleNetworkChange = (event) => {                         //select network chain
    if (event.target.value == networkValue.Binance) {
      history.push('/')
    } else if (event.target.value == networkValue.Polygon) {
      history.push('/polygon')
    } else if (event.target.value == networkValue.Kuchain) {
      history.push('/kuchain')
    }
    setNetwork(event.target.value);
    changeNetwork(event.target.value);
    reset()
    setUserDisconnected(connectWalletStatus.disconnect);
    localStorage.setItem('PoocoinConnectStatus', connectWalletStatus.disconnect);
  }

  const connectOrDisconnect = () => {                               //connect and disconnect button event
    if (userDisconnected == connectWalletStatus.connect) {
      setUserDisconnected(connectWalletStatus.disconnect);
      localStorage.setItem('PoocoinConnectStatus', connectWalletStatus.disconnect);
      reset();
      poocoinBalance(account, poocoinBalanceValues);
    } else {                              //success connect
      setModalOpen(true)
    }
  }

  const poocoinBalanceValues = (data) => {
    setPoocoinBalanceData(data);
  }

  const connectMethod = value => async () => {
    await connectControl(value);                                //metamask, walletconnect, binance-chain
    let currentChainId = parseInt(localStorage.getItem("PoocoinChainId"));
    let metamaskChainId = parseInt(web3.currentProvider.chainId, 16);
    if (currentChainId != metamaskChainId) {
      await switchNetwork(currentChainId);                       //switch network in metamask
    } else {
      try {
        connect('injected');
      } catch (err) {
        console.log(err);
      }
      setUserDisconnected(connectWalletStatus.connect);          //connect btn
      localStorage.setItem('PoocoinConnectStatus', 1);
    }
    setModalOpen(false);
  }

  useEffect(() => {
    if (!account && userDisconnected == connectWalletStatus.connect) {
      try {
        connect();
        poocoinBalance(account, poocoinBalanceValues);
      } catch (err) {
        console.log(err);
      }
    }
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=poocoin&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        setPriceData(data.poocoin.usd);
      })
      .catch(err => {

      })
  }, [account, userDisconnected])

  let coinAmount = '';
  let connectLabel = 'Connect';
  if (account && userDisconnected == connectWalletStatus.connect) {
    coinAmount = (
      <div>
        <Link to={`/swap?outputCurrency=${DefaultTokens.POOCOIN.address}`} className={classes.rightLink}>
          <div>Your <img src={PoocoinIcon} height="18" /> : {poocoinBalanceData} <span className={classes.amountColor}>${parseFloat(poocoinBalanceData * priceData).toFixed(2)}</span></div>
        </Link>
        <a target="_blank" href={`https://v1exchange.pancakeswap.finance/#/add/BNB/${DefaultTokens.POOCOIN.address}`} className={classes.rightLink}>
          <div>Your <img src={PoocoinIcon} height="18" /><img src={BNBIcon} height="15" /> LP V1: 0.00 <span className={classes.amountColor}>$0.00</span></div>
        </a>
        <a target="_blank" href={`https://pancakeswap.finance/add/BNB/${DefaultTokens.POOCOIN.address}`} className={classes.rightLink}>
          <div>Your <img src={PoocoinIcon} height="18" /><img src={BNBIcon} height="15" /> LP V2: 0.00 <span className={classes.amountColor}>$0.00</span></div>
        </a>
      </div>
    );
    connectLabel = (
      <span>Logout</span>
    );
  }

  const [open, setModalOpen] = React.useState(false);

  const modalClose = () => {
    setModalOpen(false);
  };

  return (
    <AppBar position="fixed" className={classes.appBarSolid}>
      <Toolbar className={classes.Toolbar}>
        <Grid container direction="row" alignItems="center">
          <Grid item md={4} sm={12} xl={4}>
            <Grid container alignItems="center">
              <Grid item>
                <a href="/" className={classes.iconLink}>
                  <img src={PoocoinIcon} className={classes.icon}></img>
                  <span>
                    PooCoin <br />Charts
                  </span>
                </a>
              </Grid>
              <Grid item className={classes.chainLinkGroup}>
                <NativeSelect
                  value={network}
                  name="age"
                  onChange={handleNetworkChange}
                  className={classes.chainLinkInput}
                  inputProps={{ 'aria-label': 'age' }}
                >
                  <option className={classes.chainLink} value={networkValue.Binance}>
                    Binance (BSC)
                  </option>
                  <option className={classes.chainLink} value={networkValue.Polygon}>
                    Polygon (Matic)
                  </option>
                  <option className={classes.chainLink} value={networkValue.Kuchain}>
                    KuChain (KCC)
                  </option>
                </NativeSelect>
              </Grid>
              {
                networkChainId == networkValue.Binance
                  ?
                  <Grid item className={classes.headerIcon}>
                    <Link
                      to={`/tokens/${DefaultTokens.POOCOIN.address}`}
                      onClick={() => dispatch({ type: 'SET_TOKENADDRESS', payload: DefaultTokens.POOCOIN.address })}
                    >
                      <span style={{ borderRadius: '999px', backgroundColor: 'white', padding: '5px' }}>
                        <img src={PoocoinIcon} height="18" />
                      </span>
                      <span className={classes.amountColor}> ${priceData} </span>
                    </Link>
                    <a href="telegram.com">
                      <img src={TelegramIcon} height='25' />
                    </a>
                  </Grid>
                  :
                  <Grid item>
                    <a href="telegram.com">
                      <img src={TelegramIcon} height='25' />
                    </a>
                  </Grid>
              }
            </Grid>
          </Grid>
          {
            networkChainId == networkValue.Binance &&
            <Grid item md={5} sm={12} xl={5} container justifyContent={'center'} >
              <div className={classes.linkGroup}>
                <Link className={classes.link} to="/">Charts</Link>
                <Link className={classes.link} to="/swap">Trade</Link>
                <Link className={classes.link} to="/multichart">Multi&nbsp;Chart</Link>
                <Link className={classes.link} to="/about">About</Link>
                <Link className={classes.link} to="/premium">Premium</Link>
                {/* <a className={classes.link} href="/about">About</a>
                <a className={classes.link} href="/tools">Tools</a><br />
                <a className={classes.link} href="/premium">Premium</a>
                <a className={classes.link} href="/promote">Advertise</a>
                <a className={classes.link} href="https://t.me/Poocoin_Pricebot">Free&nbsp;Price&nbsp;Bot</a> */}
              </div>
            </Grid>
          }
          {
            networkChainId == networkValue.Polygon &&
            <Grid item md={5} sm={5} xl={5} container justifyContent={'center'} >
              <div className={classes.linkGroup}>
                <Link className={classes.link} to="/polygon">Charts</Link>
                <Link className={classes.link} to="/polygonpromote">Advertise</Link>
              </div>
            </Grid>
          }
          {
            networkChainId == networkValue.Kuchain &&
            <Grid item md={5} sm={5} xl={5} container justifyContent={'center'} >
              <div className={classes.linkGroup}>
                <Link className={classes.link} to="/kuchain">Charts</Link>
                <Link className={classes.link} to="/kuchainpromote">Advertise</Link>
              </div>
            </Grid>
          }
          <Grid item md={2} sm={12} xl={2} className={classes.coinAmount}>
            {coinAmount}
          </Grid>
          <Grid item md={1} sm={12} xl={1}>
            <Button variant="contained" className={classes.connect} onClick={connectOrDisconnect}>{connectLabel}</Button>
          </Grid>
        </Grid>
      </Toolbar>
      <Modal
        className={classes.modal}
        open={open}
        onClose={modalClose}
      >
        <div className={classes.paper}>
          <button className={classes.connectBtn} onClick={connectMethod(connectType.metamask)}>Metamask/TrustWallet</button>
          <button className={classes.connectBtnDisable}>WalletConnect</button>
          {network == networkValue.Binance && <button className={classes.connectBtnDisable} >Binance Chain Wallet</button>}
          <button className={classes.connectBtn} onClick={modalClose}>Close</button>
        </div>
      </Modal>
    </AppBar >
  );
}
