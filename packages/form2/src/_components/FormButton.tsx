import React, { FC, useContext } from 'react';

import { FormSettersContext } from '../Form';

type Props = {
  component: any;
  options?: any;
  name: string;

  [x: string]: any;
};

const FormButton: FC<Props> = ({ component, onClick, options, name, ...props }) => {
  const { handleClick } = useContext(FormSettersContext);
  const Button = component;
  return (
    <Button
      onClick={(e: any) => {
        const values = handleClick(name, options);
        onClick && onClick(values, e);
      }}
      {...props}
    />
  );
};

export default FormButton;
