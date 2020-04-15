import React, { FC, ReactNode } from 'react';
import { Typography } from '@material-ui/core';

import { IconTooltip } from '_components';
import memo from '_helpers/memo';

export interface FormSectionProps {
  subLvl3TooltipContent?: string | ReactNode;
  subTooltipContent?: string | ReactNode;
  tooltipContent?: string | ReactNode;
  subtitleLevel3?: string;
  children?: ReactNode;
  subtitle?: string;
  className?: any;
  title?: string;
}

const FormSection: FC<FormSectionProps> = ({
  subLvl3TooltipContent,
  subTooltipContent,
  subtitleLevel3,
  tooltipContent,
  subtitle,
  children,
  title,
  ...rest
}) => {
  const icon = tooltipContent && <IconTooltip name="info1" tooltipContent={tooltipContent} />;
  const subIcon = subTooltipContent && (
    <IconTooltip name="info1" tooltipContent={subTooltipContent} />
  );
  const subLvl3Icon = subLvl3TooltipContent && (
    <IconTooltip name="info1" tooltipContent={subLvl3TooltipContent} />
  );

  return (
    <div {...rest}>
      {title && (
        <Typography variant="h2">
          {title} {icon && icon}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="h3">
          {subtitle} {subIcon && subIcon}
        </Typography>
      )}
      {subtitleLevel3 && (
        <Typography variant="h4">
          {subtitleLevel3} {subLvl3Icon && subLvl3Icon}
        </Typography>
      )}
      {children}
    </div>
  );
};

export default memo(FormSection);
