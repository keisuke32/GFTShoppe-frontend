import React, { useEffect } from "react";
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { toast } from "react-toastify";
// import { verifyUser } from "../services/auth.service";
// import { Link } from "react-router-dom";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { login } from '../../redux/actions/authActions';

const Welcome = (data) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let code = data.match.params.code;
    useEffect(() => {
        axios.post("/api/gftshoppe/auth/confirmRegister", {code})
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
            setTimeout(() => {
              history.push("/home");
            }, 3000)
          } else {
            toast.warning(res.data.error);
          }
        })
        .catch(err => {
          toast.warning("Something is wrong");
        })
    }, []);

  return (
    <>
      <Header />
        <main>
          <div className="container">
            <header className="jumbotron">
              <h3 className="text-center text-5xl py-10">
                <strong>Thank you for registering with GFTShoppe</strong>
              </h3>
            </header>
          </div>
        </main>
      <Footer />
    </>
  );
};

export default Welcome;