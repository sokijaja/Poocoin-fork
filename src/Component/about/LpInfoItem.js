import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getRate } from "../../PooCoin/index";
import { getReserve } from "../../PooCoin/index";
import { numberWithCommas } from "../../PooCoin/util";

const useStyles = makeStyles({
  root: {
    marginBottom: '1rem'
  },
  linkTag: {
    fontSize: "14px",
    color: '#3eb8ff',
  },
});

export default function LpInfoItem(props) {
  const classes = useStyles();
  const [lpInfo, setLpInfo] = useState({});
  const [priceRate, setPriceRateData] = useState(0);
  const setPriceRate = (data) => {
    if (lpInfo.reserve != undefined) {
      const priceRate_data = parseFloat(lpInfo.reserve) * data;
      setPriceRateData(parseInt(priceRate_data));
    }
  }
  useEffect(() => {
    const lpdataInfo = props.lpInfo;
    getReserve(lpdataInfo.value[2], lpdataInfo.value[3]).then((reserveData) => {
      setLpInfo({ label: lpdataInfo.label, symbol: lpdataInfo.value[1], tokenAddress: lpdataInfo.value[0], lpAddress: lpdataInfo.value[2], reserve: reserveData });
    });
    getRate(lpdataInfo.value[0], '0x55d398326f99059ff775485246999027b3197955', setPriceRate);
  }, [lpInfo]);

  return (
    <div className={classes.root}>
      <a target="_blank" className={classes.linkTag} href="https://pancakeswap.finance/swap">Pc v2</a> | {props.currentTokenInfo.name}/{lpInfo.label} LP Holdings:<br />
      {(lpInfo.reserve == undefined) ? 0 : parseFloat(lpInfo.reserve).toFixed(2) + lpInfo.symbol}<span className={'textSuccess'}>{(lpInfo.reserve == undefined) ? '($0)' : `(${numberWithCommas(parseInt(priceRate))})`}</span> |<a target="_blank" className={classes.linkTag} href={`https://bscscan.com/token/${lpInfo.tokenAddress}?a=${lpInfo.lpAddress}#tokenAnalytics`}> Chart</a> | <a target="_blank" className={classes.linkTag} href={`https://bscscan.com/token/${lpInfo.lpAddress}`}>Holders</a>
    </div>
  );
}
