import './Field.scss';
import React from 'react';

type FieldP = {
  label: string;
  children: React.ReactNode;
  error?: string;
};

export const Field: React.FC<FieldP> = ({ label, children, error }) => {
  return (
    <div className={'field' + (error ? ' field_error' : '')}>
      <label className={'field__label'}>{label}</label>
      {children}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

const ErrorMessage = ({ message }: { message: string }) => {
  return <div className={'error'}>{message}</div>;
};
