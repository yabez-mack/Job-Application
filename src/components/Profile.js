import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Registered from './Registered'

export default function Profile() {

    const [names] = useState([])

    const [name, setname] = useState('')
    const [jobs, setjobs] = useState([])


    const cookie = Cookies.get('user');


    useEffect(() => {

        axios.post('http://localhost:3001/get', { email: cookie })
            .then((res, err) => {
                if (err) {
                    return err;
                }
                let contents = res.data;
                contents.forEach((element) => {
                    names.push(element)
                    console.log(names)
                })
                setname(names[0].name)

                let applied = names[0].applied_job
                for (let i = 0; i <= applied.length; i++)
                    if (applied[i] !== undefined) {
                        setjobs(array => [...array, applied[i]])
                        // jobs.push(names[0].applied_job)

                    } else {

                    }

            }


            )
    }, [names, cookie])

    const home = () => {
        window.location.replace('/home')
    }
    const logout = () => {
        Cookies.remove("user", "", { path: '/' })
        window.location.replace('/')
    }

    console.log(jobs)

    return (
        <div className='top-content'><button className='btn btn-danger home' onClick={home}>Home</button><button className='btn btn-danger logout' onClick={logout}>Logout</button>
            <center className='name1' >
                Name :  {name}


            </center>
            <center className='wperjob'>
                {
                    jobs.map((job) => (
                        <Registered
                            job={job}
                            // key={job}
                            cookie={cookie}

                        />

                    ))}
            </center>

        </div>
    )
}
