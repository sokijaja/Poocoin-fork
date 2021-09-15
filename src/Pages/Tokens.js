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
import { getRate, getReserve } from "../PooCoin";
import { useHistory, useParams } from "react-router";
import { getLpinfo } from "../actions";
import { useSelector, useDispatch } from 'react-redux'
import { getBNBLpaddress } from "../actions";
import DefaultTokens from '../config/default_tokens.json';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      padding: 0,
    },
    backgroundColor: '#303032!important'
  },
  input: {
    display: "none",
  },
  // button: {
  //   margin: theme.spacing(1),
  //   float: theme.right,
  // },
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
    padding: '20px',
  },
  chartPan: {
    display: 'inline-block',
    width: 'auto',
  }
}));

export default function Tokens(props) {
  const classes = useStyles();
  const [showMode, setShowMode] = useState(1);
  const [priceRateData, setPriceRateData] = useState(0);
  const history = useHistory();
  const [lpDatas, setLpDatas] = useState([]);
  const [currentTokenInfo, setCurrentTokenInfo] = useState({});

  const tokenAddress = useSelector((state) => state.tokenAddress)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_TOKENADDRESS', payload: props.match.params.id })

    //Get all info about current token from lpaddress and token table
    getLpinfo(tokenAddress)
      .then(data => {
        const tokens = [];
        for (var idx in data.lpInfos) {
          if (data.lpInfos[idx].token0 == tokenAddress) {
            let combined_json = {};
            combined_json["label"] = data.lpInfos[idx].tokenName1;
            let addrLpInfo = [data.lpInfos[idx].token1, data.lpInfos[idx].tokenSymbol1, data.lpInfos[idx].lp_address, 0];
            combined_json["value"] = addrLpInfo;
            tokens.push(combined_json);
          } else {
            let combined_json = {};
            combined_json["label"] = data.lpInfos[idx].tokenName0;
            let addrLpInfo = [data.lpInfos[idx].token0, data.lpInfos[idx].tokenSymbol0, data.lpInfos[idx].lp_address, 1];
            combined_json["value"] = addrLpInfo;
            tokens.push(combined_json);
          }
        }
        setLpDatas(tokens);
        setCurrentTokenInfo(data.tokenInfos)
      })

    //Get Lpaddress from current token address and BNB token address
    getBNBLpaddress(props.match.params.id).then(BNBLpaddress => {
      localStorage.setItem('chartLpaddress', BNBLpaddress);
    })

    //Get Lpaddress from current token address and BUSD token address
    getRate(tokenAddress, DefaultTokens.BUSD.address, setPriceRateData);
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

  const tokenSelect = (e) => { };

  let centerContainer = (
    <div>
      <div className={classes.headerContainer}>
        <Grid container spacing={2}>
          <Grid xs item>
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
                <br /><span className={'textSuccess'}>${parseFloat(priceRateData).toFixed(8)}</span>
              </span>
            </p>
            <Grid style={{ float: "left" }}>
              <TokenSelect tokenProps={handleTokenPropsChange} />
            </Grid>
          </Grid>
          <Grid className={classes.buttongrid}>
            <Button className={classes.button}>
              <img src={Buttonicon} width="18" height="18" />
            </Button>
            <Button className={classes.button}>Trade</Button>
            <Button className={classes.button} onClick={handleChange}>
              A
            </Button>
          </Grid>
          <Grid className={classes.buttongrid}>
            <Button style={{ color: "white" }}>
              <LanguageIcon style={{ color: "white" }} />
              Website
            </Button>
            <Button style={{ color: "white" }}>
              <TelegramIcon style={{ color: "white" }} />
              Telegram
            </Button>
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
              // defaultValue={tokenLp[0]}
              options={lpDatas}
              // input={false}
              onChange={tokenSelect}
            // onInputChange={tokenInputChange}
            ></Select>
          </div>
          <Switch />
        </Grid>
      </div>
      <Grid xs={12} style={{ marginTop: 20 }} item>
        <div className={classes.chartPan} >
          <Chart2 tokenName={currentTokenInfo.name} />
        </div>
        <br />
        <TableTab />
      </Grid>
    </div>
  );

  let container;

  if (showMode) {
    container = (
      <Grid container>
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
          <Lefttab lpdata={lpDatas} name={currentTokenInfo} />
        </Grid>
        <Grid item xs={9}>
          {centerContainer}
        </Grid>
      </Grid>
    );
  }

  return <Grid className={classes.root}>{container}</Grid>;
}
