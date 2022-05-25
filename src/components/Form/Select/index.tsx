import React, { useRef, useEffect } from 'react';
import ReactSelect, { Props as SelectProps } from 'react-select';

import { useField } from '@unform/core';
interface Props extends SelectProps {
  name: string;
}

export default function Select({ name, ...rest }: Props) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        return ref?.state?.ariaSelection?.value?.value;
      },
      setValue: (ref: any, value) => {
        return ref?.state?.ariaSelection?.value?.value;
      }
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: 'var(--gray-200)',
          primary: 'var(--gray-800)'
        }
      })}
    />
  );
}
