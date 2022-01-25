import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import Web3 from 'web3';
import axios from 'axios';
import { toast } from 'react-toastify';
import { login } from '../../redux/actions/authActions';
import { CHAIN_RPC, ContractAbi, ContractAddr } from "../../contract";

const TransferGFTModal = ({ isOpen, setIsOpen, selectedGFT, refresh, setRefresh }) => {
    const dispatch = useDispatch();
    let { web3, isConnected, userAddress, isSigned, signedUser } = useSelector(state => {
        return {
            isConnected: state.wallet.isConnected,
            userAddress: state.wallet.walletAddress,
            web3: state.wallet.web3,
            isSigned: state.auth.isSigned,
            signedUser: state.auth.signedUser,
        }
    })
    const [formdata, setformdata] = useState({
      email: "",
      senderEmail: isSigned ? signedUser.email : '',
      message: "",
      check: false,
    });

    const [error, seterror] = useState({
      errorServer: false,
      errorServerMsg: "",
      errorEmail: false,
      errorSenderEmail: false,
      errorMessage: false,
      errorCheck: false,
    })

    useEffect(() => {
      seterror({
        ...error,
        errorServer: false,
        errorServerMsg: "",
        errorEmail: false,
        errorSenderEmail: false,
        errorMessage: false,
        errorCheck: false,
      });
      setformdata({
        email: "",
        senderEmail: isSigned ? signedUser.email : '',
        message: "",
        check: false,
      })
    }, [isOpen])

    const handleInput = (e) => {
      seterror({
        ...error,
        errorServer: false,
        errorServerMsg: "",
        errorEmail: false,
        errorSenderEmail: false,
        errorMessage: false,
        errorCheck: false,
      })
      const name = e.target.name;
      const value = name !== 'check' ? e.target.value : e.target.checked;
      setformdata({
        ...formdata,
        [name]: value
      })
    }

    const handleSubmit = () => {
      if (!web3) {
        web3 = new Web3(CHAIN_RPC);
        console.log("test");
      }
      if (!validator.isEmail(formdata.email) && !web3.utils.isAddress(formdata.email)) {
        seterror({
          ...error,
          errorEmail: true
        })
        return;
      }

      if (!validator.isEmpty(formdata.senderEmail) && !validator.isEmail(formdata.senderEmail)) {
        seterror({
          ...error,
          errorSenderEmail: true
        })
        return;
      }

    //   if (validator.isEmpty(formdata.message)) {
    //     seterror({
    //       ...error,
    //       errorMessage: true
    //     })
    //     return;
    //   }

      if (!web3.utils.isAddress(formdata.email) && !formdata.check) {
        seterror({
            ...error,
            errorCheck: true
          })
          return;
      }
      
      
      if (web3.utils.isAddress(formdata.email)) {
          if (selectedGFT.type === "wallet") {
              if (!isConnected) {
                  seterror({
                      ...error,
                      errorServer: true,
                      errorServerMsg: 'Please connect a wallet' 
                  })
                  return;
              }
              const contract = new web3.eth.Contract(
                  ContractAbi,
                  ContractAddr
              );
              
              contract.methods.safeTransferFrom(userAddress, formdata.email, selectedGFT.tokenId).send({from: userAddress})
              .then(res => {
                if (res.status) {
                  axios.post("/api/gftshoppe/transfer/transferbywallet", {sender: userAddress, formdata, tokenId: selectedGFT.tokenId, transactionHash: res.transactionHash})
                  .then(res1 => {
                      if (res1.data.status) {
                          toast.success("Successfully transferred");
                          setIsOpen(false);
                          setRefresh(!refresh);
                      }
                  })
                  .catch(err1 => {
                      console.log(err1)
                  })
                }
              })
              .catch(err => {
                  console.log(err)
              })
          } else {
            axios.post("/api/gftshoppe/transfer/transferfromemailtowallet", {userid: signedUser.id, formdata, tokenId: selectedGFT.tokenId})
            .then(res => {
              toast.success("Successfully transferred");
              setRefresh(!refresh);
              setIsOpen(false)
            })
            .catch(err => {
              toast.success("Something is wrong");
            })
          }
      } else {
        if (selectedGFT.type === "wallet") {
            axios.post("/api/gftshoppe/transfer/getAdminWallet")
            .then(res => {
                const contract = new web3.eth.Contract(
                    ContractAbi,
                    ContractAddr
                );
                console.log(selectedGFT.tokenId)
                console.log(res.data.adminWallet)
                contract.methods.safeTransferFrom(userAddress, res.data.adminWallet, selectedGFT.tokenId).send({from: userAddress})
                .then(res => {
                    if (res.status) {
                        axios.post("/api/gftshoppe/transfer/transfertoemail", {sender: userAddress, formdata, tokenId: selectedGFT.tokenId, transactionHash: res.transactionHash})
                        .then(res1 => {
                            if (res1.data.status) {
                                toast.success("Successfully transferred");
                                setIsOpen(false);
                                setRefresh(!refresh);
                            }
                        })
                        .catch(err1 => {
                            console.log(err1)
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                toast.success("Something is Wrong");
            })
        } else {
            axios.post("/api/gftshoppe/transfer/transferfromemailtoemail", {userid: signedUser.id, formdata, tokenId: selectedGFT.tokenId})
              .then(res1 => {
                  if (res1.data.status) {
                      toast.success("Successfully transferred");
                      setIsOpen(false);
                      setRefresh(!refresh);
                  }
              })
              .catch(err1 => {
                  console.log(err1)
              })
        }
      } 
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
                    Gift a GFT
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
                    <p className="text-black text-sm my-6">Please indicate either the ETH wallet address or email address of the recipient</p>
                    {error.errorServer ? <p className="text-red-500 text-sm py-1">{error.errorServerMsg}</p> : ''}
                    <div className="mb-4">
                        <input type="text" name="email" value={formdata.email} className={`shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.errorEmail ? 'border-red-500' : ''}`} placeholder="Receiver Wallet Address or Email Address" onChange={handleInput} />
                        {error.errorEmail ? <p className="text-red-500 text-sm pt-1">Please indicate the correct receiver wallet address or email address</p> : ''}
                    </div>
                    <div className="mb-4">
                        <input type="text" name="senderEmail" value={formdata.senderEmail} className={`shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.errorSenderEmail ? 'border-red-500' : ''}`} placeholder="Sender Email Address (optional)" onChange={handleInput} />
                        {error.errorSenderEmail ? <p className="text-red-500 text-sm pt-1">Please indicate the correct password</p> : ''}
                    </div>
                    <div className="mb-4">
                        <textarea type="text" rows="5" name="message" value={formdata.message} className={`shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.errorMessage ? 'border-red-500' : ''}`} placeholder="Gift message here" onChange={handleInput} ></textarea>
                        {error.errorMessage ? <p className="text-red-500 text-sm pt-1">Please indicate the correct Message</p> : ''}
                    </div>
                    <div className="form-check flex">
                        <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" name="check" checked={formdata.check} id="flexCheckDefault" onChange={handleInput} />
                        <label className="form-check-label inline-block text-black text-xs" htmlFor="flexCheckDefault">
                          To gift by email you must check this box.<br/>
                          By checking the box you agree to transfer a GFT to our wallet.<br/>
                          Your wallet will be prompted to execute the transfer.<br/>
                          The recipient will receive instructions via email on how to retrieve the GFT.<br/>  
                        </label>
                    </div>
                    {error.errorCheck ? <p className="text-red-500 text-sm pt-1 pl-2">Please read above line and check</p> : ''}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center pt-6 border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-purple-primary text-white active:bg-emerald-600 text-md px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 purple-btn-shadow"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Gift GFT
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`opacity-70 fixed inset-0 z-40 bg-black ${isOpen ? '' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
        </>
    )
}

export default TransferGFTModal;