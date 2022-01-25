import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { register } from '../../redux/actions/authActions';

const SignUpModal = ({ isOpen, setIsOpen, setSingInOpen }) => {
    const dispatch = useDispatch();

    const [formdata, setformdata] = useState({
      email: "",
      password: "",
      confirmPwd: ""
    });

    const [error, seterror] = useState({
      errorServer: false,
      errorServerMsg: "",
      errorEmail: false,
      errorPassword: false,
      errorConfirmPwd: false,
    })

    const handleInput = (e) => {
      seterror({
        ...error,
        errorServer: false,
        errorEmail: false,
        errorPassword: false,
        errorConfirmPwd: false
      })
      const name = e.target.name;
      const value = e.target.value;
      setformdata({
        ...formdata,
        [name]: value
      })
    }

    const handleKeyUp = (e) => {
      if (e.key === 'Enter')
        handleSubmit();
    }

    const handleSubmit = () => {
      if (!validator.isEmail(formdata.email)) {
        seterror({
          ...error,
          errorEmail: true
        })
        return;
      }

      if (validator.isEmpty(formdata.password)) {
        seterror({
          ...error,
          errorPassword: true
        })
        return;
      }

      if (validator.isEmpty(formdata.confirmPwd) || formdata.password !== formdata.confirmPwd) {
        seterror({
          ...error,
          errorConfirmPwd: true
        })
        return;
      }

      axios.post("/api/gftshoppe/auth/signup", {formdata})
      .then(res => {
        if (res.data.status) {
          toast.success(`Check your email to complete the registration process`);
          setIsOpen(false)
        } else {
          seterror({
            ...error,
            errorServer: true,
            errorServerMsg: res.data.error
          })
        }
      })
      .catch(err => {
          
      })
      dispatch(register(formdata))
    }

    return (
        <>
          <div
            className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${isOpen ? '' : 'hidden'}`} 
        >
            <div className="relative w-full my-6 mx-auto max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-12">
                {/*header*/}
                <div className="flex items-start justify-between border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-5xl text-black font-extrabold mr-20">
                    Registration
                  </h3>
                  <button
                    className="ml-auto bg-transparent border-0 text-black float-right text-5xl leading-none outline-none focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="p-0">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                    <p className="text-black text-sm my-6">Already have an account? <button className="text-purple-primary cursor-pointor" onClick={() => {setIsOpen(false); setSingInOpen(true)}}>Sign in</button></p>
                    {error.errorServer ? <p className="text-red-500 text-sm py-1">{error.errorServerMsg}</p> : ''}
                    <div className="mb-4">
                        <input type="email" name="email" value={formdata.email} className={`shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.errorEmail ? 'border-red-500' : ''}`} placeholder="Email Address" onChange={handleInput} onKeyUp={handleKeyUp} />
                        {error.errorEmail ? <p className="text-red-500 text-sm pt-1">Please indicate the correct email address</p> : ''}
                    </div>
                    <div className="mb-4">
                        <input type="password" name="password" value={formdata.password} className={`shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.errorPassword ? 'border-red-500' : ''}`} placeholder="Password" onChange={handleInput} onKeyUp={handleKeyUp} />
                        {error.errorPassword ? <p className="text-red-500 text-sm pt-1">Please indicate the correct password</p> : ''}
                    </div>
                    <div className="mb-4">
                        <input type="password" name="confirmPwd" value={formdata.confirmPwd} className={`shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.errorConfirmPwd ? 'border-red-500' : ''}`} placeholder="Confirm Password" onChange={handleInput} onKeyUp={handleKeyUp} />
                        {error.errorConfirmPwd ? <p className="text-red-500 text-sm pt-1">Please indicate the correct confirm password</p> : ''}
                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center pt-6 border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-purple-primary text-white active:bg-emerald-600 text-md px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 purple-btn-shadow"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Register now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`opacity-70 fixed inset-0 z-40 bg-black ${isOpen ? '' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
        </>
    )
}

export default SignUpModal;