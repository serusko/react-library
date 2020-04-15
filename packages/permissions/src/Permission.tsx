import React, { FC, memo, ReactNode } from 'react';

import { usePermission } from '.';

interface Props {
  fallback: ReactNode;
  q: string;
}

const Permission: FC<Props> = memo(({ q, fallback, children }) => {
  const can = usePermission(q);

  return can ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <React.Fragment>{fallback || null}</React.Fragment>
  );
});

export default Permission;
