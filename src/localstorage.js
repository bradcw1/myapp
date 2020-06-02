const url = "http://10.25.138.115:8080/countries";

fetch(url)
    .then(res => res.json())
    .then(res => localStorage.setItem('countries',JSON.stringify(res)));
