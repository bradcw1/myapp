import React from 'react';
import ReactDOM from 'react-dom';

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
    localStorage.clear();

    fetch(url + "countries")
    .then(res => res.json())
    .then(res => localStorage.setItem('countries',JSON.stringify(res)));
  }  

  handleDelete() {
    try {
      fetch(url + "countries/" + this.state.value, {method: 'DELETE'});
      console.log("Deleted " + this.state.value);
    }
    catch {
      console.log("Country Not Found")
    }    

  }

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

      

      console.log(json);

      // if(!json.data.cpw || json.data.cpw[year] === ""){this.setState({cpw: "No Data"});}
      // else{await this.setState({cpw: json.data.cpw[year]});}

      if(!json.data.ipp || json.data.ipp[year] === ""){this.setState({ipp: "No Data"});}
      else{await this.setState({ipp: json.data.ipp[year]});}

      // if(!json.data.ley || json.data.ley[year] === ""){this.setState({ley: "No Data"});}
      // else{await this.setState({ley: json.data.ley[year]});}
    }
  }

  render() {

  // countryOptions contains the list of country names as options. 
  //It is used to populate the drop down list

  countries.sort((a, b) => (a.name > b.name) ? 1 : -1);
  var countryOptions = countries.map((data) => <option value={data.name}>{data.name}</option>);

  return (
    
    <div>
    <p>
      <label>
        Country:
        <select value={this.state.value} onChange={this.handleChange}>
            <option value="none">Select a country...</option>
            {countryOptions}
        </select>

        <button id="delete" onClick={this.handleDelete}>Delete Country</button>
      </label>
    </p>

    {/* <p>
      <label>
        Children Per Woman: {this.state.cpw}
      </label>            
    </p> */}

    <p>
      <label>
        Income Per Person: {this.state.ipp}
      </label> 
      <p>
      <input type="number" id="new_value"></input>
      <button onClick={this.handlePost} id="post">Update</button>
      </p>        
    </p>

    {/* <p>
      <label>
        Life Expectency (Years): {this.state.ley}
      </label>            
    </p> */}
  </div>
   );
  }
}

// Render the above inside of a div with an ID of "country"
ReactDOM.render(
  <CountryForm />,
  document.querySelector('#country')
);