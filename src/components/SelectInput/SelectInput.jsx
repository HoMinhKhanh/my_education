import React from 'react';

const SelectInput = (props) => {
  const { placeholder, options, value, onChange } = props;

  const handleSelectChange = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <select value={value} onChange={(e) => handleSelectChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;