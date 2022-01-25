import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { login } from '../../redux/actions/authActions';

const ResetPwdModal = ({ isOpen, setIsOpen, token }) => {
    const dispatch = useDispatch();
    const history = useHistory();
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

    useEffect(() => {
        if (token) {
            axios.post("/api/gftshoppe/auth/getForgotPwdEmail", {token})
            .then(res => {
                if (res.data.status) {
                    setformdata({
                        ...formdata,
                        email: res.data.email
                    })
                } else {
                    toast.warn(res.data.error)
                }
            })
            .catch(err => {
                toast.warn("Something is wrong")
            })
        }
    }, [isOpen]);

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

      axios.post("/api/gftshoppe/auth/resetPwd", {formdata})
      .then(res => {
        if (res.data.status) {
            const data = {
                isSigned: true,
                email: res.data.user.email,
                id: res.data.user._id,
                token: res.data.token
            }
            dispatch(login(data));
            toast.success("Successfully logged in");
            setIsOpen(false)
            setTimeout(() => {
                history.push("/testdemo");
            }, 3000)
        } else {
          seterror({
            ...error,
            errorServer: true,
            errorServerMsg: res.data.error
          })
        }
      })
      .catch(err => {
          toast.warn("Something is wrong");
      })
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
                    <p className="text-black text-sm my-6">Already have an account? <button className="text-purple-primary cursor-pointor" onClick={() => {setIsOpen(false)}}>Sign in</button></p>
                    {error.errorServer ? <p className="text-red-500 text-sm py-1">{error.errorServerMsg}</p> : ''}
                    <div className="mb-4">
                        <input type="email" name="email" value={formdata.email} className={`shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.errorEmail ? 'border-red-500' : ''}`} placeholder="Email Address" onChange={handleInput} onKeyUp={handleKeyUp} disabled />
                        {error.errorEmail ? <p className="text-red-500 text-sm pt-1">Please indicate the correct email address</p> : ''}
                    </div>
                    <div className="mb-4">
                        <input type="password" name="password" value={formdata.password} className={`shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.errorPassword ? 'border-red-500' : ''}`} placeholder="New Password" onChange={handleInput} onKeyUp={handleKeyUp} />
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
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`opacity-70 fixed inset-0 z-40 bg-black ${isOpen ? '' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
        </>
    )
}

export default ResetPwdModal;