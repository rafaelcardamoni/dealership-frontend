import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export function Textarea({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: ref => {
        return ref.value;
      },
      clearValue: ref => {
        ref.value = null;
      }
    });
  }, [fieldName, registerField]);

  const props = {
    ...rest,
    ref: inputRef,
    id: fieldName,
    defaultValue
  };

  return (
    <>
      <textarea {...props} />

      {error && (
        <span
          style={{
            color: 'var(--red-500)',
            marginBottom: '-1.5rem'
          }}
        >
          {error}
        </span>
      )}
    </>
  );
}
