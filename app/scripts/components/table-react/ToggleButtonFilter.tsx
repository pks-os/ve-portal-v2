import * as React from 'react';
import * as ToggleButton from 'react-bootstrap/lib/ToggleButton';
import * as ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';

interface FilterChoice {
  label: React.ReactNode;
  value: string;
}

interface ToogleButtonFilterProps extends React.HTMLProps<any> {
  defaultValue?: string | string[];
  choices: FilterChoice[];
}

export const ToogleButtonFilter = (props: ToogleButtonFilterProps) => (
  <ToggleButtonGroup
    type="checkbox"
    defaultValue={props.defaultValue}
    value={props.value}
    onChange={props.onChange}
  >
    {props.choices.map((choice, index) => (
      <ToggleButton key={index} value={choice.value}>{choice.label}</ToggleButton>
    ))}
  </ToggleButtonGroup>
);
