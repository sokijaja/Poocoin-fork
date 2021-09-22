import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from 'react-redux';
import { getTransactionList } from "../../../PooCoin";
import { CircularProgress } from "@material-ui/core";
import { Modal } from "@material-ui/core";

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
  },
  tokenInfosell: {
    color: "#dc3545!important",
    textAlign: "right",
    padding: '5px',
    fontSize: '13px'
  },
  tokenInfobuy: {
    color: "#28a745 !important",
    textAlign: "right",
    padding: '5px',
    fontSize: '13px'
  },
  txValue: {
    color: "#3eb8ff !important",
    padding: '5px',
  },
  tableBody: {
    maxHeight: 300,
    overflow: "auto",
  },
  th: {
    textAlign: "right",
    padding: '5px',
  },
  CircularProgress: {
    color: "#b2b5be",
    marginTop: '20px',
  },
  link: {
    color: '#3eb8ff',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  modalLeft: {
    textAlign: 'left',
    color: '#3eb8ff !important',
    cursor: 'pointer',
  },
  modalRight: {
    textAlign: 'right',
    cursor: 'pointer',
    color: '#3eb8ff !important'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#262626',
  },
  paper: {
    backgroundColor: 'white',
    border: 'none',
    padding: '40px 30px 30px 30px',
    display: 'grid',
    borderRadius: '8px',
    textAlign: 'center',
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const tokenAddress = useSelector((state) => state.tokenAddress)
  const [transactionLists, setTransactionLists] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setModalOpen] = useState(false);

  const modalClose = () => {
    setModalOpen(false);
  };

  const modalOpen = () => {
    setModalOpen(true);
  }

  const setTransactionData = (data) => {
    if (data.length === 0) {
      setLoading(true)
    } else {
      setLoading(false)
      setTransactionLists(data)
    }
  }

  useEffect(() => {
    getTransactionList(tokenAddress, setTransactionData);
  }, [tokenAddress])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell className={classes.th}>State</StyledTableCell> */}
              <StyledTableCell className={classes.th}>Tokens</StyledTableCell>
              {/* <StyledTableCell className={classes.th}>TokenName</StyledTableCell> */}
              <StyledTableCell className={classes.th}>Price</StyledTableCell>
              <StyledTableCell className={classes.th}>
                Price / Token
              </StyledTableCell>
              <StyledTableCell className={classes.th}>Time</StyledTableCell>
              <StyledTableCell>Tx</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {transactionLists != undefined &&
              transactionLists.map((transactionList, index) => (
                <StyledTableRow key={index} className={classes.row}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={transactionList.status === "buy" ? classes.tokenInfosell : classes.tokenInfobuy}
                  >
                    {transactionList.tokenNum}
                    <div>{transactionList.tokenSymbol}</div>
                  </StyledTableCell>
                  <StyledTableCell className={transactionList.status === "buy" ? classes.tokenInfosell : classes.tokenInfobuy}>
                    ${transactionList.coinPrice}
                    <div>{transactionList.coinNum + transactionList.coinSymbol}</div>
                  </StyledTableCell>
                  <StyledTableCell className={transactionList.status === "buy" ? classes.tokenInfosell : classes.tokenInfobuy}>
                    ${props.tokenPrice}
                    <div>{transactionList.exchangeName}</div>
                  </StyledTableCell>
                  <StyledTableCell className={transactionList.status === "buy" ? classes.tokenInfosell : classes.tokenInfobuy}>
                    {transactionList.transactionTime}
                    <div className={classes.tokenInfo}>{transactionList.AMPM}</div>
                  </StyledTableCell>
                  <StyledTableCell className={classes.txValue}>
                    <a className={classes.link} target="_blank" href={`https://bscscan.com/tx/${transactionList.txHash}`}>{(transactionList.txHash).substring(0, 6)}</a>
                    <div className={classes.link} onClick={() => modalOpen()}>Track</div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <CircularProgress size={20} className={classes.CircularProgress} />
      )}
      <Modal
        className={classes.modal}
        open={open}
        onClose={modalClose}
      >
        <div className={classes.paper}>
          <h1>Premium required</h1>
          <p>This features requires premium tier 1.</p>
          <p>Unlock this premium tier by holding $100 worth of <a className={'textBlue fs3'} target="_blank" href="https://pancakeswap.finance/swap#/add/ETH/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619">POOCOIN/BNB LP</a></p>
          <p>(approximately Infinity POOCOIN/BNB LP created from Infinity <a className={'textBlue fs3'} target="_blank" href="polygon/swap?outputCurrency=0xB27ADAfFB9fEa1801459a1a81B17218288c097cc">POOCOIN</a> and Infinity BNB)
            tokens in your wallet.</p>
        </div>
      </Modal>
    </div>
  );
}
