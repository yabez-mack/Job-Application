import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

export default function App() {
  const [file, setfile] = useState(null)
 
  const emailpattern = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
  const namepattern = RegExp(/^[a-z ,.'-]+$/);
  const addresspattern = RegExp(/^[0-9A-Za-z ,.'-]/);
  const passwordpattern = RegExp(/^[A-Za-z0-9_@./$#&+-]{8}$/);
  const phonepattern = RegExp(/^(([9]|[8]|[7]|[6])[0-9]{9}$)/)
  const agepattern = RegExp(/^([2-4]{1}[0-9]{1})$/);
  const percentagepattern = RegExp(/^([0-9]{1}|[0-9]{2}|100)$/);
  const yearpattern = RegExp(/^[0-9]+$/);


  const [errorfirstname, setfirsterrorname] = useState(true)
  const [errorsecondname, setseconderrorname] = useState(true)
  const [errorage, seterrorage] = useState(true)
  const [erroremail, seterroremail] = useState(true)
  const [errorphone, seterrorphone] = useState(true)
  const [erroraddress, seterroraddress] = useState(true)
  const [errorgrade2, seterrorgrade2] = useState(true)
  const [errorgrade1, seterrorgrade1] = useState(true)
  const [errormarks1, seterrormarks1] = useState(true)
  const [errormarks2, seterrormarks2] = useState(true)
  const [erroryear1, seterroryear1] = useState(true)
  const [erroryear2, seterroryear2] = useState(true)
  const [errorcompany1, seterrorcompany1] = useState(true)
  const [errorcompany2, seterrorcompany2] = useState(true)
  const [errorpassword, seterrorpassword] = useState(true)


  const [firstname, setfirstname] = useState('')
  const [secondname, setsecondname] = useState('')
  const [age, setage] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [address, setaddress] = useState('')
  const [grade2, setgrade2] = useState('')
  const [grade1, setgrade1] = useState('')
  const [marks1, setmarks1] = useState('')
  const [marks2, setmarks2] = useState('')
  const [year1, setyear1] = useState('')
  const [year2, setyear2] = useState('')
  const [company1, setcompany1] = useState('')
  const [company2, setcompany2] = useState('')
  const [password, setpassword] = useState('')
  const [resume, setresume] = useState('')






  const submit = () => {

    axios.post('http://localhost:3001/submit', { name: firstname, lastname: secondname, age: age, email: email, phoneno: phone, address: address, grade1: grade1, marks1: marks1, grade2: grade2, marks2: marks2, company1: company1, year1: year1, company2: company2, year2: year2,resume:resume, password: password })
    window.location.replace('/home')
  }

  const files = () => {

    axios.post('http://localhost:3001/upload',{file:file},{headers:{'Content-Type':'multipart/form-data'}})
    .then((res,err)=>{
      if (err){
        return err
      }
      else{
        // console.log(res)
      }
    })
    setresume(file.name)
  }

  useEffect(() => {

    setfirsterrorname(namepattern.test(firstname));
    setseconderrorname(namepattern.test(secondname));
    seterrorpassword(passwordpattern.test(password))
    seterrorage(agepattern.test(age))
    seterroremail(emailpattern.test(email))
    seterrorphone(phonepattern.test(phone))
    seterroraddress(addresspattern.test(address))
    seterrorgrade1(namepattern.test(grade1))
    seterrorgrade2(namepattern.test(grade2))
    seterrormarks1(percentagepattern.test(marks1))
    seterrormarks2(percentagepattern.test(marks2))
    seterroryear1(yearpattern.test(year1))
    seterroryear2(yearpattern.test(year2))
    seterrorcompany1(namepattern.test(company1))
    seterrorcompany2(namepattern.test(company2))


  }, [namepattern, passwordpattern, agepattern, emailpattern, phonepattern, percentagepattern, yearpattern, addresspattern, address, age, company1, company2, email, firstname, grade1, grade2, marks1, marks2, password, phone, secondname, year1, year2])

  return (
    <>
      <div className="main-block">
        <h1>APPLICATION FORM</h1>
        <div>
          <button className='loginbutton' onClick={() => { window.location.replace('/') }}>Login</button>
        </div>

        <form >
          <h3>Information</h3>

          <div className="info">
            <div className="info-item">
              <label className="icon" htmlFor="name"><i className="fas fa-user"></i></label>
              <input className={errorfirstname ? '' : 'error'} onChange={(e) => { setfirstname(e.target.value) }} type="text" name="firstname" id="firstname" placeholder="First Name" required />
              <div>
              </div>
            </div>
            <div className="info-item">
              <label className="icon" htmlFor="name"><i className="fas fa-user"></i></label>
              <input className={errorsecondname ? '' : 'error'} onChange={(e) => { setsecondname(e.target.value) }} type="text" name="secondname" id="secondname" placeholder="Last Name" />
            </div>

            <div className="info-item">
              <label className="icon" htmlFor="age"><i className="fas fa-calendar"></i></label>
              <input className={errorage ? '' : 'error'} onChange={(e) => { setage(e.target.value) }} type="text" name="age" id="age" placeholder="Age" required />
            </div>
            <div className="info-item">
              <label className="icon" htmlFor="email"><i className="fas fa-envelope"></i></label>
              <input className={erroremail ? '' : 'error'} onChange={(e) => { setemail(e.target.value) }} type="text" name="email" id="email" placeholder="Email" required />
            </div>
            <div className="info-item">
              <label className="icon" htmlFor="phone"><i className="fas fa-phone"></i></label>
              <input className={errorphone ? '' : 'error'} onChange={(e) => { setphone(e.target.value) }} type="text" name="phone" id="phone" placeholder="Phone" required />
            </div>

            <div className="info-item">
              <label className="icon" htmlFor="address"><i className="fas fa-address-book"></i></label>
              <input className={erroraddress ? '' : 'error'} onChange={(e) => { setaddress(e.target.value) }} type="text" name="address" id="address" placeholder="Address" required />

            </div>
            <div className="info-item">
              <label className="icon" htmlFor="password"><i className="fas fa-lock"></i></label>
              <input className={errorpassword ? '' : 'error'} onChange={(e) => { setpassword(e.target.value) }} type='password' name="password" id="password" placeholder="Password" required />

            </div>
          </div>



          <h3>Accomplishment</h3>
          <div className="info">

            <div className="info-item">
              <label className="icon" htmlFor="graduate"><i className="fas fa-graduation-cap"></i></label>
              <input className={errorgrade1 ? '' : 'error'} onChange={(e) => { setgrade1(e.target.value) }} type="text" name="graduate" id="graduate" placeholder="Graduate Degree" required />

            </div>
            <div className="info-item">
              <input className={errormarks1 ? '' : 'error'} onChange={(e) => { setmarks1(e.target.value) }} type="text" name="marks1" id="marks1" placeholder="Marks" required />

            </div>
            <div className="info-item">
              <label className="icon" htmlFor="graduate2"><i className="fas fa-graduation-cap"></i></label>
              <input className={errorgrade2 ? '' : 'error'} onChange={(e) => { setgrade2(e.target.value) }} type="text" name="graduate2" id="graduate2" placeholder="Post Graduate Degree" required />

            </div>
            <div className="info-item">
              <input className={errormarks2 ? '' : 'error'} onChange={(e) => { setmarks2(e.target.value) }} type="text" name="marks2" id="marks2" placeholder="Marks" required />

            </div>

          </div>

          <h3>Experience</h3>
          <div className="info">

            <div className="info-item">
              <label className="icon" htmlFor="company1"><i className="fas fa-briefcase"></i></label>
              <input className={errorcompany1 ? '' : 'error'} onChange={(e) => { setcompany1(e.target.value) }} type="text" name="company1" id="company1" placeholder="Company's Name" required />

            </div>
            <div className="info-item">
              <input className={erroryear1 ? '' : 'error'} onChange={(e) => { setyear1(e.target.value) }} type="text" name="year1" id="year1" placeholder="Years Worked" required />

            </div>

            <div className="info-item">
              <label className="icon" htmlFor="company2"><i className="fas fa-briefcase"></i></label>
              <input className={errorcompany2 ? '' : 'error'} onChange={(e) => { setcompany2(e.target.value) }} type="text" name="company2" id="company2" placeholder="Company's Name" required />

            </div>
            <div className="info-item">
              <input className={erroryear2 ? '' : 'error'} onChange={(e) => { setyear2(e.target.value) }} type="text" name="year2" id="year2" placeholder="Years Worked" required />

            </div>

          </div>
          <h3>Add Resume</h3>
          <input type='file' className='file' name='file' onChange={(e)=>{setfile(e.target.files[0])}} id='file'></input><button onClick={files}>Upload</button>

          <button className='submitbutton'  type="submit" onClick={submit}>Submit</button>
        </form >
      </div >
    </>

  )

}
