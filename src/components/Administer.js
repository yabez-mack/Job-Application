import axios from 'axios'
import React, { useState } from 'react'
import './Administer.css'


export default function Administer() {

    const [name, setname] = useState('')
    const [position, setposition] = useState('')
    const [salary, setsalary] = useState('')

    const submit = () => {
        axios.post('http://localhost:3001/jobsubmit', { companyname: name, position: position, salary: salary })
        alert('submitted')
        window.location.reload()
    }

    return (
        <div className='screen'>
            <div className='formw'><h1 className='newjob'>NEW JOB</h1>
                <div className='boxt'>
                    <input className='form-control firstt' placeholder='enter company' onChange={(e) => { setname(e.target.value) }}></input>
                    <input className='form-control secondt' placeholder='enter position' onChange={(e) => { setposition(e.target.value) }}></input>
                    <input type='number' className='form-control thirdt' placeholder='enter salary' onChange={(e) => { setsalary(e.target.value) }}></input>
                    <button className='btn btn-light submitt' onClick={submit}>Submit</button>
                </div>
            </div>




        </div>
    )
}
