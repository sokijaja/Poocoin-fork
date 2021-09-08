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
import LpInfoItem from "./LpInfoItem";

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
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const SimpleList = ({ data, name }) => {
  const tokenType = [];

  const [lpdata, setLpdata] = useState(data);

  // const [tokenTypeArray, setTokenArray] = useState([]);
  // console.log(data);
  // useEffect(() => {
  //   return () => {
  //     if (lpdata.length !== 0) {
  //       for (let i = 0; i < lpdata[0].length; i++) {
  //         tokenType.push(lpdata[0][i].type);
  //       }
  //       setTokenArray(tokenType);
  //     }
  //   };
  // }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <p className={classes.market}>
          Market Cap: (Includes locked, excludes burned)
        </p>
        <p className={classes.marketValue}>$14,162,672</p>
      </div>
      <Divider />
      {/* <SubList className={classes.SubList} /> */}
      <div className={classes.SubList}>
        <div className={classes.list}>
          <LpInfoItem lpInfo={lpdata} />
        </div>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemIcon>
            <img src={BSC} height="20" />
          </ListItemIcon>
          <ListItemText primary="POOCOIN Transactions" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <img src={BSC} height="20" />
          </ListItemIcon>
          <ListItemText primary="POOCOIN Transactions" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <img src={BSC} height="20" />
          </ListItemIcon>
          <ListItemText primary="POOCOIN Transactions" />
        </ListItem>
        <Divider />
        <ListItem>
          <Link style={{ color: "#fff  !important" }}>
            {" "}
            Dev Wallet Checker{" "}
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link>
            {" "}
            <img src={BSC} height="20" /> Bitquery Explorer{" "}
          </Link>
        </ListItem>
      </List>
    </div>
  );
};

export default SimpleList;
