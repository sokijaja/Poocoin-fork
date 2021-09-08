import React, { Component, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { vettedValues } from '../../PooCoin/index.js';
import { CircularProgress } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderColor: '#262626',
    cursor: 'pointer'
  },
  body: {
    fontSize: 12,
    padding: 0,
    paddingLeft: 10,
    color: '#fff',
    backgroundColor: '#303030',
    borderColor: '#262626'
  },
}))(TableCell);

function VettedTable(props) {
  const values = props.values;
  const classes = props.styleName;

  return (
    values.map((item, index) =>
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row" onClick={() => props.onSymbol(item.address, item.name)} className={classes.symbol}>
          <span className={classes.firstName}>{item.name}</span> <span className={classes.priceValue}>${item.amount.toFixed(4)}</span>
          <div className={classes.otherName}>{item.name}</div>
        </StyledTableCell>
        <StyledTableCell>{item.amount.toFixed(2)}<div className={classes.priceValue}>${item.amount.toFixed(2)}</div></StyledTableCell>
        <StyledTableCell><StarOutlineIcon /></StyledTableCell>
      </StyledTableRow>
    )
  );
}

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 100,
    fontSize: '0.875rem',
    padding: '10px !important',
    color: '#fff'
  },
  tableTh: {
    padding: 0,
    fontSize: '0.8125rem',
    paddingLeft: 10,
    backgroundColor: '#262626'
  },
  priceValue: {
    color: '#28a745'
  },
  firstName: {
    textTransform: 'uppercase',
    fontSize: 13
  },
  otherName: {
    fontSize: 12,
    color: '#ADB5BD'
  },
  CircularProgress: {
    color: "#b2b5be",
    marginTop: '20px'
  },
});

export default function CustomizedTables(props) {
  const [vettedData, setVettedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const setVettedValues = (data) => {
    if (data.length == 0) {
      setLoading(true)
    } else {
      setLoading(false)
      setVettedData(data);
    }
  }

  // const selectSymbol = (symbol) => {
  //   setSelectSymbol(symbol);
  // }

  useEffect(() => {
    vettedValues(setVettedValues);
  }, []);

  const classes = useStyles();

  return (
    <div>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableTh}>Tokens</StyledTableCell>
              <StyledTableCell className={classes.tableTh}>Balance</StyledTableCell>
              <StyledTableCell className={classes.tableTh}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <VettedTable values={vettedData} styleName={classes} onSymbol={props.onSymbol} />
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <CircularProgress size={20} className={classes.CircularProgress} />
      )}
    </div>
  );
}