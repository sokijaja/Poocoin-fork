/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import BSC from "../../Images/bscscan.png";
import LpInfoItem from "./lpInfoItem";
import { tokenBalance, getAmountsOut } from "../../PooCoin";
import { numberWithCommas } from "../../PooCoin/util";
import { useSelector } from 'react-redux';
import DefaultTokens from '../../config/default_tokens.json'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#303030",
    fontSize: "12px !important",
  },
  SubList: {
    maxHeight: "200px !important",
    overflow: "auto",
    textAlign: "left",
    marginLeft: 8,
  },
  marketValue: {
    color: "#28a745",
    textAlign: "left",
    marginLeft: 8,
    marginTop: 0,
  },
  value: {
    color: "#28a745",
  },
  market: {
    textAlign: "left",
    marginLeft: 8,
    fontSize: 13,
    marginTop: 20,
    marginBottom: 1,
  },
  list: {
    marginBottom: 15,
  },
  link: {
    fontSize: 12,
  },
  tokenTransaction: {
    textAlign: 'left',
    padding: '15px',
    fontSize: '15px',
    '& a:hover': {
      color: 'white'
    },
    '& img': {
      marginTop: '-5px',
      marginRight: '5px',
    }
  },
  bscIcon: {
    width: '20px',
  },
  bitqueryIcon: {
    width: '80px',
  }
}));

const SimpleList = ({ lpdata, totalSupply, currentTokenInfo }) => {

  // let marketCap = totalSupply * ratePrice;
  const [burnBalance, setBurnBalance] = useState(0);
  const [priceRateData, setPriceRateData] = useState(0);
  const currentTokenAddress = useSelector((state) => state.tokenAddress);
  const classes = useStyles();

  const setBurnData = (data) => {
    setBurnBalance(data);
  }
  const setPriceRate = (data) => {
    setPriceRateData(data);
  }
  useEffect(() => {
    if (currentTokenAddress != undefined) {
      tokenBalance(DefaultTokens.BURNADDRESS.address, currentTokenAddress, setBurnData)
      getAmountsOut(1, currentTokenAddress, DefaultTokens.BUSD.address, setPriceRateData)
    }
  }, [currentTokenAddress])

  if (totalSupply == undefined) {
    totalSupply = 0;
  }
  const realMarketCap = (parseFloat(totalSupply) - burnBalance) * parseFloat(priceRateData);
  const pureMarketCap = numberWithCommas(parseInt(realMarketCap));
  return (
    <div className={classes.root}>
      <div>
        <p className={classes.market}>
          Market Cap: (Includes locked, excludes burned)
        </p>
        <p className={classes.marketValue}>${pureMarketCap}</p>
      </div>
      <Divider className={'mb-3 mt-3'} />
      <div className={classes.SubList}>
        <div className={classes.list}>
          {lpdata.map((row, index) =>
            <LpInfoItem lpInfo={row} currentTokenInfo={currentTokenInfo} key={index} />
          )}
          {/* <LpInfoItem lpInfo={lpdata} /> */}
        </div>
      </div>
      <Divider className={'mb-3 mt-3'} />
      <div className={classes.tokenTransaction}>
        <a target="_blank" href={`https://bscscan.com/token/${currentTokenAddress}`}>
          <img src={BSC} className={classes.bscIcon} />
          {currentTokenInfo.symbol}
          &nbsp;Transactions
        </a>
      </div>
      <Divider />
      <div className={classes.tokenTransaction}>
        <a target="_blank" href={`https://bscscan.com/address/${currentTokenAddress}#code`}>
          <img src={BSC} className={classes.bscIcon} />
          {currentTokenInfo.symbol}
          &nbsp;Contract
        </a>
      </div>
      <Divider />
      <div className={classes.tokenTransaction} >
        <a target="_blank" href={`https://bscscan.com/token/${currentTokenAddress}#balances`}>
          <img src={BSC} className={classes.bscIcon} />
          {currentTokenInfo.symbol}
          &nbsp;Holders
        </a>
      </div>
      <Divider />
      <div className={classes.tokenTransaction}>
        <a target="_blank" href={`https://explorer.bitquery.io/bsc/token/${currentTokenAddress}`}>
          <img src="https://bitquery.io/wp-content/uploads/2020/09/bitquery_logo_w.png" className={classes.bitqueryIcon} />
          &nbsp;Bitquery Explorer
        </a>
      </div>
    </div>
  );
};

export default SimpleList;
