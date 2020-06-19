import React from 'react';
import ReactDOM from 'react-dom';

import '/home/student/myapp/src/style.scss'

// URL of the primary application
const url = "http://10.25.138.115:8080/";
const year = 2020;

// If the data is already in local storage retrieve it and parse it
// Otherwise create an empty array to be set later
if(localStorage.getItem('countries'))
{
  var countries = JSON.parse(localStorage.getItem('countries')); 
}else
{
  var countries = [];
}

class CountryForm extends React.Component {
  constructor(props) {
    super(props);   

    // Set empty variables in state to be set later
    this.state = {
      value: "none",
      cData: [],
      cpw: "",
      ipp: "",
      ley: ""
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePost = this.handlePost.bind(this);
  } 

  // This method happens before anything else, and will fetch the countries from the primary
  // application and set the information to local storage.
  componentDidMount() {
    fetch(url + "countries")
    .then(res => res.json())
    .then(res => localStorage.setItem('countries',JSON.stringify(res)));
  }  

  // When the "Delete Country" button is clicked it will send a delete api request
  // to the primary application. The country will then be deleted from the database, unless the country
  // can't be found.
  handleDelete() {
    try {
      fetch(url + "countries/" + this.state.value, {method: 'DELETE'})
      .then(function(response) {console.log(response.status)});
    }
    catch {
      console.log("Country Not Found")
    } 
  }

  // When the "Update Country" button is clicked it will send a post api request 
  // to the primary application. The data will be updated in the database. I've used
  // a slightly hacky way to immediately show the change in this application by updating the state.
  // Get requests will grab the real data from the database though.
  handlePost() {
    var new_value = document.getElementById("new_value").value;

    if(!new_value){
      alert("Please input a number");
    }
    else{
      try{
        fetch(url + "countries/" + this.state.value + "/ipp/" + year + "/" + new_value, {method: 'POST'})
        .then(this.setState({ipp: new_value}));
      }
      catch
      {
        console.log("Country Not Found")
      }
    }    
  }

  // This method gets the value from the select option and makes a fetch
  // to the API using the relevant country name. The resulting data is used to 
  // find the CPW, IPP and LEY data and set it to a state. This method
  // is called whenever the select element is changed.
  async handleChange(event) {
    await this.setState({value: event.target.value});

    if(this.state.value!="none"){
      const response = await fetch(url + "countries/" + this.state.value);
      const json = await response.json();   

      if(!json.data.ipp || json.data.ipp[year] === ""){this.setState({ipp: "No Data"});}
      else{await this.setState({ipp: json.data.ipp[year]});}
    }
  }

  render() {

  // countryOptions contains the list of country names as options. 
  //It is used to populate the drop down list

  countries.sort((a, b) => (a.name > b.name) ? 1 : -1);
  var countryOptions = countries.map((data) => <option value={data.name}>{data.name}</option>);
  
  return (    
    
    <div id="content" class="container">
      <h1 id="title">Node App</h1>

    <div  class="row">
      <div class="col-md-8">
        <label>Country: {this.state.value}</label>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <label>Income Per Person: {this.state.ipp}</label>
      </div>
    </div> 

    <div class="row">
      <div class="col-md-8">
        <select value={this.state.value} onChange={this.handleChange} class="form-control">
          <option value="none">Select..</option>
          {countryOptions}
        </select>
      </div>

      <div class="col-md-4">
        <button id="delete" class="btn btn-primary" onClick={this.handleDelete}>Delete Country</button>
      </div>
    </div>
      
    <div class="row">
      <div class="col-md-8">
          <input type="number" id="new_value" class="form-control"></input>        
        </div>

        <div class="col-md-4">
          <button onClick={this.handlePost} id="post" class="btn btn-primary">Update Data</button> 
        </div>
      </div>
    </div>

   );
  }
}

// Render the above inside of a div with an ID of "country"
ReactDOM.render(
  <CountryForm />,
  document.querySelector('#country')
);