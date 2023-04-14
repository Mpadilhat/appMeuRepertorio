import React from 'react';
import * as s from './styledColumnWithLabel';

const ColumnWithLabel = ({label, children, width, marginBottom}) => (
  <s.Column width={width} marginBottom={marginBottom}>
    <s.TextLabel>{label}</s.TextLabel>
    {children}
  </s.Column>
);

export default ColumnWithLabel;
