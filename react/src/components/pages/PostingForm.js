// import React from 'react';
import React, { useState } from 'react';
import './RegisterInfo.css';

const DateInput = ({ name, id }) => {
    const [date, setDate] = useState('');
    const handleDateChange = (event) => {
      let inputDate = event.target.value;
      inputDate = inputDate.replace(/\D/g, '');
      if (inputDate.length <= 2) {
        setDate(inputDate);
      } else if (inputDate.length <= 4) {
        setDate(`${inputDate.slice(0, 2)}/${inputDate.slice(2)}`);
      } else {
        setDate(`${inputDate.slice(0, 2)}/${inputDate.slice(2, 4)}/${inputDate.slice(4, 8)}`);
      }
    };
    return (
      <input
        type="text"
        placeholder="--/--/----"
        value={date}
        onChange={handleDateChange}
        name={name}
        id={id}
        className="input-box"
        required
      />
    );
  }

  const AgeRangeInput = () => {
    const [startAge, setStartAge] = useState('');
    const [endAge, setEndAge] = useState('');
  
    const handleStartAgeChange = (event) => {
      // Ensure only numbers are entered, and limit the input to 3 digits
      setStartAge(event.target.value.replace(/\D/g, '').slice(0, 3));
    };
  
    const handleEndAgeChange = (event) => {
      // Ensure only numbers are entered, and limit the input to 3 digits
      setEndAge(event.target.value.replace(/\D/g, '').slice(0, 3));
    };
  
    return (
      <div>
        <input
          type="text"
          value={startAge}
          onChange={handleStartAgeChange}
          style={{ width: '50px', marginRight: '10px' }}
        />
        <span>to</span>
        <input
          type="text"
          value={endAge}
          onChange={handleEndAgeChange}
          style={{ width: '50px', marginLeft: '10px' }}
        />
      </div>
    );
  };

const AllAgesCheckbox = () => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          All Ages
        </label>
      </div>
    );
  };


  const SexCheckboxList = () => {
    const [selectedSex, setSelectedSex] = useState([]);
  
    const handleCheckboxChange = (sex) => {
      if (selectedSex.includes(sex)) {
        setSelectedSex(selectedSex.filter(item => item !== sex));
      } else {
        setSelectedSex([...selectedSex, sex]);
      }
    };
  
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedSex.includes('Female')}
            onChange={() => handleCheckboxChange('Female')}
          />
          Female
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedSex.includes('Male')}
            onChange={() => handleCheckboxChange('Male')}
          />
          Male
        </label>
      </div>
    );
  };
  

const Posting = () => {
    const checkIconStyle = {
        fontSize: '36px',
      };
    
    return (
        <div className="register-container">
            <h1>Create a Study Posting</h1> 
            <p>Study Detials and Information</p>
            <form action="/post-form" method="POST">
                <div class="form-container">
                    <div class="form-group">
                        <label class="label">Informal Study Title:</label>
                        <p>Example: Allergic Disease Onset Prevention Study</p> 
                        <input required class="input-box" name="informal_title" type="text" id="informal_title"></input>
                    </div>
                    <div class="form-group">
                        <label class="label">Location(s):</label>
                        <input required class="input-box" name="locations" type="text" id="locations"></input>
                    </div>
                    <div class="form-group">
                        {/* TODO: FORMAT THIS, SMOL BOXS SIDE BY SIDE */}
                        <label class="label">Timeline:</label>  
                        <DateInput name="start_date" id="start_date"/>
                        <DateInput name="end_date" id="end_date" />
                    </div>
                    <div class="form-group">
                         {/* TODO: FORMAT THIS, LARGE BOX */}
                        <label class="label">Study Description:</label>
                        <input required class="input-box" name="description" type="text" id="description"></input>
                    </div>
                    <div class="form-group">
                        <label class="label">Official Paper Title:</label>
                        <input required class="input-box" name="official_title" type="text" id="official_title"></input>
                    </div>
                </div>
                <p>Participant Eligibility</p>
                <i class="fa fa-check-square-o" style={checkIconStyle}></i>
                Participant can join if...
                <p>basic info</p>
                <div class="form-container">
                    <div class="form-group">
                        <label class="label">Age Group:</label>
                        <AgeRangeInput />
                        <AllAgesCheckbox />
                    </div>
                    <div className="form-group">
                        <label className="label">Sex:</label>
                        <SexCheckboxList />
                    </div>
                </div>
                <p>additional conditions</p>
                <input type="submit" value="Post" id="sendToServerButton"></input>
                {/* TODO: if TIME, create a review page to view what the participant would see */}
            </form>

        </div>
    )

}

export default Posting;