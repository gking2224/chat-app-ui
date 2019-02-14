import * as React from 'react';

interface NewMessageProps {
  readonly onAddNewMessage: (message: string) => void;
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
      <h3>Post Message</h3>
      <div>
        <input value={value} onChange={onChange} />
      </div>
      <button type='button' onClick={submitNewMessage}>Submit</button>
    </div>
  );
};
