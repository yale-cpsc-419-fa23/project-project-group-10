// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../RegisterInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DateTimePicker from 'react-datetime-picker';
// import Dropdown from 'react-bootstrap/Dropdown';


function Posting() {  
    const [token, setToken] = useState('');
  
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [start_date, setStartdate] = useState('');
    const [end_date, setEnddate] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [department, setDepartment] = useState('');
    const [compensation, setCompensation] = useState('');
    const [age_min, setAgeMin] = useState('');
    const [age_max, setAgeMax] = useState('');
    const [smoke, setSmoking] = useState('');
    const [sex1, setSex] = useState('');
    const [drink, setDrinking] = useState('');
    const [disease, setDisease] = useState('');
    const [race1, setRace] = useState('');
    const [sex, setSelectedSex] = useState([]);
    const [race, setSelectedRace] = useState([]);
    const [dateTimeInputs, setDateTimeInputs] = useState([]);

    useEffect(() => {
      // Retrieve token from local storage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);

    const SexCheckboxList = () => {
      const handleCheckboxChange = (sex1) => {
        if (sex.includes(sex1)) {
          setSelectedSex(sex.filter(item => item !== sex1));
        } else {
          setSelectedSex([...sex, sex1]);
        }
      };
    
      return (
        <div>
          <label>
            <input
              type="checkbox"
              checked={sex.includes('Female')}
              onChange={() => handleCheckboxChange('Female')}
            />
               Female     
          </label>
  
          <div style={{ mmarginRight: '10px' }}></div>
  
          <label>
            <input
              type="checkbox"
              checked={sex.includes('Male')}
              onChange={() => handleCheckboxChange('Male')}
            />
               Male
          </label>
        </div>
      );
    };

    const RaceCheckboxList = () => {
      const handleCheckboxChange = (race1) => {
        if (race.includes(race1)) {
          setSelectedRace(race.filter(item => item !== race1));
        } else {
          setSelectedRace([...race, race1]);
        }
      };
    
      return (
        <div>
          <label for="black">
                <input type="checkbox" id="black" name="black" value="black" 
                onChange={() => handleCheckboxChange('Black or African American')}/>
                Black or African American
            </label>
            <br></br>

            <label for="asian">
                <input type="checkbox" id="asian" name="asian" value="asian"
                onChange={() => handleCheckboxChange('Asian')}/>
                Asian
            </label>
            <br></br>


            <label for="white">
                <input type="checkbox" id="white" name="white" value="white"
                onChange={() => handleCheckboxChange('White')}/>
                White
            </label>
            <br></br>

            <label for="native">
                <input type="checkbox" id="native" name="native" value="native"
                onChange={() => handleCheckboxChange('American Indian or Alaskan Native')}/>
                American Indian or Alaskan Native
            </label>
            <br></br>

            <label for="islander">
                <input type="checkbox" id="islander" name="islander" value="islander"
                onChange={() => handleCheckboxChange('Native Hawaiian or Other Pacific Islander')}/>
                Native Hawaiian or Other Pacific Islander 
            </label>
            
            <br></br>         
        </div>
      );
    };
    const navigate = useNavigate();

    const DateTimeInput = () => {
      const [dateTimeInputs, setDateTimeInputs] = useState([{ date: '', time: '', ampm: 'AM' }]);
    
      const handleAddInput = () => {
        setDateTimeInputs([...dateTimeInputs, { date: '', time: '', ampm: 'AM' }]);
      };
    
      const handleInputChange = (index, field, value) => {
        const newInputs = [...dateTimeInputs];
    
        if (field === 'date') {
          // Remove non-numeric characters
          const numericValue = value.replace(/\D/g, '');
    
          // Format the date as MM/DD/YYYY as the user types
          if (numericValue.length <= 2) {
            newInputs[index][field] = numericValue;
          } else if (numericValue.length <= 4) {
            newInputs[index][field] = numericValue.slice(0, 2) + '/' + numericValue.slice(2);
          } else {
            newInputs[index][field] = numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4) + '/' + numericValue.slice(4, 8);
          }
        } else if (field === 'time') {
          // Remove non-numeric characters
          const numericValue = value.replace(/\D/g, '');
    
          // Format the time as --:-- as the user types
          if (numericValue.length <= 2) {
            newInputs[index][field] = numericValue;
          } else {
            newInputs[index][field] = numericValue.slice(0, 2) + ':' + numericValue.slice(2);
          }
        } else {
          // For other fields (ampm), directly update the value
          newInputs[index][field] = value;
        }
    
        setDateTimeInputs(newInputs);
      };
    
      return (
        <div>
          {dateTimeInputs.map((input, index) => (
            <div key={index}>
              <lable>Date: </lable>
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                value={input.date}
                maxLength="10"
                onChange={(e) => handleInputChange(index, 'date', e.target.value)}
              />
              <span> </span>
              <label>Time: </label>
              <input
                type="text"
                placeholder="--:--"
                value={input.time}
                maxLength="5"
                onChange={(e) => handleInputChange(index, 'time', e.target.value)}
              />
              <select
                value={input.ampm}
                onChange={(e) => handleInputChange(index, 'ampm', e.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              {index === dateTimeInputs.length - 1 && (
                <button onClick={handleAddInput}>+</button>
              )}
            </div>
          ))}
        </div>
      );
    };

    const PostStudy = () => {      
      axios.post('http://127.0.0.1:5000/researchertrial', {
      title: title,
      location: location,
      description: description,
      duration: duration,
      sex: sex,
      smoke: smoke,
      drink: drink,
      race: race,
      age_min: age_min,
      age_max: age_max,
      department: department,
      compensation: compensation,
      disease: disease,
      dateTimeInputs: dateTimeInputs


    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request header
      },
    })
    .then(function (response) {
      console.log(response);
      navigate("/researcher-homepage");
    })
    .catch(function (error) {
      console.log(error, 'error');
      if (error.response && error.response.status === 401) {
        alert("another error");
      }
    });
    }


  return (
        <div class="buffer">
        <div className="register-container">
            <h1>Create a Study Posting</h1>
            <p>Study Details and Information</p>
            <form>
                <div class="form-container">
                    <div class="form-group">
                        <label class="label" for="title" >Study Title:</label>
                        {/* <p>Example: Allergic Disease Onset Prevention Study</p>  */}
                        <input required class="input-box" 
                        name="title" 
                        type="text" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div class="form-group">
                        <label class="label" for="department" >Department:</label>
                        {/* <p>Example: Allergic Disease Onset Prevention Study</p>  */}
                        <input required class="input-box" 
                        name="department" 
                        type="text" 
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        ></input>
                    </div>
                    <div class="form-group">
                        <label class="label" for="location">Location(s):</label>
                        <input required class="input-box" 
                        name="locations" 
                        type="text" 
                        id="locations"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}></input>
                    </div>
                    <div class="form-group">
                         {/* TODO: FORMAT THIS, LARGE BOX */}
                        <label class="label" for="description" >Study Description:</label>
                        <input required class="input-box" 
                        name="description" 
                        type="text" 
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></input>
                    </div>
                    <div class="form-group">
                        <label class="label" for="duration">Study Trial Duration (min):</label>
                        <input required class="input-box" 
                        name="duration" 
                        type="text" 
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}></input>
                    </div>
                    <div class="form-group">
                        <label class="label" for="compensation">Study Compensation:</label>
                        <input required class="input-box" 
                        name="compensation" 
                        type="text" 
                        id="compensation"
                        value={compensation}
                        onChange={(e) => setCompensation(e.target.value)}></input>
                    </div>
                </div>
                <h1>Participant Demographics</h1>
                {/* <i class="fa fa-check-square-o" style={checkIconStyle}></i> */}
                <div className="form-group">
                    <label className="label">Sex (all that apply):</label>
                    <SexCheckboxList value={sex1}/>
                </div>
                <div class="form-group">
                <label className="label" htmlFor="smoke" for="smoke">Is smoking history relevant to your study?</label>
                <select name="smoke" id="smoke" value={smoke} onChange={(e) => setSmoking(e.target.value)}>
                  <option value="" disabled>Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                </div>
                <div class="form-group">
                <label className="label" htmlFor="drink" for="drink">Is drinking history relevant to your study?</label>
                <select name="drink" id="drink" value={drink} onChange={(e) => setDrinking(e.target.value)}>
                  <option value="" disabled>Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                </div>
                <div class="form-group">
                <label className="label" htmlFor="disease" for="disease">Is a medical history relevant to your study?</label>
                <select name="disease" id="disease" value={disease} onChange={(e) => setDisease(e.target.value)}>
                  <option value="" disabled>Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                </div>
            <div class="form-group">
                        {/* TODO: FORMAT THIS, SMOL BOXS SIDE BY SIDE */}
                        <label class="label">Age Range:</label>  
                        <input name="Age Minimum" 
                        for="age_min" 
                        id="age_min"
                        placeholder="Minimum Age"
                        value={age_min}
                        onChange={(e) => setAgeMin(e.target.value)}/>

                        <input name="Age Maximum" 
                        for="age_max" 
                        id="age_max" 
                        placeholder="Maximum Age"
                        value={age_max}
                        onChange={(e) => setAgeMax(e.target.value)}/>
                    </div>
            <div class="form-group"> 
            <label class="label">Race (all that apply):</label> 
            <RaceCheckboxList value={race1}/>      
            </div>
            <div class="form-group"> 
            <h3 style={{paddingBottom: '10px'}}>Schedule Availablity:</h3> 
            <DateTimeInput />
            </div>

            <div class="small_buff"></div>
            <button type="button" className="custom-primary" onClick={PostStudy} >Create Posting</button>
                {/* TODO: if TIME, create a review page to view what the participant would see */}
                </form>
            </div>
            
        </div>
    );
  }

export default Posting;