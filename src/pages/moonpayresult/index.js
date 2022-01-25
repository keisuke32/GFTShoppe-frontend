import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';

import queryString from 'query-string';
import axios from 'axios';

// import { toast } from 'react-toastify'
// import { verifyUser } from "../services/auth.service";
// import { Link } from "react-router-dom";

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MoonpayResult = (data) => {
    const routerHistory = useHistory();
    const params = queryString.parse(window.location.search);
    let id = data.match.params.id;

    const [statusText, setStatusText] = useState("Transaction is on Progress");
    const [status, setStatus] = useState("process");

    useEffect(() => {
      if (params.transactionStatus === 'pending') {

      }
        axios.post("/api/gftshoppe/mint/buy", {id})
        .then(res => {
            if (res.data.status) {
              setStatusText("Successfully purchased");    
              setStatus("done")
            } else {
              setStatusText(res.data.error);    
            }
            setTimeout(() => {
              routerHistory.push("/mygft");
            }, 1000)
        })
        .catch(err => {
          setStatusText("Something is wrong");
        })
    }, []);

  return (
    <>
      <Header />
        <main>
          <div className="container">
            <header className="jumbotron">
              <h3 className="text-center text-5xl py-10">
                <strong>{statusText}</strong>
                {status === 'process' ? 
                  <div className="flex items-center justify-center w-full py-10">
                    <div className="w-24 h-24 border-l-2 border-green-900 rounded-full animate-spin"></div>
                  </div>
                : ''}
              </h3>
            </header>
          </div>
        </main>
      <Footer />
    </>
  );
};

export default MoonpayResult;