// import React from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../RegisterInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import Dropdown from 'react-bootstrap/Dropdown';

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

        <div style={{ mmarginRight: '10px' }}></div>

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
    // const checkIconStyle = {
        // fontSize: '36px',
      // };
    
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [startdate, setStartdate] = useState('');
    const [enddate, setEnddate] = useState('');
    const [description, setDescription] = useState('');
    const [officialTitle, setOfficialTitle] = useState('');
    const [keyword, setKeywords] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [smoking, setSmoking] = useState('');
    const [drinking, setDrinking] = useState('');
    const [additional, setAdditional] = useState('');
    const navigate = useNaviage();

    const PostStudy = () => {
      axios.post('http://127.0.0.1:5000/researcher-posting', {
      title: title,
      location: location,
      startdate: startdate,
      enddate: enddate,
      description: description,
      officialTitle: officialTitle,
      keyword: keyword
    })
    .then(function (response) {
      console.log(response);
      const userInfo = response.data.user_info; // Assuming the response has 'user_info'
        }
    
      

    return (
        <div class="buffer">
        <div className="register-container">
            <h1>Create a Study Posting</h1> 
            <p>Study Detials and Information</p>
            <form action="/post-form" method="POST">
                <div class="form-container">
                    <div class="form-group">
                        <label class="label">Study Title:</label>
                        {/* <p>Example: Allergic Disease Onset Prevention Study</p>  */}
                        <input required class="input-box" name="title" type="text" id="title"></input>
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
                <h1>Participant Eligibility</h1>
                {/* <i class="fa fa-check-square-o" style={checkIconStyle}></i> */}
                <p>Participant can join if...</p>
                <div class="form-container">
                    <div class="small_buff">
                    <div class="form-group">
                        <label class="label">Age Group:</label>
                        <AgeRangeInput />
                        <AllAgesCheckbox />
                    </div>
                    </div>

                    <div class="small-buff">
                    <div className="form-group">
                        <label className="label">Sex:</label>
                        <SexCheckboxList />
                    </div>
                    </div>
                </div>
                <p>additional conditions list</p>
                <div class="form-group">
                <label class="label">Is smoking relevant to your study</label>
                <select name="smoke">
                    <option disabled selected value="">Select</option>
                    <option value="male">Yes</option>
                    <option value="female">No</option>
                </select>
                </div>
                <div class="form-group">
                <label class="label">Is drinking relevant to your study</label>
                <select name="smoke">
                    <option disabled selected value="">Select</option>
                    <option value="male">Yes</option>
                    <option value="female">No</option>
                </select>
            </div>
            <div class="form-group">
            <label class="label">Key Words</label>
            <input class="input-box" name="keywords" type="text" id="keywords"></input>
            </div>
                <input type="submit" value="Post" id="sendToServerButton"></input>
                {/* TODO: if TIME, create a review page to view what the participant would see */}
            </form>
            </div>
            <div class="form-group">
            <label class="label">Other Requirements</label>
            <input class="input-box" name="other" type="text" id="other"></input>
            </div>
        </div>
    )
// drinnking, smoking, conditions, department, race
}

export default Posting;