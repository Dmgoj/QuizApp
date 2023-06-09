import React from "react"
import axios from "axios"

function RegisterForm() {
    const [form,setForm]= React.useState(
        {name: "",
         password: ""}
     )
    const  handleRegister = (event) => {
        event.preventDefault();
        // Create a data object with the username and password
        const data = {
            name: form.name,
            password: form.password
        };

        // Make the Axios request
        axios.post('http://localhost:5000/api/users/register', data)
            .then(response => {
                // Login successful, handle the response
                console.log(data)
                // TODO: Perform actions after successful login
            })
            .catch(error => {
                console.log('Request failed', error.message);
            });
    };
    
    return (
        <form onSubmit={handleRegister}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" onChange={(e) => setForm({ ...form, name: e.target.value })} required></input>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required></input>
            <button type="submit">Submit</button>
            Already registered? <a href="/">Login</a>
        </form>
    )
}

export default RegisterForm;