import * as React from 'react';

interface NewMessageProps {
  onAddNewMessage: (message: string) => void;
}
export const NewMessage = (props: NewMessageProps) => {
  const [value, setValue] = React.useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const submitNewMessage = () => {
    props.onAddNewMessage(value);
    setValue('');
  };
  return (
    <div>
      <input value={value} onChange={onChange} />
      <button type="button" onClick={submitNewMessage}>Submit</button>
    </div>
  );
};
