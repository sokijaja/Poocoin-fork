import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#262626',
    color: theme.palette.common.white,
    // padding: '0 0 0 10px',
    borderColor: '#262626',
    padding: 0
  },
  body: {
    fontSize: 12,
    lineHeight: 1.43,
    // padding: 0,
    // paddingLeft: 10,
    color: '#fff',
    borderColor: '#262626',
    maxHeight: 300,
    overflow: 'auto',
    padding: 0,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#141414',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#141722',
    },
  },
}))(TableRow);

function createData(tokens, tokenName, price, tokenAmount, rate, pcv2, time, timeZone, tx, txName) {
  return { tokens, tokenName, price, tokenAmount, rate, pcv2, time, timeZone, tx, txName };
}

const rows = [
  createData('0.5855', 'POOCOIN', '$1.5', '0.0042 BNB', '$2.57', 'Pc v2' , '3:24:08', 'PM', '0x49', 'Track'),
  createData('0.5855', 'POOCOIN', '$1.5', '0.0042 BNB', '$2.57', 'Pc v2' , '3:24:08', 'PM', '0x49', 'Track'),
  createData('0.5855', 'POOCOIN', '$1.5', '0.0042 BNB', '$2.57', 'Pc v2' , '3:24:08', 'PM', '0x49', 'Track'),
  createData('0.5855', 'POOCOIN', '$1.5', '0.0042 BNB', '$2.57', 'Pc v2' , '3:24:08', 'PM', '0x49', 'Track'),
  createData('0.5855', 'POOCOIN', '$1.5', '0.0042 BNB', '$2.57', 'Pc v2' , '3:24:08', 'PM', '0x49', 'Track'),
  createData('0.5855', 'POOCOIN', '$1.5', '0.0042 BNB', '$2.57', 'Pc v2' , '3:24:08', 'PM', '0x49', 'Track'),
  createData('0.5855', 'POOCOIN', '$1.5', '0.0042 BNB', '$2.57', 'Pc v2' , '3:24:08', 'PM', '0x49', 'Track'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 100,
    maxHeight: 200,
    overflow: 'auto',
    float: 'right',
    fontSize: '14px !important',
    fontFamily: '"Lato",sans-serif',
    paddingTop: '0px'
  },
  row: {
    color: '#28a745 !important',
  },
  tokenName: {
    color: '#28a745 !important',
    textAlign: 'right'
  },
  txValue: {
    color: '#3eb8ff !important',
    paddingLeft: 10
  },
  tableBody: {
    maxHeight: 300,
    overflow: 'auto'
  },
  th: {
    textAlign: 'right'
  }
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.th}>Tokens</StyledTableCell>
            <StyledTableCell className={classes.th}>Price</StyledTableCell>
            <StyledTableCell className={classes.th}>Price / Token</StyledTableCell>
            <StyledTableCell className={classes.th}>Time</StyledTableCell>
            <StyledTableCell>Tx</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {rows.map((row) => (
            <StyledTableRow key={row.tokens} className={classes.row}>
              <StyledTableCell component="th" scope="row" className={classes.tokenName}>
                {row.tokens}

                <div >{row.tokenName}</div>
              </StyledTableCell>
              <StyledTableCell className={classes.tokenName}>{row.price}
              <div className={classes.tokenName}>{row.tokenAmount}</div>
              </StyledTableCell>
              <StyledTableCell className={classes.tokenName}>{row.rate}
              <div className={classes.tokenName}>{row.pcv2}</div>
              </StyledTableCell>
              <StyledTableCell className={classes.tokenName}>{row.time}
              <div className={classes.tokenName}>{row.timeZone}</div>
              </StyledTableCell>
              <StyledTableCell className={classes.txValue}>{row.tx}
              <div>{row.txName}</div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}