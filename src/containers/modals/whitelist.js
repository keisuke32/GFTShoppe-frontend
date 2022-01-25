import React from "react";
import axios from 'axios';
import { toast } from "react-toastify";

const whitelistModal = ({ isOpen, setIsOpen, whitelistAddress }) => {

    const submitWhitelist = () => {
        axios.post("/api/gftshoppe/mint/saveWhitelist", {whitelistAddress})
        .then(res => {
            if (res.data.status) {
                toast.success("successfully added")
                setIsOpen(false)
            } else {
                toast.warning(res.data.error)
            }
        })
        .catch(err => {
            toast.warn("Something is wrong");
        })
    }

    return (
        <>
          <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${isOpen ? '' : 'hidden'}`}>
            <div className="relative w-1/2 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-12">
                {/*header*/}
                <div className="flex items-start justify-between border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-5xl text-black font-extrabold mr-20">
                      GFT Holiday Edition
                  </h3>
                  <button
                    className="ml-auto bg-transparent border-0 text-black float-right text-5xl leading-none outline-none focus:outline-none"
                    onClick={submitWhitelist}
                  >
                    <span className="p-0">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                    <p className="pt-10 h-80">Thank you for submitting to the whitelist</p>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className={`opacity-70 fixed inset-0 z-40 bg-black ${isOpen ? '' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
        </>
    )
}

export default whitelistModal;