import React, { useState } from 'react';
import SelectInput from './SelectInput';

const App = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (selectedValue) => {
    setSelectedOption(selectedValue);
  };

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <div>
      <h1>Select Example</h1>
      <SelectInput
        placeholder="Select an option"
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
      />
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default App;