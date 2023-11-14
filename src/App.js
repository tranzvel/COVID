import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    temperature: '',
    isSick: null,
    isAroundCovid: null
  });

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked ? value : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to the backend to submit the form data
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Health Declaration Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="temperature">Temperature:</label>
        <input
          type="number"
          id="temperature"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          required
        />

        <label>
          <div>
        Do you have any of the following symptoms now or within the last 14 days:  Cough, smell/test impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea, runny nose(even if your symptoms are mild)?
         </div> 
         <div>
         <input
            type="checkbox"
            name="isSick"
            value="yes"
            checked={formData.isSick === 'yes'}
            onChange={handleChange}
          />
          Yes
          <input
            type="checkbox"
            name="isSick"
            value="no"
            checked={formData.isSick === 'no'}
            onChange={handleChange}
          />
          No
          </div> 
        </label>

        
        <label>
          <div>
        Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?
       </div>
          <div>
          <input
            type="checkbox"
            name="isAroundCovid"
            value="yes"
            checked={formData.isAroundCovid === 'yes'}
            onChange={handleChange}
          />
          <label htmlFor="isSick">Yes</label>
          
          <input
            type="checkbox"
            name="isAroundCovid"
            value="no"
            checked={formData.isAroundCovid === 'no'}
            onChange={handleChange}
          />
          No
          </div>
        </label>
        

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
