import React from 'react';
import ReactDOM from 'react-dom';
// import './style.scss';
// import './like_button.js';
// import './localstorage.js';

const url = "http://10.25.138.115:8080/";

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

  componentDidMount() {
    fetch(url + "countries")
    .then(res => res.json())
    .then(res => localStorage.setItem('countries',JSON.stringify(res)));
  }  

  async handleChange(event) {
    await this.setState({value: event.target.value});
    await this.setState({slider: document.getElementById("slider").value});

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

ReactDOM.render(
  <CountryForm />,
  document.querySelector('#country')
);