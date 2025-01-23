import React, { useState } from "react";

const CheckboxGroup = () => {
  // Array to represent individual checkboxes
  const checkboxes = ["Option 1", "Option 2", "Option 3", "Option 4"];
  
  // State to track which checkboxes are selected
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // Handler for the master checkbox
  const handleMasterCheckboxChange = (event) => {
    if (event.target.checked) {
      // Select all checkboxes if the master checkbox is checked
      setSelectedCheckboxes(checkboxes);
    } else {
      // Deselect all checkboxes if the master checkbox is unchecked
      setSelectedCheckboxes([]);
    }
  };

  // Handler for individual checkboxes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedCheckboxes((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value) // Deselect if already selected
        : [...prevState, value] // Select the checkbox
    );
  };

  // Check if all checkboxes are selected
  const isAllSelected = checkboxes.length === selectedCheckboxes.length;

  return (
    <div>
      {/* Master checkbox to select/deselect all */}
      <input
        type="checkbox"
        checked={isAllSelected}
        onChange={handleMasterCheckboxChange}
      />
      <label>Select All</label>
      
      <div>
        {/* Render individual checkboxes */}
        {checkboxes.map((checkbox) => (
          <div key={checkbox}>
            <input
              type="checkbox"
              value={checkbox}
              checked={selectedCheckboxes.includes(checkbox)}
              onChange={handleCheckboxChange}
            />
            <label>{checkbox}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;