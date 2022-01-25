import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { FaTree, FaDiscord, FaCheckCircle } from 'react-icons/fa';
import { FiGift, FiShoppingCart } from 'react-icons/fi';
import Collapsible from 'react-collapsible';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import InstructionsModal from '../../containers/modals/instructions';
import InstructionsVideoModal from '../../containers/modals/instructions-video';
import WhitelistModal from '../../containers/modals/whitelist';
import ResetPwdModal from '../../containers/modals/resetPwd';

const Homepage = () => {
    const params = queryString.parse(window.location.search);

    const { web3 } = useSelector(state => {
        return {
            web3: state.wallet.web3
        }
    })
    const collectionsRef = useRef();
    const howitworksRef = useRef();
    const faqRef = useRef();

    const [gftCount, setGFTCount] = useState(1);
    const [instructionsOpen, setInstructionsOpen] = useState(false);
    const [instructionsVideoOpen, setInstructionsVideoOpen] = useState(false);
    const [whitelistAddress, setWhitelistAddress] = useState("");
    const [isOpenWhitelist, setIsOpenWhitelist] = useState(false);
    const [isOpenResetPwd, setIsOpenResetPwd] = useState(false);
    const [resetPwdToken, setResetPwdToken] = useState(false);

    useEffect(() => {
        if (params.token) {
            setResetPwdToken(params.token)
            setTimeout(() => {
                setIsOpenResetPwd(true)
            }, 500)
        }
    }, []);

    const submitWhitelist = () => {
        if (!web3.utils.isAddress(whitelistAddress)) {
            return toast.warn("Please input valid wallet address")
        }
        axios.post("/api/gftshoppe/mint/checkWhitelist", {whitelistAddress})
        .then(res => {
            if (res.data.status) {
                setIsOpenWhitelist(true)
            } else {
                toast.warn(res.data.error);
            }
        })
        .catch(err => {
            console.log(err)
            toast.warn("Something is wrong");
        })
    }

    return (
        <>
        <Header collectionsRef={collectionsRef} howitworksRef={howitworksRef} faqRef={faqRef} />
        <main>
            <section className="p-0 pb-20 pt-0 md:pt-10 relative">
                <div className="container mx-auto relative">
                    <h1 className="text-3xl md:text-6xl text-center font-bold leading-tight">This holiday season,<br/>give the gift of a GFT</h1>
                    <p className="text-center mt-10 text-lg">GFTs are limited edition NFTs made especially for gifting</p>
                    <div className="w-2/5 h-96 absolute left-64 bg-pink-primary opacity-70 transform -rotate-180 blur-effect -z-10"></div>
                    <div className="w-2/5 h-96 absolute right-64 bg-purple-primary opacity-70 transform -rotate-180 blur-effect -z-10"></div>
                    <div className="text-center mt-16 z-20 relative top-0">
                        <a href="#collections" className="bg-black-primary text-white-primary px-5 py-2 rounded-xl border-2 border-black-primary hover:bg-transparent hover:text-black-primary">Buy a GFT</a>
                        <div className="flex justify-center w-full absolute -bottom-20 -z-20">
                            <img src="./assets/img/confetti.gif" className="w-full h-100"/>
                        </div>
                    </div>
                </div>
                <FiGift size={55} className="absolute left-1/5 top-20 transform rotate-15 gfticonbox hidden md:block" />
                <div className="absolute uppercase right-1/5 top-20 transform -rotate-15 gfticonbox text-xl font-bold hidden md:block">nft</div>
                <div className="absolute uppercase left-1/4 bottom-28 transform rotate-15 gfticonbox text-xl font-bold hidden md:block">gft</div>
                <div className="absolute uppercase right-1/5 bottom-28 transform -rotate-15 gfticonbox text-xl font-bold hidden md:block">surprise</div>
            </section>
            <section>
                <div className="container mx-auto coming-soon">
                    <div className="flex items-center justify-between px-10 flex-col md:flex-row bg-white-primary rounded-xl">
                        <img src="./assets/img/atari.png" className="w-64"/>
                        <div className="text-center">
                            <p className="text-lg font-bold leading-10">Coming Soon</p>
                            <h3 className="black-primary text-3xl font-bold">Atari GFTs</h3>
                        </div>
                        {/* <ReactPlayer url='https://youtu.be/Irq3P7mYiyk' loop={true} playing={true} muted={true} height="200px" width="13rem" /> */}
                        <div className="w-60 p-5">
                            <video src="./assets/video/NFTXX-Unknown.mp4" autoPlay loop muted className="w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-20">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h3 className="black-primary text-3xl font-bold">Inside Every GFT is a Surprise NFT</h3>
                    </div>
                    <div className="flex justify-between flex-col md:flex-row">
                        <div className="p-12 w-full md:w-1/3">
                            <img src="./assets/img/nft1.png" className="w-full md:w-4/5"/>
                            <p className="ml-5 mt-5 text-black-primary">A GFT is an NFT, or non-fungible token, on the blockchain.</p>
                        </div>
                        <div  className="p-12 w-full md:w-1/3">
                            <img src="./assets/img/nft2.png" className="w-full md:w-4/5"/>
                            <p className="ml-5 mt-5 text-black-primary">There are 10,000 GFTs in each collection, some more rare than others.</p>
                        </div>
                        <div  className="p-12 w-full md:w-1/3">
                            <img src="./assets/img/nft3.png" className="w-full md:w-4/5"/>
                            <p className="ml-5 mt-5 text-black-primary">On December 25th, Holiday Edition GFTs will unwrap, and holders will find out exactly what’s inside their GFT surprise gift box.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="collections" className="pt-20" ref={collectionsRef} >
                <div className="container mx-auto">
                    <div className="text-center">
                        <h3 className="black-primary text-3xl font-bold">Limited Edition GFT Collections</h3>
                    </div>
                    <div className="flex justify-between mt-10 flex-col md:flex-row">
                        <div className="w-full md:w-1/3 p-3 relative">
                            {/* <div className="blur-circle absolute w-full h-2/4 -left-1/4 -top-10 bg-purple-primary opacity-50 rounded-full -z-10"></div> */}
                            <div className="p-6 bg-white-primary rounded-lg gft-collection-box z-200">
                                <img src="./assets/img/gftbox.png" className="w-full rounded-lg"/>
                                <div className="flex justify-between mt-5">
                                    <h4 className="text-black-primary text-lg font-bold">GFT Holiday Edition</h4>
                                    <div className="px-1 text-white-primary bg-pink-primary flex items-center rounded-md">
                                        <FaCheckCircle size={10} />
                                        <span className="uppercase ml-1 mt-0 md:mt-1 text-xs">gft</span>
                                    </div>
                                </div>
                                <p className="text-xs opacity-50 mt-2">Price</p>
                                <div className="flex justify-start mt-1">
                                    <img src="./assets/img/price.png" className="h-5" />
                                    <h5 className="text-md font-bold ml-2">0.02</h5>
                                </div>
                                <div className="mt-5 flex justify-between">
                                    <NavLink to={`/holiday_edition?amount=${gftCount}`} className="bg-purple-primary text-white-primary py-2 w-full text-center rounded-md shadow-3xl border border-solid border-purple-primary hover:bg-white-primary hover:text-purple-primary">Buy now</NavLink>
                                </div>
                            </div>
                            <div className="flex justify-between mt-5">
                                <input className="h-12 w-3/4 rounded-lg border border-solid border-purple-primary/20 text-black-primary placeholder-black-primary placeholder-opacity-30 px-5 shadow-5xl" placeholder="ETH wallet for whitelist" value={whitelistAddress} onChange={(e) => setWhitelistAddress(e.target.value)}></input>
                                <button className="w-1/5 h-12 bg-white-primary rounded-lg border border-solid border-purple-primary/20 text-black-primary shadow-5xl" onClick={submitWhitelist}>Submit</button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 p-3 relative">
                            {/* <div className="blur-circle absolute w-full h-2/4 -left-1/4 -top-10 bg-purple-primary opacity-50 rounded-full -z-10"></div> */}
                            <div className="p-6 bg-white-primary rounded-lg gft-collection-box z-200">
                                <img src="./assets/img/ataribox.png" className="w-full rounded-lg"/>
                                <div className="flex justify-between mt-5">
                                    <h4 className="text-black-primary text-lg font-bold">Atari Edition One</h4>
                                    <div className="px-1 text-white-primary bg-red-primary flex items-center rounded-md">
                                        <FaCheckCircle size={10} />
                                        <span className="ml-1 mt-1 text-xs">Atari</span>
                                    </div>
                                </div>
                                <p className="text-xs opacity-50 mt-2">Price</p>
                                <div className="flex justify-start mt-1">
                                    <img src="./assets/img/price.png" className="h-5" />
                                    <h5 className="text-md font-bold ml-2">0.05</h5>
                                </div>
                                <div className="mt-5">
                                    <button className="bg-white-secondary text-gray-primary py-2 w-full rounded-md shadow-4xl">Coming soon</button>
                                </div>
                            </div>
                            <div className="flex justify-between mt-5">
                                <input className="h-12 w-3/4 rounded-lg border border-solid border-purple-primary/20 text-black-primary placeholder-black-primary placeholder-opacity-30 px-5 shadow-5xl" placeholder="ETH wallet for whitelist"></input>
                                <button className="w-1/5 h-12 bg-white-primary rounded-lg border border-solid border-purple-primary/20 text-black-primary shadow-5xl">Submit</button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 p-3 relative">
                            {/* <div className="blur-circle absolute w-full h-2/4 -left-1/4 -top-10 bg-purple-primary opacity-50 rounded-full -z-10"></div> */}
                            <div className="p-6 bg-white-primary rounded-lg gft-collection-box z-200">
                                <img src="./assets/img/coming_soon.png" className="w-full"/>
                                <div className="flex justify-between mt-5">
                                    <h4 className="text-black-primary text-lg font-bold">Future Collections</h4>
                                    <div className="px-1 text-gray-secondary bg-gray-secondary flex items-center rounded-md">
                                        <FaCheckCircle size={10} />
                                        <span className="ml-1 mt-0 md:mt-1 text-xs">Atari</span>
                                    </div>
                                </div>
                                <p className="text-xs opacity-50 mt-2">Price</p>
                                <div className="flex justify-start mt-1">
                                    <img src="./assets/img/price.png" className="h-5" /> 
                                    <h5 className="text-md font-bold ml-2">-</h5>
                                </div>
                                <div className="mt-5">
                                    <button className="bg-white-secondary text-gray-primary py-2 w-full rounded-md shadow-4xl">Coming soon</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-20" ref={howitworksRef}>
                <div className="container mx-auto">
                    <div className="text-center">
                        <h3 className="black-primary text-3xl font-bold">How it works</h3>
                    </div>
                    <div className="flex justify-between flex-col md:flex-row">
                        <div className="p-12 w-full md:w-1/3">
                            <div className="flex">
                                <div className="relative">
                                    <FiShoppingCart size={55} className="gfticonbox" color="#5633D5" />
                                    <span className="w-5 h-5 absolute left-11 -top-2 bg-purple-primary rounded-full -z-10"></span>
                                </div>
                                <div className="ml-10">
                                    <p className="text-xs text-purple-primary font-bold">Step 1</p>
                                    <p className="text-xl text-black-primary mt-1">Buy your GFT</p>
                                </div>
                            </div>
                            <p className="mt-10 text-black-primary text-sm">
                                To buy a GFT you need a crypto wallet. If you don’t have a wallet, instructions on how to set one up are <a className="underline cursor-pointer"  onClick={ () => setInstructionsOpen(true) }>here</a> and a video is <a className="underline cursor-pointer"  onClick={ () => setInstructionsVideoOpen(true) }>here</a>.
                            </p>
                        </div>
                        <div className="p-12 w-full md:w-1/3">
                            <div className="flex">
                                <div className="relative">
                                    <FiGift size={55} className="gfticonbox" color="#5633D5" />
                                    <span className="w-5 h-5 absolute left-11 -top-2 bg-purple-primary rounded-full -z-10"></span>
                                </div>
                                <div className="ml-10">
                                    <p className="text-xs text-purple-primary font-bold">Step 2</p>
                                    <p className="text-xl text-black-primary mt-1">Gift your GFT</p>
                                </div>
                            </div>
                            <p className="mt-10 text-black-primary text-sm">
                                Send the GFT to a lucky recipient. Or keep it for yourself — we won’t blame you!
                            </p>
                        </div>
                        <div className="p-12 w-full md:w-1/3">
                            <div className="flex">
                                <div className="relative">
                                    <FaTree size={55} className="gfticonbox" color="#5633D5" />
                                    <span className="w-5 h-5 absolute left-11 -top-2 bg-purple-primary rounded-full -z-10"></span>
                                </div>
                                <div className="ml-10">
                                    <p className="text-xs text-purple-primary font-bold">Step 3</p>
                                    <p className="text-xl text-black-primary mt-1">Unwrap your GFT</p>
                                </div>
                            </div>
                            <p className="mt-10 text-black-primary text-sm">
                                On December 25th, your surprise gift box will automatically unwrap. Head over to OpenSea to find out which collectible is inside! Join the online community of GFT owners and spread the GFT love to others.
                            </p>
                            <a href="https://discord.com/invite/ntSaG8b9sW" className="flex items-center text-purple-primary font-bold mt-5">Join Discord <FaDiscord size={20} color="#5633D5" className="ml-2" /></a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-20">
                <div className="container mx-auto">
                    <div className="px-0 md:px-20">
                        <img src="./assets/img/gfthouse.png" className="w-full"/>
                    </div>
                </div>
            </section>
            <section className="pt-20" ref={faqRef}>
                <div className="container mx-auto">
                    <div className="text-center">
                        <h3 className="black-primary text-3xl font-bold">FAQ</h3>
                    </div>
                    <div className="roadmap w-full bg-white-primary shadow-6xl rounded-lg mt-20 px-10 py-4">
                        <Collapsible trigger="What are GFTs?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                GFTs are NFTs designed for gifting, just in time for the holidays. Each GFT is an NFT built on the blockchain, wrapped in a digital box. All GFTs will unwrap on December 25th.
                            </p>
                        </Collapsible>
                        <Collapsible trigger="What is an NFT?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                NFT stands for Non Fungible Token. An NFT is a crypto token that represents a specific asset on a blockchain. NFTs come in many forms, from a flat jpeg, to videos, virtual land and even music.
                            </p>
                        </Collapsible>
                        <Collapsible trigger="How many GFTs are there?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                There are 10,000 GFTs in each collection. Within each collection there are a variety of GFT types, some more rare than others.
                            </p>
                        </Collapsible>
                        <Collapsible trigger="What is the GFT Shoppe?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                The GFT Shoppe is your go-to digital destination to purchase GFTs for the holidays. There is also a storefront in the Decentraland metaverse. Check it out here.
                            </p>
                        </Collapsible>
                        <Collapsible trigger="When can I buy a GFT?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                Beginning on December 19th, GFTs will be available for purchase on the GFT Shoppe website (www.gftshoppe.com).
                            </p>
                        </Collapsible>
                        <Collapsible trigger="How do I buy a GFT?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                When you buy a GFT from the GFT Shoppe website, you are minting the NFT and claiming its ownership on the blockchain. To purchase a GFT you will need a crypto wallet. Learn how to set one up <a className="underline cursor-pointer"  onClick={ () => setInstructionsOpen(true) }>here</a>. Consider GFTs to be your gateway into crypto.
                            </p>
                        </Collapsible>
                        <Collapsible trigger="How do I give a GFT?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                You can give someone a GFT by directly sending the GFT to their crypto wallet.
                            </p>
                        </Collapsible>
                        <Collapsible trigger="What are gas fees?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                Gas fees are the transaction fees that you are required to pay if you buy or send something on the Ethereum blockchain. The more people conducting transactions on Ethereum at a time, the higher the gas fees will be. As Ethereum and NFTs have become more popular, gas fees have become very high. Not to worry, we have a solution for that...
                            </p>
                        </Collapsible>
                        <Collapsible trigger="How are GFTs designed for gifting?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                We developed Holiday Edition GFTs with a layer 2 system called Polygon that lowers the gas fees for every transaction. This means you can send a GFT to a friend without paying an exorbitant price for the transfer itself.
                            </p>
                        </Collapsible>
                        <Collapsible trigger="How else are GFTs designed for gifting?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                They come in a digitally wrapped box! On December 25th, all GFTs will “unwrap” and reveal the GFT present inside.
                            </p>
                        </Collapsible>
                        <Collapsible trigger="Why should I buy a GFT?">
                            <p className="text-black-primary text-xl w-full md:w-3/5 pb-4">
                                NFT was the Collins Dictionary word of the year—GFTs are the most on-trend holiday gifts to buy this season. GFTs won’t be delayed by Amazon. They won’t be damaged by UPS. You don’t need to sit in traffic to buy them at the mall. Deadlines for holiday shipping are fast approaching, and we know you forgot to buy a present for your parents. Plus, they’re adorable.
                            </p>
                        </Collapsible>
                    </div>
                    <div className="my-10 text-center">
                        <a href="#collections" className="bg-purple-primary text-white-primary py-2 px-10 rounded-md shadow-3xl border border-solid border-purple-primary hover:bg-white-primary hover:text-purple-primary">Buy now</a>
                    </div>
                </div>
            </section>
            <InstructionsModal isOpen={instructionsOpen} setIsOpen={setInstructionsOpen} />
            <InstructionsVideoModal isOpen={instructionsVideoOpen} setIsOpen={setInstructionsVideoOpen} />
            <WhitelistModal isOpen={isOpenWhitelist} setIsOpen={setIsOpenWhitelist} whitelistAddress={whitelistAddress}/>
            <ResetPwdModal isOpen={isOpenResetPwd} setIsOpen={setIsOpenResetPwd} token={resetPwdToken}/>
        </main>
        <Footer />
        </>
    );
};
export default Homepage;

