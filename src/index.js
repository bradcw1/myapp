import React from 'react';
import ReactDOM from 'react-dom';

// URL of the primary application
const url = "http://10.25.138.115:8080/";

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
  } 

  // This method happens before anything else, and will fetch the countries from the primary
  // application and set the information to local storage.
  componentDidMount() {
    fetch(url + "countries")
    .then(res => res.json())
    .then(res => localStorage.setItem('countries',JSON.stringify(res)));
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

      if(json.data.cpw){await this.setState({cpw: json.data.cpw[2020]});}
      else if(!json.data.cpw||json.data.cpw==""){this.setState({cpw: "No Data"});}      

      if(json.data.ipp){await this.setState({ipp: json.data.ipp[2020]});}
      else if(!json.data.ipp||json.data.ipp==""){this.setState({ipp: "No Data"});}

      if(json.data.ley){await this.setState({ley: json.data.ley[2020]});}
      else if(!json.data.ley||json.data.ley==""){this.setState({ley: "No Data"});}
    }
  }

  render() {

  // countryOptions contains the list of country names as options. 
  //It is used to populate the drop down list
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
      </label>
    </p>

    <p>
      <label>
        Children Per Woman: {this.state.cpw}
      </label>            
    </p>

    <p>
      <label>
        Income Per Person: {this.state.ipp}
      </label>            
    </p>

    <p>
      <label>
        Life Expectency (Years): {this.state.ley}
      </label>            
    </p>
  </div>
   );
  }
}

// Render the above inside of a div with an ID of "country"
ReactDOM.render(
  <CountryForm />,
  document.querySelector('#country')
);