import React from "react";
import Tab from "../Component/basic/hometab";
import Input from "../Component/basic/input";
import TokenSelect from "../Component/TokenSelect";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    color: "black",
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
    padding: "1em 0em 1em 1em",
  },
  tabContainer: {
    minHeight: "700px !important",
  },
  rightSide: {
    margin: '17px auto 20px auto',
    backgroundColor: "#303030",
    maxWidth: 800,
    minWidth: 500,
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
  }
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.pageHeader}>
        <h1 className={classes.title}>BSC Charts</h1>
        <div className={classes.centerText}>
          View price charts for any token in your wallet (binance smart chain)
        </div>
        <div className={classes.bottomText}>
          Telegram public chat:
          <a className={'textBlue fs5 linkText'}>
            {" "}
            http://t.me/poocointokenchat{" "}
          </a>
        </div>
      </div>
      <div className={classes.tokenSelect}>
        <TokenSelect />
      </div>
      <div className={classes.rightSide}>
        <div className={classes.inputWidth}>
          <Input />
        </div>
        <Tab className={classes.tabContainer} />
      </div>
    </div>
  );
}
