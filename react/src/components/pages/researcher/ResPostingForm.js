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

  // AgeRangeInput component
// const AgeRangeInput = ({ ageRange, onAgeChange }) => {
  // const handleStartAgeChange = (event) => {
    // Ensure only numbers are entered, and limit the input to 3 digits
    // const newAgeMin = event.target.value.replace(/\D/g, '').slice(0, 3);
    // onAgeChange({ ...ageRange, ageMin: newAgeMin });
  // };
  // 
  // const handleEndAgeChange = (event) => {
    // Ensure only numbers are entered, and limit the input to 3 digits
    // const newAgeMax = event.target.value.replace(/\D/g, '').slice(0, 3);
    // onAgeChange({ ...ageRange, ageMax: newAgeMax });
  // };
// 
  // return (
    // <div>
      {/* <input */}
        // type="text"
        // value={ageRange.ageMin}
        // onChange={handleStartAgeChange}
        // style={{ width: '50px', marginRight: '10px' }}
      // />
      {/* <span>to</span> */}
      {/* <input */}
        // type="text"
        // value={ageRange.ageMax}
        // onChange={handleEndAgeChange}
        // style={{ width: '50px', marginLeft: '10px' }}
      // />
    {/* </div> */}
  // );
// };


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
    const [start_date, setStartdate] = useState('');
    const [end_date, setEnddate] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    // const [keyword, setKeywords] = useState('');
    const [compensation, setCompensation] = useState('');
    // const [ageMin, setAgeMin] = useState('');
    // const [ageMax, setAgeMax] = useState('');
    // const [ageRange, setAgeRange] = useState({ ageMin: '', ageMax: '' });
    // 
    // const handleAgeChange = (newAgeRange) => {
      // setAgeRange(newAgeRange);
    // };
    // const formattedAgeRange = `${ageRange.ageMin}-${ageRange.ageMax}`;


    const [sex, setSex] = useState('');
    const [smoking, setSmoking] = useState('');
    const [drinking, setDrinking] = useState('');
    const handleDrinkingChange = (e) => {
      setDrinking(e.target.value);
    };
    const handleSmokingChange = (e) => {
      setSmoking(e.target.value);
    };
    // const [additional, setAdditional] = useState('');
    const navigate = useNavigate();

    const PostStudy = () => {
      axios.post('http://127.0.0.1:5000/researcher-posting', {
      title: title,
      location: location,
      start_date: start_date,
      end_date: end_date,
      description: description,
      duration: duration,
      // keyword: keyword,
      // ageMin: ageMin, 
      // ageMax: ageMax,
      // age: formattedAgeRange,
      sex: sex,
      smoking: smoking, 
      drinking: drinking, 
      // additional: additional, 

    })
    .then(function (response) {
      console.log(response);
      navigate("/researcher-homepage");
      // const userInfo = response.data.user_info; // Assuming the response has 'user_info'

      // Check the user role obtained from the response
      // if (userInfo.role === 1) {
        // navigate("/researcher-homepage");
      // }  // TODO: maybe a confirmation page lowk
        // Handle other roles or unexpected scenarios
      // alert("oh no! Something went wrong");
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
            <p>Study Detials and Information</p>
            {/* <form action="/post-form" method="POST"> */}
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
                        <label class="label" for="location">Location(s):</label>
                        <input required class="input-box" 
                        name="locations" 
                        type="text" 
                        id="locations"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}></input>
                    </div>
                    <div class="form-group">
                        {/* TODO: FORMAT THIS, SMOL BOXS SIDE BY SIDE */}
                        <label class="label">Timeline:</label>  
                        <DateInput name="start_date" 
                        for="start_date" 
                        id="start_date"
                        value={start_date}
                        onChange={(e) => setStartdate(e.target.value)}/>

                        <DateInput name="end_date" 
                        for="end_date" 
                        id="end_date" 
                        value={end_date}
                        onChange={(e) => setEnddate(e.target.value)}/>
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
                <h1>Participant Eligibility</h1>
                {/* <i class="fa fa-check-square-o" style={checkIconStyle}></i> */}
                <p>Participant can join if...</p>
                <div class="form-container">
{/*                      */}
                    {/* <div class="form-group"> */}
                        {/* <label class="label" for="age" >Age Group:</label> */}
                        {/* <AgeRangeInput/> */}
                    {/* </div> */}
{/*                      */}

                    <div class="small-buff">
                    <div className="form-group">
                        <label className="label">Sex:</label>
                        <SexCheckboxList value={sex}/>
                    </div>
                    </div>
                </div>
                {/* <div class="form-group"> */}
                {/* <label class="label" for="smoking">Is smoking relevant to your study</label> */}
                {/* <select name="smoking" id="smoking" value="smoking"> */}
                    {/* <option disabled selected value="">Select</option> */}
                    {/* <option value={smoking} */}
                    {/* // onChange={(e) => setSmoking.target.value}>Yes</option> */}
                    {/* <option value={smoking} */}
                    {/* // onChange={(e) => setSmoking.target.value}>No</option> */}
                {/* </select> */}
                {/* </div> */}
                <div class="form-group">
            <label className="label" htmlFor="smoking" for="smokinng">Is smokinng relevant to your study</label>
            <select name="smoking" id="smokng" value={smoking} onChange={handleDrinkingChange}>
              <option value="" disabled>Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            </div>
                <div class="form-group">
            <label className="label" htmlFor="drinking" for="drinking">Is drinking relevant to your study</label>
            <select name="drinking" id="drinking" value={drinking} onChange={handleDrinkingChange}>
              <option value="" disabled>Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            </div>
            <div class="small_buff"></div>
            <button type="button" className="custom-primary" onClick={PostStudy} >Create Posting</button>
                {/* TODO: if TIME, create a review page to view what the participant would see */}
            {/* </form> */}
            </div>
            
        </div>
    );
  }
// drinnking, smoking, conditions, department, race


export default Posting;