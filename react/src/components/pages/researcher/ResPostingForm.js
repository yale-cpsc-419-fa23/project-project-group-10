// import React from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../RegisterInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import Dropdown from 'react-bootstrap/Dropdown';


function Posting() {    
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
                <input type="checkbox" id="black" name="black" value="black"/>
                Black or African American
            </label>
            <br></br>

            <label for="asian">
                <input type="checkbox" id="asian" name="asian" value="asian"/>
                Asian
            </label>
            <br></br>


            <label for="white">
                <input type="checkbox" id="white" name="white" value="white"/>
                White
            </label>
            <br></br>

            <label for="native">
                <input type="checkbox" id="native" name="native" value="native"/>
                American Indian or Alaskan Native
            </label>
            <br></br>

            <label for="islander">
                <input type="checkbox" id="islander" name="islander" value="islander"/>
                Native Hawaiian or Other Pacific Islander 
            </label>
            
            <br></br>         
        </div>
      );
    };
    const navigate = useNavigate();

    const PostStudy = () => {
      axios.post('http://127.0.0.1:5000/researchertrial', {
      title: title,
      location: location,
      // start_date: start_date,
      // end_date: end_date,
      description: description,
      duration: duration,
      department: department,
      sex: sex,
      smoke: smoke, 
      drink: drink, 
      race: race,
      age_min: age_min,
      age_max: age_max,
      department: department,
      compensation: compensation,
      disease: disease 


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
            <div class="small_buff"></div>
            <button type="button" className="custom-primary" onClick={PostStudy} >Create Posting</button>
                {/* TODO: if TIME, create a review page to view what the participant would see */}
                </form>
            </div>
        </div>
    );
  }

export default Posting;