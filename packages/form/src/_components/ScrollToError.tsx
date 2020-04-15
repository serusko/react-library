import React, { FC } from 'react';
import scroll from 'scroll-to-element';

import memo from '_helpers/memo';

// target vertical offset
const OFFSET = -20;
// animation duration
const DURATION = 350;

/**
 * Effect scrolling to first visible error
 */
const ScrollToError: FC = () => {
  // TODO: fix
  const { isValidating, isSubmitting, submitCount, isValid } = {
    isValidating: false,
    isSubmitting: false,
    submitCount: 0,
    isValid: true,
  }; //useForm();
  const count = React.useRef(0);
  const next = React.useRef(false);

  React.useEffect(() => {
    if (!isValidating && isSubmitting && count.current !== submitCount) {
      // detect state between validation and submit - onSubmit could be cancelled depending onf form state, but could be called
      next.current = true;
    } else if (next.current && !isValidating && !isSubmitting && !isValid) {
      // we are already submitted and we have some errors
      const node = document.querySelector('.MuiInputBase-root.Mui-error');
      next.current = false;
      if (node) {
        scroll(node, { ease: 'inOutQuad', duration: DURATION, offset: OFFSET });
      }
    }
    if (!isSubmitting) {
      count.current = submitCount;
    }
  }, [isValidating, isSubmitting, submitCount, isValid]);

  return null;
};

export default memo(ScrollToError);
