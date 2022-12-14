import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Registered.css'



export default function Registered({ job, cookie }) {

    const [names] = useState([])
    const [nemon, setnemon] = useState('')


    const remove = (companyname) => {
        // let newid=`ObjectId("${id}")`
        axios.post('http://localhost:3001/jobrem', { companyname: companyname, email: cookie })
        // alert('clicked')
        window.location.reload()
    }
    useEffect(() => {
        axios.post('http://localhost:3001/profilereq', { companyname: job })

            .then((res, err) => {
                if (err) {
                    return err;
                }
                let contents = res.data;


                names.push(contents[0])

                let nemo = names[0]
                console.log(nemo.companyname)
                if (nemo !== '') {
                    setnemon(nemo)
                }
                // console.log(names[0])




            })


    }, [names, job, nemon])
    console.log(nemon.companyname)
    return (
        <div className="perjob">
            <div className='pjob'>
                {nemon.companyname}
            </div>
            <div className='perjob2'>
                {nemon.position}
            </div>
            <div className='perjob3'>
                {nemon.salary}
            </div>
            <button className='btn btn-danger remove' onClick={() => { remove(nemon.companyname) }}>remove</button>
        </div>
    )
}
