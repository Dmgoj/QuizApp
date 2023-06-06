import React from "react"
import axios from "axios"

import { useNavigate } from "react-router-dom";




function LoginForm() {
    const navigate=useNavigate()
   
    
    //const history = useHistory();
    const [form, setForm] = React.useState(
        {
            name: "",
            password: ""
        }
    )

    const handleLogin = async (e) => {
        e.preventDefault();
      const instance = axios.create({
  withCredentials: true
})
        try {
          const response = await instance.post('http://localhost:5000/api/users/login', {
            name: form.name,
            password: form.password
          });
      
          const { token } = response.data; // Extract the token from the API response
          
          localStorage.setItem('sessionToken', token);
      
               navigate('/Quiz',{state:token});
        } catch (error) {
          console.error(error);
        }
      };
    // const [user,setUser] =React.useState([])
    // const handleLogin = (event) => {
    //     event.preventDefault();

    //     // Create a data object with the username and password
    //     const data = {
    //         name: form.name,
    //         password: form.password
    //     };

    //     // Make the Axios request
    //     axios.post('http://localhost:5000/api/users/login', data)
    //         .then(response => {
    //             // Login successful, handle the response
    //             console.log(data)
    //             // TODO: Perform actions after successful login
                
            
    //         if (response.data.user) {
    //             // User is logged in, navigate to "/quiz"
    //             navigate("/quiz");
    //         } else {
    //             navigate("/")
    //         }


    //         })
    //         .catch(error => {

    //             console.log('Request failed', error.message);

    //         });
    // };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="name">Name:</label>
            <input type="text" onChange={(e) => setForm({ ...form, name: e.target.value })} name="name" required></input>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required></input>
            <button type="submit">Login</button>
            Don't have an account? <a href="/register">Register</a>
        </form>
    )
}

export default LoginForm;