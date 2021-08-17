import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, Hidden } from '@material-ui/core';
import { useStatePersist } from 'use-state-persist';
import { useWallet } from 'use-wallet'
import PoocoinIcon from '../Images/poocoin512.png';

const useStyles = makeStyles((theme) => ({
  appBarSolid: {
    backgroundColor: '#262626',
    boxShadow: 'none',
    padding: 8,
    textAlign: 'center',
    borderBottom: '3px solid #484e53',
    position: 'initial'
  },
  linkGroup: {
    textAlign: 'center',
    display: 'content'
  },
  link: {
    fontSize: 14,
    margin: 12,
    textDecoration: 'blink',
    color: 'white',
    // fontWeight:'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  chainLinkGroup: {
    marginLeft: 15,
    display: 'grid',
    marginRight: 15
  },
  chainLink: {
    fontSize: 12,
    color: '#3eb8ff',
    textDecoration: 'blink'
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
}));

export default function Header() {
  const classes = useStyles();

  const [userDisconnected, setUserDisconnected] = useStatePersist(true);
  const { account, connect, reset } = useWallet()

  const connectOrDisconnect = () => {
    if (account) {
        setUserDisconnected(true);
        reset();
    } else {
        setUserDisconnected(false);
        connect('injected')
    }
  }

  useEffect(() => {
      if (!account && !userDisconnected) {
          connect();
      }
  }, [account, userDisconnected])

  return (
    <AppBar position="fixed" className={classes.appBarSolid}>
      <Toolbar>
        <Grid container direction="row" alignItems="center" justifyContent="center">
          <Grid item md={4} sm={12} xl={4}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <a href="/" className={classes.iconLink}>
                  <img src={PoocoinIcon} className={classes.icon}></img>
                  <span>
                    PooCoin <br/>Charts
                  </span>
                </a>
              </Grid>
              <Grid item className={classes.chainLinkGroup}>
                <a href="/" className={classes.chainLink} style={{ color: 'white' }}>
                  Binance (BSC)
                </a>
                <a href="/" className={classes.chainLink}>
                  Polygon (Matic)
                </a>
                <a href="/" className={classes.chainLink}>
                  KuChain (KCC)
                </a>
              </Grid>
              <Grid item>
                <span style={{ borderRadius: '999px', backgroundColor: 'white'}}>
                  <img src={PoocoinIcon} height="18"/>
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xl={6}  container justifyContent={'center'} >
            <div className={classes.linkGroup}>
              <a className={classes.link} href="/">Charts</a>
              <a className={classes.link} href="/swap">Trade</a>
              <a className={classes.link} href="/multichart">Multi&nbsp;Chart</a>
              <a className={classes.link} href="/about">About</a>
              <a className={classes.link} href="/tools">Tools</a><br />
              <a className={classes.link} href="/premium">Premium</a>
              <a className={classes.link} href="/promote">Advertise</a>
              <a className={classes.link} href="https://t.me/Poocoin_Pricebot">Free&nbsp;Price&nbsp;Bot</a>
            </div>
          </Grid>
          <Grid item md={2} sm={12} xl={2}>
            <Button variant="contained" className={classes.connect} onClick={connectOrDisconnect}>Connect</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
