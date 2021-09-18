import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getWalletData } from "../../../PooCoin";
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from "@material-ui/core";
import { useWallet } from 'use-wallet'

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#262626",
    color: theme.palette.common.white,
    // padding: '0 0 0 10px',
    borderColor: "#262626",
    padding: 0,
  },
  body: {
    fontSize: 12,
    lineHeight: 1.43,
    // padding: 0,
    // paddingLeft: 10,
    color: "#fff",
    borderColor: "#262626",
    maxHeight: 300,
    overflow: "auto",
    padding: 0,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#141414",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#141722",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 100,
    maxHeight: 200,
    overflow: "auto",
    float: "right",
    fontSize: "14px !important",
    fontFamily: '"Lato",sans-serif',
    paddingTop: "0px",
  },
  row: {
    color: "#28a745 !important",
    textAlign: 'right',
    '& a': {
      color: '#3eb8ff',
    }
  },
  tableBody: {
    maxHeight: 300,
    overflow: "auto",
  },
  th1: {
    textAlign: "right",
    paddingRight: '10px',
    fontSize: '15px',
  },
  th2: {
    textAlign: "right",
    paddingRight: '10px',
    fontSize: '15px',
  },
  CircularProgress: {
    color: "#b2b5be",
    marginTop: '20px',
  },
  title: {
    color: 'white',
    textAlign: 'left',
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const { account } = useWallet()
  const [walletData, setWalletData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tokenAddress = useSelector((state) => state.tokenAddress)

  const setWalletValues = (data) => {
    if (data.length == 0) {
      setLoading(true)
    } else {
      setLoading(false)
      setWalletData(data);
    }
  };

  useEffect(() => {
    if (account == null) {
      setLoading(true)
      setWalletData(null)
    } else {
      getWalletData(tokenAddress, account, setWalletValues);
    }
  }, [account]);

  return (
    <div>
      <TableContainer>
        {
          account != null &&
          <div className={classes.title}>
            <a target="_blank" className={'textBlue'} href={`https://bscscan.com/token/${tokenAddress}?a=${account}`}>BSCScan wallet tx</a>
          </div>
        }
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.th1}>Tokens</StyledTableCell>
              <StyledTableCell className={classes.th2}>Price</StyledTableCell>
              <StyledTableCell className={classes.th2}>Current value</StyledTableCell>
              <StyledTableCell className={classes.th2}>Date/Time</StyledTableCell>
              <StyledTableCell className={classes.th2}>Tx</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {walletData != null &&
              walletData.map((row, index) => (
                <StyledTableRow key={index} className={classes.row}>
                  <StyledTableCell className={classes.th1}
                    component="th"
                    scope="row"
                  >
                    {row.tokens}
                  </StyledTableCell>
                  <StyledTableCell className={classes.th1}>
                    ${(row.price).toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell className={classes.th1}>
                    {row.currentValue}
                  </StyledTableCell>
                  <StyledTableCell className={classes.th1}>
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell className={classes.th1}>
                    {row.tx}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <CircularProgress size={20} className={classes.CircularProgress} />
      )}
    </div>
  );
}
