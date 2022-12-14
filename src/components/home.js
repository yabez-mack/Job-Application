import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Jobs from './Jobs'
import './home.css'
export default function Home() {


    const [names] = useState([]);
    const [count, setcount] = useState('')




    const update = (contain, companyname) => {
        if (contain === true) {
           

            axios.post('http://localhost:3001/remove', { email: cookie, companyname: companyname })
            window.location.reload()
        }
        else {
            axios.post('http://localhost:3001/update', { email: cookie, companyname: companyname })
            window.location.reload()


          
        }
    }





    const cookie = Cookies.get('user');

    const logout = () => {
        Cookies.remove("user", "", { path: "/" })
        window.location.reload()
    }

    useEffect(() => {
        axios.post('http://localhost:3001/jobreq')

            .then((res, err) => {
                if (err) {
                    return err;
                }
                let contents = res.data;

                contents.forEach((element) => {
                    names.push(element)


                })
                for (let i = 0; i <= names.length; i++) {
                    setcount(i)
                }

            })


    }, [names])

    const profil = () => {
        console.log(count)
        window.location.replace('/profile')

    }




    return (
        <div className='top-content'>
            <div className='welcome'><span> welcome {cookie} <button className='btn btn-danger' onClick={profil}>Profile</button></span>

                <button className='btn btn-danger logout1' onClick={logout}>Logout</button>
            </div>

            <div>
                {names.map((memo) => (
                    <Jobs
                        key={memo._id}
                        memo={memo}
                        email={cookie}
                        update={update}
                    // remove={remove}

                    />

                ))}
            </div>

        </div>
    )
}
