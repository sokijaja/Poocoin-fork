/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SubList from "./subList";
import BSC from "../../Images/bscscan.png";
import Link from "@material-ui/core/Link";
import { arrayify } from "ethers/lib/utils";
import { TokenAmount } from "@pancakeswap-libs/sdk";
import { cleanup } from "@testing-library/react";
import LpInfoItem from "./lpInfoItem";
import { getReserve } from "../../PooCoin";
import { useParams } from "react-router";
import { tokenBalance, getRate } from "../../PooCoin";
import { numberWithCommas } from "../../PooCoin/util";
import { useSelector, useDispatch } from 'react-redux';

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

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

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
      tokenBalance('0x000000000000000000000000000000000000dead', currentTokenAddress, setBurnData)
      getRate(currentTokenAddress, '0xe9e7cea3dedca5984780bafc599bd69add087d56', setPriceRate);
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
