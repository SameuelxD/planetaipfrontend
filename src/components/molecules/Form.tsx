import React, { useState } from 'react';
import Button from '../atoms/Button';

const Form: React.FC = () => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    alert(`Submitted: ${input}`);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleSubmit} label="Submit" />
    </div>
  );
};

export default Form;
