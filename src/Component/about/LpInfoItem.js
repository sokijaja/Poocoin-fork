import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import List from "./list";
import { getTotalSupply } from "../../PooCoin";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { getReserve } from "../../PooCoin/index";

const useStyles = makeStyles({});

export default function LpInfoItem(props) {
  let { lpInfo } = props;
  //   let lp = JSON.parse(JSON.stringify(lpInfo[0]));
  //   console.log(lp);
  //   console.log(lp.lp_address);

  const [reserveVal, setReserveVal] = useState([]);

  const setReserve = (data) => {
    setReserveVal(data);
  };
  useEffect(() => {
    // getReserve(lp.lp_address, setReserve);
  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <Link className={classes.link}> Pcv2 </Link>|{/* {type} */}
      </div>
      <div>
        4,383.71 BNB
        <span className={classes.value}>($1,544,527)</span> |{" "}
        <Link className={classes.link}> Chart </Link>|{" "}
        <Link className={classes.link}> Holders </Link>
      </div>
    </div>
  );
}
