import React from 'react';
import Tab from '../Component/basic/hometab';
import Input from '../Component/basic/input';
import TokenSelect from '../Component/TokenSelect';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',

  },
  title: {
    color: 'white',
    fontSize: '2.5em',
    fontWeight: 700,
  },
  tokenSelect: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'center'
  },
  centerText: {
    fontSize: 30,
    color: 'white',
    marginTop: 10
  },
  bottomText: {
    fontSize: 25,
    color: 'white',
    marginTop: 10
  },
  inputWidth: {
    width: '100%',

  },
  tabContainer: {
    minHeight: '700px !important'
  },
  rightSide: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 17,
    backgroundColor: '#303030',
    maxWidth: 800,
    minWidth: 500
  },
  topSide: {
    marginLeft: '19%',
    marginTop: 20,
    color: 'white'
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <h1 className={classes.title}>BSC Charts</h1>
      <div className={classes.centerText}>View price charts for any token in your wallet (binance smart chain)</div>
      <div className={classes.bottomText}>Telegram public chat:<a href="/" style={{ color: '#74aef7', fontSize: 25 }}> http://t.me/poocointokenchat </a></div>
      <div className={classes.tokenSelect}>
        <TokenSelect />
      </div>
      <div className={classes.rightSide}>
        <Input className={classes.inputWidth} />
        <Tab className={classes.tabContainer} />
      </div>

    </div>
  )
}