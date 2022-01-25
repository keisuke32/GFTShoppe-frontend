import React from "react";

import Collapsible from 'react-collapsible';

const InstructionsModal = ({ isOpen, setIsOpen }) => {

    return (
        <>
          <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${isOpen ? '' : 'hidden'}`}>
            <div className="relative w-11/12 my-6 mx-auto h-80vh">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5 md:p-12">
                {/*header*/}
                <div className="flex items-start justify-between border-solid border-blueGray-200 rounded-t">
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
                    <p className="text-center font-bold mt-5 text-2xl">The GFT Guidebook</p>
                    <p className="text-left mt-5">Setting up a crypto wallet is unnecessarily difficult. So is making sure you have the correct cryptocurrency and network configured in your wallet.</p>
                    <p className="text-left mt-5">It’s dial-up days for NFTs, and you can have skin in the game on day 1. The GFTShoppe team is here to help start your journey.</p>
                    <p className="text-left mt-5">To buy or retrieve your GFT, you will need to set up a crypto wallet and add some Matic cryptocurrency to your wallet. Here’s how:</p>
                    <div>
                        <div className="roadmap w-full rounded-lg mt-10">
                            <Collapsible trigger="Install MetaMask on your Computer">
                                <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                    The first step to setting up your crypto wallet is to install MetaMask on your computer. Find out here:<br/><br/>
                                    <span className="font-bold">Step 1.</span> Go to the <a href="https://metamask.io/" className="underline text-purple-primary">MetaMask website</a>.<br/><br/>
                                    <span className="font-bold">Step 2.</span> Click “Download” and follow the steps to install the appropriate app or browser extension.<br/><br/>
                                    How to tell if your MetaMask is installed:<br/><br/>
                                    You will know MetaMask has been installed when you see the fox logo on the upper right hand corner of your browser. If you do not see the fox icon, click on the puzzle piece icon in the upper right hand corner to view all extensions. Once you see the fox icon, click the pin icon to “pin” the MetaMask extension to your browser so you can see it. 
                                </p>
                            </Collapsible>
                            <Collapsible trigger="Activate Your MetaMask Wallet">
                                <p className="text-black-primary text-xl w-full md: pb-4">
                                    One of the first tasks you will want to do on MetaMask is to install a wallet to hold your cryptocurrencies. To do this, follow the instructions below.<br/><br/>    
                                    <span className="font-bold">Step 1.</span> Click on the MetaMask logo in the upper right hand corner of your browser.<br/><br/>
                                    <span className="font-bold">Step 2.</span> Click “Get Started,” “Create a Wallet,” “I agree,” enter a password and click “Create” to create your wallet.<br/><br/>
                                    <span className="font-bold">Step 3.</span> Write Down your Seed Phrase. You will see a set of 12 “seed words” for your vault. Click “Download this Secret Recovery Phrase and keep it stored safely on an external encrypted hard drive or storage medium” and copy the file that is downloaded to a safe place. You will need it to access your vault. Click “Next.”<br/><br/>
                                    <span className="font-bold">Step 4.</span> Enter your seed phrase in MetaMask by clicking on the words in the proper order and you’ll be taken into your MetaMask wallet.<br/><br/>
                                    <span className="font-bold">IMPORTANT:</span><br/><br/>
                                    * Your seed phrase is the list of 12 words. Seed phrase and seed words are often used interchangeably<br/>
                                    * If you lose your seed phrase, you may become locked out of your crypto wallet. No one else can unlock your wallet except you. Write it down on paper in a few places!<br/>
                                    * Never give out your seed phrase to anyone. If someone hacks your phone or computer and finds out your seed phrase, they can take all of the cryptocurrency in your crypto wallet   
                                </p>
                            </Collapsible>
                            <Collapsible trigger="Buy Ethereum with MetaMask or an Exchange">
                                <p className="text-black-primary text-xl w-full md: pb-4">
                                    Time to buy some crypto! You will need a small amount of You can purchase Ethereum through MetaMask or an exchange:<br/><br/>
                                    <span className="font-bold">Option A. Buy Ethereum on MetaMask</span><br/>
                                    Use the “Buy” button to add Ether to your wallet.  You can buy Ether directly on MetaMask by using a credit or debit card (via Wyre or Transak).<br/><br/>
                                    <span className="font-bold">Option B - Buy Ethereum on an exchange and send to MetaMask</span><br/>
                                    <span className="font-bold">Step 1.</span> Create an account on an exchange like <a href="https://www.coinbase.com/" className="underline text-purple-primary">Coinbase</a> or <a href="https://www.binance.us/en/home" className="underline text-purple-primary">Binance</a> where you can easily connect your credit card or bank account and purchase cryptocurrency. The exchange will take a small fee for every transaction that you make.<br/><br/>
                                    <span className="font-bold">Step 2.</span> Send Ethereum from the exchange to your MetaMask wallet by addressing the transfer to your public wallet address. You can copy your public address from your MetaMask wallet here:
                                </p>
                                <img src="./assets/img/instruction-3-1.png" className="w-full md:w-1/2"/>
                            </Collapsible>
                            <Collapsible trigger="Set up your Matic Mainnet Network">
                                <p className="text-black-primary text-xl w-full md: pb-4">
                                    GFTs were developed with an add-on “layer 2” system called Polygon that uses the Matic Network to lower the gas fees for every transaction. Set up your MetaMask for Matic:<br/><br/>
                                    <span className="font-bold">Step 1.</span> Click the MetaMask icon on your browser<br/><br/>
                                    <span className="font-bold">Step 2.</span> Click the network drop-down menu. The default network will likely be “Ethereum Mainnet”<br/><br/>
                                    <span className="font-bold">Step 3.</span> On the drop-down menu, click “Custom RPC” and fill out the network credentials with the following information:<br/><br/>
                                    Network Name: Matic Mainnet<br/>
                                    New RPC URL: <a href="https://rpc-mainnet-maticvigil.com/" className="underline text-purple-primary">https://rpc-mainnet-maticvigil.com/</a><br/>
                                    Chain ID: 137<br/>
                                    Currency Symbol (optional): MATIC<br/>
                                    Block Explorer URL (optional): <a href="https://polygonscan.com/" className="underline text-purple-primary">https://polygonscan.com/</a>
                                </p>
                                <img src="./assets/img/instruction-4-1.png" className="w-full md:w-1/2"/>
                                <br/>
                                <p className="text-black-primary text-xl w-full md: pb-4">
                                    <span className="font-bold">Step 4.</span> Click the “Save” button when you are finished. You will be directly switched to Polygon’s Mainet now in the network dropdown list. You can now close the dialog.
                                </p>
                            </Collapsible>
                            <Collapsible trigger="Bridge Matic to your MetaMask Wallet">
                                <p className="text-black-primary text-xl w-full md: pb-4">
                                    To mint a GFT, you will need to transfer, or “bridge” Ethereum into the Matic network. Learn how to here:<br/><br/>
                                    Before bridging Ethereum to Matic in your MetaMask Wallet make sure you have:<br/>
                                    &nbsp;&nbsp;&nbsp;A. Ethereum in your MetaMask Wallet. Learn how to here.<br/>
                                    &nbsp;&nbsp;&nbsp;B. Set up the Matic Mainnet in your MetaMasek Wallet. Learn how to here.<br/><br/>
                                    <span className="font-bold">Step 1.</span> Head to the Polygon Web Wallet tool and connect your MetaMask wallet. Make sure you are signed into your MetaMask wallet. A menu will pop-up asking you to “Sign” approval for granting connection access to your wallet.<br/>
                                </p>
                                <img src="./assets/img/instruction-5-1.png" className="w-full md:w-1/2"/>
                                <br/>
                                <p className="text-black-primary text-xl w-full md: pb-4">
                                    <span className="font-bold">Step 2.</span> Once you’ve connected your MetaMask wallet, select “Polygon Bridge.” This will take you to the bridging module where you can bridge your Ether to Matic. 
                                </p>
                                <img src="./assets/img/instruction-5-2.png" className="w-full md:w-1/2"/>
                                <br/>
                                <p className="text-black-primary text-xl w-full md: pb-4">
                                    <span className="font-bold">Step 3.</span> Enter the amount of Ether that you would like to bridge to Matic, and select the transfer button.
                                </p>
                                <img src="./assets/img/instruction-5-3.png" className="w-full md:w-1/2"/>
                                <br/>
                                <p className="text-black-primary text-xl w-full md: pb-4">
                                    <span className="font-bold">Video Instructions</span><br/>
                                    <a href="https://www.youtube.com/watch?v=WAStJtjYI_c">https://www.youtube.com/watch?v=WAStJtjYI_c</a>
                                </p>
                            </Collapsible>
                        </div>
                    </div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className={`opacity-70 fixed inset-0 z-40 bg-black ${isOpen ? '' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
        </>
    )
}

export default InstructionsModal;