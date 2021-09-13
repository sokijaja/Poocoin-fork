/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Grid from '@material-ui/core/Grid';
import Basechart from '../basic/chart';
// import Searchinput from '../basic/searchinput';
import Button from '@material-ui/core/Button';

export default function About(props) {
  return (
    <div>
      <Grid container item>
        <Grid item xs={12}>
          <Basechart tokenName={props.tokenName} />
        </Grid>
      </Grid>
    </div>
  );
}