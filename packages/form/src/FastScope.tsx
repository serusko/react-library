import React, { FC } from 'react';

import { getIn } from './helpers';
import { FormStateContext } from './Form';

export const OptimizedFormContext: FC<{ watch: string }> = ({ watch, children }) => {
  const state = React.useContext(FormStateContext);

  const watched = getIn(state.values, watch);

  return React.useMemo(
    () => <FormStateContext.Provider value={state}>{children}</FormStateContext.Provider>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watched, children]
  );
};
