import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import Cookies from 'js-cookie'




export default function Login() {

    // const axios = require('axios');

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');




    const login = () => {
        if (email === '' || password === '') {
            alert('please enter email and password')
        }
        else {
            axios.post('http://localhost:3001/login', { email: email, password: password })
                .then((res, err) => {
                    if (err) {
                        return err;
                    }

                    else if (res) {

                        if (res.data === 'wrong') {
                            // alert('invalid')
                            // console.log(res)
                            Cookies.remove("user", "", { path: "/" })
                            alert('Invalid Password')

                        }
                        else if (res.data === 'not') {
                            alert('user not found')
                            Cookies.remove("user", "", { path: "/" })

                        }
                        else if (res.data.length >= 8) {
                            // alert('welcome')

                            console.log(res)
                            Cookies.set("user", email, { path: "/" })
                            window.location.replace('/home')


                        }

                    }

                }
                )
        }
    }
const logout=()=>{
    Cookies.remove("user", "", { path: "/" })
    window.location.reload()
}
    const cookie = Cookies.get('user');
    // console.log(cookie)

    return (
        <div className='flex-fill sm'>
            <center className='center'>
                            
                {cookie ===undefined||cookie===''||cookie===null? '' : `Already Logged in as ${cookie} ` }
                {cookie ===undefined||cookie===''||cookie===null?'':<button className='btn btn-light logout2' onClick={logout}>Logout</button>}

                <div className='box'>
                    <div className='logininfo'>
                        <div className='txt'>
                            Email-ID
                        </div>

                        <div className='username'>
                            <input type='text' className='inputtxt' placeholder='Enter Email-ID' name='username' id='username' onChange={(e) => { setemail(e.target.value) }}></input>
                        </div>
                        <div className='txt'>
                            Password
                        </div>
                        <div className='password'>
                            <input type='password' className='inputtxt' placeholder='Enter Password' name='password' id='password' onChange={(e) => { setpassword(e.target.value) }}></input>
                        </div>
                        <div className='button'>
                            <button className='loginb' onClick={login} >Login</button>
                            <button className='signup' onClick={() => { window.location.replace('/signup') }} >Signup</button>

                        </div>

                    </div>
                </div>

            </center>


        </div>
    )
}
