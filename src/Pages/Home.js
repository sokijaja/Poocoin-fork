import React from "react";
import Tab from "../Component/basic/hometab";
import Input from "../Component/basic/input";
import TokenSelect from "../Component/TokenSelect";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    color: "black",
  },
  content: {
  },
  title: {
    fontSize: "2.5em",
    fontWeight: 700,
  },
  tokenSelect: {
    marginTop: "1em",
    display: "flex",
    justifyContent: "center",
  },
  centerText: {
    fontSize: 30,
    marginTop: 10,
  },
  bottomText: {
    fontSize: '20px !important',
    marginTop: 10,
  },
  inputWidth: {
    width: "100%",
    padding: "1em 1em 1em 1em",
  },
  tabContainer: {
    minHeight: "700px !important",
  },
  rightSide: {
    margin: '17px auto 20px auto',
    backgroundColor: "#303030",
    maxWidth: 800,
    minWidth: 300,
    borderRadius: '8px',
    padding: '10px',
  },
  topSide: {
    marginLeft: "19%",
    marginTop: 20,
    color: "white",
  },
  pageHeader: {
    backgroundColor: "#ffc107",
    height: "auto",
    padding: '20px',
    color: 'black',
  },
  tLink: {
    color: 'blue',
    fontSize: '1.5rem',
    textDecoration: 'underline',
    flexWrap: 'break-wrap',
  }
});

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const inputHandle = (tokenAddress) => {
    history.push(`/tokens/${tokenAddress}`);
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress })
  };

  const handleTokenPropsChange = (tokenInfo) => {
    const tokenAddress = tokenInfo.address;
    history.push(`/tokens/${tokenAddress}`);
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress })
  };

  return (
    <div className={classes.root}>
      <div className={classes.pageHeader}>
        <h1 className={classes.title}>BSC Charts</h1>
        <div className={classes.centerText}>
          View price charts for any token in your wallet (binance smart chain)
        </div>
        <div className={classes.bottomText}>
          Telegram public chat: &nbsp;
          <a className={classes.tLink} target="_blank">
            http://t.me/poocointokenchat
          </a>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.tokenSelect}>
          <TokenSelect inputHandle={inputHandle} tokenProps={handleTokenPropsChange} />
        </div>
        <div className={classes.rightSide}>
          <div className={classes.inputWidth}>
            <Input />
          </div>
          <Tab className={classes.tabContainer} />
        </div>
      </div>
    </div>
  );
}
