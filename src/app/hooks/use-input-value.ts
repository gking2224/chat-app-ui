import * as React from 'react';

export default (initialValue: string): [string, (e: React.ChangeEvent<HTMLInputElement> | '') => void] => {
  const [value, setValue] = React.useState<string>(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement> | '') => {
    setValue(e == '' ? e : e.target.value);
  }
  return [value, onChange];
}
