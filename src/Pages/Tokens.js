/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Tab from "../Component/basic/hometab";
import Lefttab from "../Component/about/tab";
import Input from "../Component/basic/input";
import { makeStyles } from "@material-ui/core/styles";
import rightPoster from "../Images/moonstar3.gif";
import Button from "@material-ui/core/Button";
import logo from "../Images/TokenIcons/logo2.png";
import Buttonicon from "../Images/bscscan.png";
import LanguageIcon from "@material-ui/icons/Language";
import TelegramIcon from "@material-ui/icons/Telegram";
import Switch from "../Component/multichart/switch";
import Chart2 from "../Component/basic/chart";
import TableTab from "../Component/home/centercontain/tabletab";
import TokenSelect from "../Component/TokenSelect";
import Select from "react-select";
import { getAmountsOut } from "../PooCoin";
import { useHistory, useParams } from "react-router";
import { getLpinfo } from "../actions";
import { useSelector, useDispatch } from 'react-redux';
import DefaultTokens from '../config/default_tokens.json';
import Trade from "./Trade";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "1px",
      padding: "0px 30px 0px 0px",
    },
    backgroundColor: '#262626!important'
  },
  input: {
    display: "none",
  },
  rightTitle: {
    color: "#ffffff",
    paddingBottom: 10,
  },
  inputField: {
    width: "100%",
    marginTop: '20px',
  },
  tabContainer: {
    minHeight: "700px !important",
  },
  rightSide: {
    backgroundColor: "#303030",
    marginTop: 5,
    padding: 10,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  buttongrid: {
    textAlign: "-webkit-right",
  },
  button: {
    backgroundColor: "#303032",
    border: "1px solid #303032",
    color: "#f8f9fa !important",
    height: 35,
    marginLeft: 3,
    fontSize: ".875rem",
    fontWeight: 400,
    boxShadow:
      "inset 0 1px 0 hsl(0deg 0% 100% / 15%), 0 1px 1px rgb(0 0 0 / 8%)",
  },
  selectBox: {
    color: "rgb(51,51,51)",
    fontSize: 14,
    width: 230,
    marginLeft: 7,
    zIndex: 999,
  },
  TokenSelect: {
    backgroundColor: "white",
    marginLeft: 10,
  },
  headerContainer: {
    height: "auto",
  },
  chartPan: {
    display: 'inline-block',
    width: '100%',
  }
}));

