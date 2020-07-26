import React, { Component } from "react";
import "./components.css";
import { db } from './firebase';
import 'firebase/storage';
import 'firebase/firestore';

//-------------------------------------------------DEPENDENCY FUNCTIONS --------------------------------------------

//check for valid email input 
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

// check if form fields are all filled up 
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val = 0  && (valid = false);
  });

  return valid;
};

//get next month date
function getNextMonth() {
  var date = new Date();
  var nextMonth = date.getDate() + 29;
  date.setDate(nextMonth);
  var dateArr = date.toLocaleDateString().split("/");
  var year = dateArr[2];
  var month = dateArr[1];
  var day = dateArr[0];
  var dateStr = year + "-" + month + "-" + day;
  return dateStr;
}

// check if string contains numbers 
function hasNumber(myString) {
  return /\d/.test(myString);
}

//-----------------------------------------------COMPONENT ---------------------------------------------------------
class PriceAlertForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      alertPrice: "", 
      country: "", 
      date: "", 
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        alertPrice: "", 
        date: "", 
      }
    };
  }

  // Submit Form Function
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.firstName.length === 0 || 
        this.state.lastName.length === 0 || 
        this.state.email.length === 0 ||
        this.state.country.length === 0 ||
        this.state.date.length === 0 ||
        this.state.alertPrice.length === 0) { 
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      alert("Please fill in all fields before submitting."); 

    } else if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Country: ${this.state.country}
        Date: ${this.state.date}
        Alert Price: ${this.state.alertPrice}
      `);
      
      alert("You have submitted your price alert order!")
     
      //  Firebase data submission
      var firstName = this.state.firstName;
      var lastName = this.state.lastName;
      var email = this.state.email;
      var country = this.state.country;
      var date = this.state.date;
      var alertPrice = this.state.alertPrice;

      db.collection("Price Alerts").doc(country).set({
        [date]: { 
          [email]: { 
            AlertPrice: parseInt(alertPrice), 
            FirstName: firstName,
            LastName: lastName,
          }
        }}, { merge: true }); 
    
      // Clear form
      document.getElementById('priceAlertForm').reset();
      // Refresh page 
      setTimeout(() => {window.location.reload(true);}, 2000) 
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      alert("Please fill in all fields before submitting.")
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      // checks for valid name 
      case "firstName":
        formErrors.firstName =
          value.length < 3 || hasNumber(value) ? "Please input valid name" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 || hasNumber(value) ? "Please input valid name" : "";
        break;
      // checks for valid email 
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break; 
      // checks for valid date 
      case "date": 
        var inputDate = new Date(formErrors.date).setHours(0,0,0,0); 
        var minDate = new Date(getNextMonth).setHours(0,0,0,0); 
        var maxDate = new Date("2021-01-01").setHours(0,0,0,0); 
        if (Date(inputDate) < Date(minDate) || Date(inputDate) > Date(maxDate)) { 
          return "Invalid date"; 
        } else {}
        break;
      case "alertPrice": 
        formErrors.alertPrice = value < 0 ? "Please input valid price" : "";
      break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
        <div className="form-wrapper" id="formWindow">
          <form id="priceAlertForm" onSubmit={this.handleSubmit} noValidate>
            
            {/* first name */}
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
                id="firstName"
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>

            {/* last name */}
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
                id="lastName"
              />
              {formErrors.lastName.length >= 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            {/* email */}
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
                id="email"
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            {/* country */}
            <div className="country">
              <label>Country</label>
              <div> 
              <select
                name="country"
                noValidate
                onChange={this.handleChange}
                id="country"
              >
                <option value="">Select Country</option>
                <option value="HKG">Hong Kong</option>
                <option value="LON">London</option>
                <option value="KUL">Kuala Lumpur</option>
                <option value="TYO">Tokyo</option>
                <option value="DPS">Bali</option>
              </select>
              </div>
            </div>
            
            
          {/* date */}
            <div className="email">
              <label>Date</label>
              <input
                type="date"
                name="date"
                noValidate
                className={formErrors.date.length > 0 ? "error" : null}
                onChange={this.handleChange}
                min={getNextMonth()}
                max="2021-01-01"
                id="date"
              />
              {formErrors.date.length > 0 && (
                <span className="errorMessage">{formErrors.date}</span>
              )}
            </div>

            {/* Alert Price */}
            <div className="alertPrice">
              <label>Alert Price</label>
              <input
                className={formErrors.alertPrice.length > 0 ? "error" : null}
                placeholder="Alert Price - $SGD"
                noValidate
                type="number"
                name="alertPrice"
                onChange={this.handleChange}
                id="alertPrice"
              />
              {formErrors.alertPrice.length > 0 && (
                <span className="errorMessage">{formErrors.alertPrice}</span>
              )}
            </div>

            <div className="createAccount">
              <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
    );
  }
}


export default PriceAlertForm;