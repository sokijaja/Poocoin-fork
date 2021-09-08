import React, { Component, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { GradeOutlined, Grade } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { unvettedValues } from '../../PooCoin/index.js';

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#262626',
    color: theme.palette.common.white,
    padding: '0 0 0 10px',
    textAlignLast: 'center',
    borderColor: '#262626'
  },
  body: {
    fontSize: 12,
    lineHeight: 1.43,
    padding: 0,
    paddingLeft: 10,
    color: '#fff',
    textAlignLast: 'center',
    backgroundColor: '#303030',
    borderColor: '#262626',
  },
}))(TableCell);

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
  },
});

function UnvettedTable(props) {
  const values = props.values;
  return (
    values.map((item, index) =>
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row">
          {/* <span>{item[1].split('/')[3]}</span> */}
          <Link to={`/tokens/${item[0]}`} className={'fs2'}>
            {item[1].split('/')[3]}&nbsp;
            <span className={'textSuccess'}>$0.0000</span>
            <br />
            <span className={'textMuted'}>{item[1].split('/')[3]}</span>
          </Link>
        </StyledTableCell>
        <StyledTableCell>
          <span>0.00</span>
          <br />
          <span className={'textSuccess'}>$0.00</span>
        </StyledTableCell>
        <StyledTableCell><GradeOutlined /></StyledTableCell>
      </StyledTableRow>
    )
  );
}

export default function CustomizedTables() {

  const [unvettedData, setUnvettedData] = useState([]);

  const setUnvettedValues = (data) => {
    setUnvettedData(data);
  }

  useEffect(() => {
    unvettedValues(setUnvettedValues);
  }, []);

  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tokens</StyledTableCell>
            <StyledTableCell>Balance</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <UnvettedTable values={unvettedData} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}