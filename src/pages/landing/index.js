import React, { useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';

const LandingPage = () => {

    const [email, setEmail] = useState('');

    const sendEmail = () => {
        axios({
            url: "/api/comingsoon/captureEmail",
            method: "post",
            data: {email}
        })
        .then( res => {
            if (res.data.status === 'success') {
                toast.success("Thank you for signing up!");
            } else {
                toast.warning(res.data.message);
            }
        })
        .catch( err => {
            toast.warning("Something is wrong.");
        })
    }

    return (
        <>
        <main className="bg-black-primary text-white-primary">
            <section className="p-0 pb-20 md:pt-40 md:pb-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl md:text-8xl text-center font-bold leading-tight uppercase">gft shoppe<br/>launching <span className="text-pink-primary">soon</span></h1>
                    <p className="text-center mt-20 text-lg">Sign up to be the first to know about GFT Shoppe’s drops</p>
                    <input placeholder="Your email" className="mt-10 w-1/3 px-5 py-3 bg-black-primary border border-solid border-purple-primary rounded-lg"  value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <div className="text-center mt-16 z-20">
                        <button className="bg-purple-primary text-white-primary px-20 py-3 rounded-xl border border-black-primary" onClick={sendEmail}>Sign Up</button>
                    </div>
                    <div className="mt-20 flex justify-between">
                        <img src="./assets/img/logo-white.svg" className="w-32"/>
                        <div className="text-right">
                            <p>Patent Pending</p>
                            <p className="mt-3">Copyright 2021 GFT Shoppe, Inc.<br/>All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
};
export default LandingPage;