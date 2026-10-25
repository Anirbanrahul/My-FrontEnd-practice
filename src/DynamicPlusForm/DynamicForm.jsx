import { useState } from 'react';

function DynamicForm() {
  const [sections, setSections] = useState([0]); // Array of indices to track sections
  const [formData, setFormData] = useState({});

  const handleAddSection = () => {
    setSections([...sections, sections.length]);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [`item_${index}`]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Here you would typically send the form data to your server
  };

  return (
    <form onSubmit={handleSubmit}>
      {sections.map((index) => (
        <div key={index} className="formSection">
          <select
            name={`item_${index}`}
            value={formData[`item_${index}`] || ''}
            onChange={(event) => handleInputChange(event, index)}
          >
            <option value="">-- Select an Item --</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            {/* Add more options as needed */}
          </select>
          {index === sections.length - 1 && (
            <button type="button" className="addSectionBtn" onClick={handleAddSection}>
              +
            </button>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;