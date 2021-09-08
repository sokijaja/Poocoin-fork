/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Tab from "../Component/basic/hometab";
import Lefttab from "../Component/about/tab";
import Chart from "../Component/home/chart";
import Input from "../Component/basic/input";
// import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
// import Icon from '@material-ui/core/Icon';
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Panel from "../Component/multichart/panel";
import rightPoster from "../Images/moonstar3.gif";
import leftPoster from "../Images/leftposter.gif";
import SearchInput from "../Component/TokenSelect";
import SelectBox from "../Component/about/select";
import Button from "@material-ui/core/Button";
import logo from "../Images/TokenIcons/logo2.png";
import Buttonicon from "../Images/bscscan.png";
import LanguageIcon from "@material-ui/icons/Language";
import TelegramIcon from "@material-ui/icons/Telegram";
import Switch from "../Component/multichart/switch";
import Chart2 from "../Component/about/chart";
import TableTab from "../Component/home/centercontain/tabletab";
import TokenSelect from "../Component/home/tokenSelect";
import Select from "react-select";
import { getReserve } from "../PooCoin";

import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      padding: 0,
    },
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
  inputWidth: {
    width: "100%",
  },
  tabContainer: {
    minHeight: "700px !important",
  },
  rightSide: {
    backgroundColor: "#303030",
    marginTop: 5,
    padding: 0,
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
}));

export default function Tokens() {
  const classes = useStyles();
  const [showMode, setShowMode] = useState(1);
  const [priceData, setPriceData] = useState([]);
  const [tokenLp, setToken] = useState([]);

  const lpDatas = [];

  const tokenName = [];
  const { state } = useLocation();

  const [reserve, setReserveData] = useState([]);
  const setReserve = (data) => {
    // setReserveData(data);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/token/getTokenProps", {
        params: { foo: state },
      })
      .then((res) => {
        for (var idx in res.data) {
          let combined_json = {};
          combined_json["name"] = res.data[idx]["type"];
          combined_json["token0"] = res.data[idx]["token0"];
          combined_json["token1"] = res.data[idx]["token1"];
          combined_json["lp_address"] = res.data[idx]["lp_address"];
          lpDatas.push(combined_json);
        }
      });

    axios
      .get("http://localhost:5000/token/getName", {
        params: { foo: state },
      })
      .then((res) => {
        tokenName.push(res.data);
      });
  }, []);

  const handleChange = () => {
    setShowMode(!showMode);
  };
  const handleChangeLeft = () => {
    setShowMode(!showMode);
  };

  const handleTokenPropsChange = (props) => {
    let tokens = [];
    for (var idx in props) {
      let combined_json = {};
      combined_json["label"] = props[idx]["type"];
      combined_json["value"] = props[idx]["token0"];
      tokens.push(combined_json);
    }
    setToken(tokens);
  };

  const tokenSelect = (e) => {};

  let centerContainer = (
    <Grid>
      <Grid container spacing={2}>
        <Grid xs item>
          <Grid item>
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
                Thoreum (THOREUM/BNB)
                <br />${priceData}
              </span>
            </p>
            <Grid style={{ float: "left" }}>
              <TokenSelect tokenProps={handleTokenPropsChange} />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs item>
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
            defaultValue={tokenLp[0]}
            options={tokenLp}
            // input={false}
            onChange={tokenSelect}
            // onInputChange={tokenInputChange}
          ></Select>
        </div>
        <Switch />
      </Grid>
      <Grid xs={12} style={{ marginTop: 20 }} item>
        <Chart2 />
        <TableTab />
      </Grid>
    </Grid>
  );

  let container;

  if (showMode) {
    container = (
      <Grid container spacing={1} item xs={12}>
        <Grid item xs={3}>
          <Lefttab lpdata={lpDatas} name={tokenName} />
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
                class="img-fluid"
                src={rightPoster}
                width="350"
                height="100"
              />
            </a>
          </div>
          <Input className={classes.inputWidth} />
          <Tab className={classes.tabContainer} />
        </Grid>
      </Grid>
    );
  } else {
    container = (
      <Grid container item xs={12}>
        <Grid item xs={3}>
          <Lefttab lpdata={lpDatas} name={tokenName} />
        </Grid>
        <Grid item xs={9}>
          {centerContainer}
        </Grid>
      </Grid>
    );
  }

  return <Grid>{container}</Grid>;
}
