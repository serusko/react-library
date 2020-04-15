import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';

import memo from '_helpers/memo';

import useStyles from './useStyles';

interface Props {
  width?: number;
  ratio?: number;
  align?: string;
  className?: string;
}

const FormCol: FC<Props> = props => {
  const { children, width, ...rest } = props;

  const classes = useStyles({ width: width || 1 });

  return (
    <Grid item {...rest} classes={classes}>
      {children}
    </Grid>
  );
};

export default memo(FormCol);
