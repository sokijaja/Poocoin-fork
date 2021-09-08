import TradingViewWidget, { Themes } from './chart_component';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
    boxShadow: 'inherit',
  },
  TradingView: {
    height: '275px'
  }
});
export default function Chart() {
  const classes = useStyles();
  return (
    <div id="root" className={classes.TradingView}>
      <TradingViewWidget
        symbol="NASDAQ:AAPL"
        theme={Themes.DARK}
        locale="en"
        autosize
      />
    </div>
  );
}