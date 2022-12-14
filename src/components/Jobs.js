import React, { useEffect, useState } from 'react'
import './jobs.css'
import axios from 'axios'

export default function Jobs({ memo, update, email }) {

    const [contain, setcontain] = useState(false)
    const [names] = useState([])
    const [applied, setapplied] = useState('')
    // const [jobs, setjobs] = useState([])


    useEffect(() => {
        axios.post('http://localhost:3001/get', { email: email })
            .then((res, err) => {
                if (err) {
                    return err;
                }
                let contents = res.data;

                contents.forEach((element) => {
                    names.push(element)
                    setapplied(names[0].applied_job)

                })
                for (let i = 0; i <= applied.length; i++) {
                    // setjobs(arr => [...arr, applied[i]])
                    if (applied[i] === memo.companyname) {
                        setcontain(true)
                    }
                }



            })


    }, [applied, email, names, memo.companyname])


    return (
        <center className='job'>
            <div className='perslide'>
                <div className='company1' >
                    <div className='company'>
                        {memo.companyname}
                    </div>
                    <div className='position'>
                        {memo.position}
                    </div>
                    <div className='salary'>
                        {memo.salary}
                    </div>
                </div>
                <button className={contain ? 'btn btn-danger applied' : 'btn btn-danger applied'} onClick={() => { update(contain,memo.companyname) }}>{contain ? 'Remove' : 'Apply'}</button>
            
            </div>
        </center>
    )
}
