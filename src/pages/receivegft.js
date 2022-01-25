import React, { useState } from "react";
import { useHistory } from 'react-router';

import axios from 'axios';
import { toast } from 'react-toastify';

import Web3 from "web3";

import Header from '../components/Header';
import Footer from '../components/Footer';
import { CHAIN_RPC } from "../contract";

const ReceiveGFT = (data) => {
    const routerHistory = useHistory();
    let id = data.match.params.id;
    const web3 = new Web3(CHAIN_RPC);

    const [formdata, setformdata] = useState({
        address: ''
    })
    const [error, seterror] = useState({
        errorServer: false,
        errorServerMsg: "",
        errorAddress: false,
    })
    const [statusText, setStatusText] = useState("Transaction is on Progress");
    const [status, setStatus] = useState("process");

    const handleInput = (e) => {
        seterror({
          ...error,
          errorServer: false,
          errorServerMsg: "",
          errorAddress: false,
        })
        const name = e.target.name;
        const value = e.target.value;
        setformdata({
          ...formdata,
          [name]: value
        })
    }

    const handleSubmit = () => {
        if (!web3.utils.isAddress(formdata.address)) {
            seterror({
              ...error,
              errorAddress: true
            })
            return;
        }

        axios.post("/api/gftshoppe/transfer/receiveGFT", {address: formdata.address, id})
        .then(res => {
            if (res.data.status) {
                toast.success("Successfully done.");
            } else {
                toast.warning(res.data.error);
            }
        })
        .catch(err => {
            toast.warning("Something is wrong.");
        })
    }
  

  return (
    <>
      <Header />
        <main>
          <div className="container">
            <header className="jumbotron">
                <h3 className="text-center text-5xl py-10">
                    GFT Retrieve
                </h3>
                <p className="text-center text-sm pt-3">Please input your wallet address and click receive button</p>
                <div className="text-center pb-10 pt-2">
                    <input type="text" name="address" value={formdata.address} className={`w-1/2 shadow appearance-none border rounded-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.errorAddress ? 'border-red-500' : ''} `} placeholder="Your Wallet address" onChange={handleInput}/>
                    {error.errorAddress ? <p className="text-red-500 text-sm pt-1">Please indicate the correct retriever wallet address</p> : ''}
                    <div className="w-full flex justify-center pt-10">
                        <button
                            className="bg-purple-primary text-white active:bg-emerald-600 text-md px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 purple-btn-shadow"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Retrieve
                        </button>
                    </div>
                </div>
            </header>
          </div>
        </main>
      <Footer />
    </>
  );
};

export default ReceiveGFT;