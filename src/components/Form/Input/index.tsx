import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';

export function Input({ name, ...props }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input ref={inputRef} {...props} />
      {error && <span style={{ color: 'var(--red-500)' }}>{error}</span>}
    </>
  );
}