export default function Tokens(props) {
  const classes = useStyles();
  const [showMode, setShowMode] = useState(1);
  const [priceRateData, setPriceRateData] = useState(0);
  const history = useHistory();
  const [lpDatas, setLpDatas] = useState([]);
  const [currentTokenInfo, setCurrentTokenInfo] = useState({});
  const [showTrade, setShowTrade] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [convertSymbol, setConvertSymbol] = useState('BNB');

  const tokenAddress = useSelector((state) => state.tokenAddress)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_TOKENADDRESS', payload: props.match.params.id })

    //Get all info about current token from lpaddress and token table
    getLpinfo(tokenAddress)
      .then(data => {
        const tokens = [];
        const selectOptionData = [];
        for (var idx in data.lpInfos) {
          if (data.lpInfos[idx].token0 == tokenAddress) {
            let combined_json = {};
            combined_json["label"] = data.lpInfos[idx].tokenName1;
            //0: other token address, 1: other token symbolName 2: lp address 3: token order 
            let addrLpInfo = [data.lpInfos[idx].token1, data.lpInfos[idx].tokenSymbol1, data.lpInfos[idx].lp_address, 0];
            combined_json["value"] = addrLpInfo;
            tokens.push(combined_json);

            let selectdata_json = {};
            selectdata_json["label"] = "Pc v2 " + data.lpInfos[idx].tokenSymbol0 + "/" + data.lpInfos[idx].tokenSymbol1;
            selectdata_json["value"] = data.lpInfos[idx].tokenSymbol1;
            selectOptionData.push(selectdata_json)
          } else {
            let combined_json = {};
            combined_json["label"] = data.lpInfos[idx].tokenName0;
            let addrLpInfo = [data.lpInfos[idx].token0, data.lpInfos[idx].tokenSymbol0, data.lpInfos[idx].lp_address, 1];
            combined_json["value"] = addrLpInfo;
            tokens.push(combined_json);

            let selectdata_json = {};
            selectdata_json["label"] = "Pc v2 " + data.lpInfos[idx].tokenSymbol1 + "/" + data.lpInfos[idx].tokenSymbol0;
            selectdata_json["value"] = data.lpInfos[idx].tokenSymbol0;
            selectOptionData.push(selectdata_json)
          }
        }
        setLpDatas(tokens);
        setSelectData(selectOptionData)
        setCurrentTokenInfo(data.tokenInfos)
      })

    //Get Lpaddress from current token address and BUSD token address
    getAmountsOut(1, tokenAddress, DefaultTokens.BUSD.address, setPriceRateData);
  }, [tokenAddress])

  const handleChange = () => {
    setShowMode(!showMode);
  };
  const handleChangeLeft = () => {
    setShowMode(!showMode);
  };

  const handleTokenPropsChange = (tokenInfo) => {
    const tokenAddress = tokenInfo.address;
    history.push(`/tokens/${tokenAddress}`);
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress })
  };

  const inputHandle = (tokenAddress) => {
    history.push(`/tokens/${tokenAddress}`);
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress })
  };

  const [tradeContent, setTradeContent] = useState();
  const handleTrade = () => {
    if (showTrade) {
      setTradeContent()
      setShowTrade(false)
    } else {
      setTradeContent(<Trade />)
      setShowTrade(true)
    }
  }
  const tokenSelect = (event) => {
    console.log(event.value);
    setConvertSymbol(event.value)
  };
  let centerContainer = (
    <div>
      <div className={classes.headerContainer}>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <p
              style={{
                display: "flex",
                color: "white",
                textAlign: "left",
                margin: 0,
                float: "left",
              }}
            >
              <img className={classes.img} src={logo} width="32" height="32" />
              <span>
                {currentTokenInfo.name} ({currentTokenInfo.name}/BNB)
                <br /><span className={'textSuccess'}>${parseFloat(priceRateData).toFixed(14)}</span>
              </span>
            </p>
            <Grid style={{ float: "left" }}>
              <TokenSelect inputHandle={inputHandle} tokenProps={handleTokenPropsChange} />
            </Grid>
          </Grid>
          <Grid xs={6} item className={classes.buttongrid}>
            <div>
              <Button className={classes.button} target="_blank" href={`https://bscscan.com/token/${tokenAddress}`}>
                <img src={Buttonicon} width="18" height="18" />
              </Button>
              <Button className={classes.button} onClick={handleTrade}>Trade</Button>
              <Button className={classes.button} onClick={handleChange}>
                <AccountBalanceWallet />
              </Button>
            </div>
            <div>
              <Button style={{ color: "white" }}>
                <LanguageIcon style={{ color: "white" }} />
                Website
              </Button>
              <Button style={{ color: "white" }}>
                <TelegramIcon style={{ color: "white" }} />
                Telegram
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          xs={12}
          style={{ marginTop: 15, flexFlow: "row" }}
        >
          <Button className={classes.button}>Reload</Button>
          <div className={classes.selectBox}>
            <Select
              options={selectData}
              // input={false}
              onChange={tokenSelect}
            // onInputChange={tokenInputChange}
            ></Select>
          </div>
          <Switch />
        </Grid>
      </div>
      <Grid xs={12} style={{ marginTop: 20 }} item>
        <div>{tradeContent}</div>
        <div className={classes.chartPan} >
          <Chart2 tokenAddress={tokenAddress} convertSymbol={convertSymbol} height="500px" />
        </div>
        <br />
        <TableTab />
      </Grid>
    </div>
  );

  let container;

  if (showMode) {
    container = (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Lefttab lpdata={lpDatas} currentTokenInfo={currentTokenInfo} />
        </Grid>
        <Grid item xs={6} style={{ marginTop: 5 }}>
          {centerContainer}
        </Grid>
        <Grid item xs={3} className={classes.rightSide}>
          <div className={classes.rightTitle}>Sponsored BSC Project</div>
          <div>
            <a
              href="https://moonstartoken.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className={"img-fluid"}
                src={rightPoster}
                width="350"
                height="100"
              />
            </a>
          </div>
          <Input className={classes.inputField} />
          <Tab className={classes.tabContainer} />
        </Grid>
      </Grid>
    );
  } else {
    container = (
      <Grid container item xs={12}>
        <Grid item xs={3}>
          <Lefttab lpdata={lpDatas} currentTokenInfo={currentTokenInfo} />
        </Grid>
        <Grid item xs={9}>
          {centerContainer}
        </Grid>
      </Grid>
    );
  }

  return <Grid className={classes.root}>{container}</Grid>;
}
