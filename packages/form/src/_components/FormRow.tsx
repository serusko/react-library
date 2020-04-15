import React, { FC } from 'react';
import Grid, { GridItemsAlignment, GridJustification } from '@material-ui/core/Grid';

import memo from '_helpers/memo';

interface Props {
  alignItems?: GridItemsAlignment;
  justify?: GridJustification;
  className?: string;
}

const FormRow: FC<Props> = props => {
  const { children, justify, alignItems, ...rest } = props;

  return (
    <Grid
      {...rest}
      alignItems={alignItems ? alignItems : ('flex-start' as const)}
      justify={justify ? justify : 'flex-start'}
      spacing={1}
      container
    >
      {children}
    </Grid>
  );
};

export default memo(FormRow);
