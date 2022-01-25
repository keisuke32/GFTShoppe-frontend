import React, { useEffect } from "react";

const InstructionsVideoModal = ({ isOpen, setIsOpen }) => {

  const closeVideo = async () => {
    let video = document.getElementById("video");
    video.currentTime = 0;
    video.pause();
    setIsOpen(false);
  }

  useEffect(() => {
    if(isOpen) {
      let video = document.getElementById("video");
      video.currentTime = 0;
      video.play();
    }
  }, [isOpen])

    return (
        <>
          <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${isOpen ? '' : 'hidden'}`}>
            <div className="relative w-11/12 my-6 mx-auto h-80vh">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-2 md:p-12">
                {/*header*/}
                <div className="flex items-start justify-between border-solid border-blueGray-200 rounded-t">
                  <button
                    className="ml-auto bg-transparent border-0 text-black float-right text-5xl leading-none outline-none focus:outline-none"
                    onClick={closeVideo}
                  >
                    <span className="p-0">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto video-wrapper">
                    {/* <ReactPlayer url='https://youtu.be/GL4B7ypCE9E' loop={true} playing={true} height="700px" width="100%" /> */}
                    <video id="video" src="./assets/video/GFT-Polygon.mp4" className="w-full rounded-2xl" controls />
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className={`opacity-70 fixed inset-0 z-40 bg-black ${isOpen ? '' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
        </>
    )
}

export default InstructionsVideoModal;