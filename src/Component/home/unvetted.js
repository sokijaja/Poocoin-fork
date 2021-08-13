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
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#262626',
    color: theme.palette.common.white,
    padding: '0 0 0 10px',
    borderColor: '#262626'
  },
  body: {
    fontSize: 12,
    lineHeight: 1.43,
    padding: 0,
    paddingLeft: 10,
    color: '#fff',
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

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('THOREUM', 159),
//   createData('ORFANO', 237),
//   createData('MOONSTAR', 262),
//   createData('GAVECOIN', 305),
//   createData('KABOSU', 335),
//   createData('FEED', 370),
//   createData('SHIELDNET', 399),
// ];

const rows = Array.from(Array(10).keys()).map(item => {
  return {
      name: "THOREUM",
      id: "0x580de58c1bd593a43dadcf0a739d504621817c05",
      calories: 159
    }
})

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tokens</StyledTableCell>
            <StyledTableCell>Balance</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id
                      ? <Link to={`/tokens/${row.id}`}>{row.name}</Link>
                      : row.name}
              </StyledTableCell>
              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell><StarOutlineIcon /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}