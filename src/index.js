import React from 'react';
import ReactDOM from 'react-dom';
// import './style.scss';
// import './like_button.js';
import './localstorage.js';

const title = 'My Minimal React Webpack Babel Setup';

if(localStorage.getItem('countries'))
{
    var countries = JSON.parse(localStorage.getItem('countries'));
}

class CountryForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'Afghanistan'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {

        let countryOptions = countries.map((data) => <option>{data.name}</option>);

        let dataOptions = countries.map((data) => <option>{data.data.cpw}</option>);

        let ipp = [countries.map((data) => data.name), countries.map((data) => data.data)];

        // console.log(countryOptions);        
        // console.log({dataOptions});
        console.log(ipp);

      return (
        <form onSubmit={this.handleSubmit}>

        <p>
          <label>
            Country:
            <select value={this.state.value} onChange={this.handleChange}>
                {countryOptions}
            </select>
          </label>
        </p>

        <p>
          <label>
            Children Per Woman:
            <p id="cpw"></p>
          </label>            
        </p>

        <p>
          <label>
            Income Per Person:
            <p id="ipp"></p>
          </label>            
        </p>

        <p>
          <label>
            Life Expectency (Years):
            <p id="ley"></p>
          </label>            
        </p>

        </form>
      );
    }
  }

  ReactDOM.render(
    <CountryForm />,
    document.querySelector('#country')
  );

//   console.log(document.getElementById('country'));