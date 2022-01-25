import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from 'axios';
import { toast } from 'react-toastify';

import HamburgerMenu from 'react-hamburger-menu';
import SlidingPane from "react-sliding-pane";

import "react-sliding-pane/dist/react-sliding-pane.css";

import SignInModal from '../../containers/modals/signin';
import SignUpModal from '../../containers/modals/signup';
import { login, logout } from '../../redux/actions/authActions';
import { walletConnect, setAddress, setIsConnected, setWeb3 } from '../../redux/actions/walletActions';
import { CHAIN_ID, CHAIN_NAME, CHAIN_RPC } from '../../contract';
import LOGOIMAGE from '../../assets/img/logo.svg';

const Header = ({ collectionsRef, howitworksRef, faqRef }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isSigned, userAddress, isConnected } = useSelector(state => {
        return {
            isSigned: state.auth.isSigned,
            userAddress: state.wallet.walletAddress,
            isConnected: state.wallet.isConnected
        }
    })

    async function loadBlockChain() {
        
    }

    useEffect(() => loadBlockChain, []);

    const [signInOpen, setSignInOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [menuOpen, updateMenuOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(userAddress);
    const [showAddress, setShowAddress] = useState(null);

    useEffect(async () => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8080");
        
        const network = await web3.eth.net.getNetworkType();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts); // should give you main if you're connected to the main network via metamask...
        // setAccount(accounts[0]);
        if (accounts[0]) {
            dispatch(walletConnect({
                isConnected: true,
                address: accounts[0],
                web3: web3,
            }));
            setCurrentAddress(accounts[0]);
        }

        axios.post("/api/gftshoppe/auth/checkLogin")
        .then(res => {
            if (res.data.isLogined) {
                const data = {
                    isSigned: true,
                    email: res.data.email,
                    id: res.data.id,
                    token: res.data.token
                }
                dispatch(login(data));
            } else {
                console.log("not logined")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    useEffect(() => {
        dispatch(setAddress(currentAddress));
        if (currentAddress) {
            setShowAddress(currentAddress.substr(0, 4) + "..." + currentAddress.substr(currentAddress.length - 3))
        } else {
            setShowAddress("Connect Wallet");
            dispatch(setIsConnected(false));
        }
    }, [currentAddress])

    const goToCollections = async (e) => {
        e.preventDefault();
        if (collectionsRef) {
            collectionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            updateMenuOpen(false);
        } else {
            history.push("/testdemo");
            setTimeout(() => {
                if (window.innerWidth > 600) {
                    window.scrollTo({
                        top: 1400,
                        behavior: "smooth",
                    });
                } else {
                    window.scrollTo({
                        top: 500,
                        behavior: "smooth",
                    });
                }

            }, 200)
        }
    }

    const goToHowitworks = async (e) => {
        e.preventDefault();
        if (howitworksRef) {
            howitworksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            updateMenuOpen(false);
        } else {
            history.push("/testdemo");
            setTimeout(() => {
                if (window.innerWidth > 600) {
                    window.scrollTo({
                        top: 2150,
                        behavior: "smooth",
                    });
                } else {
                    window.scrollTo({
                        top: 1000,
                        behavior: "smooth",
                    });
                }

            }, 200)
        }
    }

    const goToFAQ = async (e) => {
        e.preventDefault();
        if (faqRef) {
            faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            updateMenuOpen(false);
        } else {
            history.push("/testdemo");
            setTimeout(() => {
                if (window.innerWidth > 600) {
                    window.scrollTo({
                        top: 3050,
                        behavior: "smooth",
                    });
                } else {
                    window.scrollTo({
                        top: 1000,
                        behavior: "smooth",
                    });
                }

            }, 200)
        }
    }

    const Logout = () => {
        axios.post("/api/gftshoppe/auth/logout")
        .then(res => {
            if (res.data.status) {
                dispatch(logout());
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const connectWallet = async () => {
        const providerOptions = {
            walletconnect: {
              package: WalletConnectProvider,
              options: {
                    rpc: {
                    137: 'https://rpc-mainnet.maticvigil.com/v1/b89438763cc1b513c5d0b9f743baf7e4abfb7157'
                    },
                    chainId: 137
              }
            }
        };
        const web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions // required
        });
        
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        await web3Modal.toggleModal();
        
        // const newWeb3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();
        if (chainId !== CHAIN_ID) {
            toast.success("Please switch to " + CHAIN_NAME);
            console.log(CHAIN_ID)
        }
        dispatch(walletConnect({
            isConnected: true,
            address: accounts[0],
            web3: web3,
        }));
        setCurrentAddress(accounts[0]);
    
        provider.on("accountsChanged", (accounts) => {
            setCurrentAddress(accounts[0]);
        });
        
        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
            if (parseInt(chainId, 16) !== CHAIN_ID) {
                toast.warning("Please switch to " + CHAIN_NAME);
            }
        });
    }

    const goToMygft = async (e) => {
        if (!isSigned && !isConnected)
            e.preventDefault()
    }

    return (
        <>
            <header className="bg-white-primary relative">
                <div className="container mx-auto">
                    <div className="block md:flex justify-between items-center pt-10 pb-24 overflow-x-hidden">
                        <div className="flex justify-center relative">
                            <NavLink to="/testdemo">
                                <img src={LOGOIMAGE} className="w-24 md:mr-10"/>
                            </NavLink>
                            <div className="block md:hidden absolute right-0 top-2">
                                    <HamburgerMenu
                                        isOpen={menuOpen}
                                        menuClicked={() => updateMenuOpen(true)}
                                        width={24}
                                        height={20}
                                        strokeWidth={5}
                                        rotate={0}
                                        color='black'
                                        borderRadius={0}
                                        animationDuration={0.5}
                                    />
                            </div>
                        </div>
                        <nav className="site-menus mt-5 md:mt-0">
                            <ul className="flex items-center justify-between md:justify-end">
                                <li className="hidden md:block mx-6"><NavLink to="" className="text-black-primary text-lg hover:text-opacity-70" onClick={goToCollections}>Collections</NavLink></li>
                                <li className="hidden md:block mx-6"><NavLink to="" className="text-black-primary text-lg hover:text-opacity-70" onClick={goToHowitworks}>How it works</NavLink></li>
                                <li className="hidden md:block mx-6"><NavLink to="" className="text-black-primary text-lg hover:text-opacity-70" onClick={goToFAQ}>FAQ</NavLink></li>
                                <li className="hidden md:block mx-6">
                                    <NavLink to="/mygft" className={` ${!isSigned && !isConnected ? 'text-gray-primary' : 'text-black-primary'} text-lg hover:text-opacity-70 tooltip`} onClick={goToMygft} >
                                        My GFTs
                                        <span className={` ${!isSigned && !isConnected ? 'tooltiptext' : 'hidden'}`}>Please connect your wallet or sign in to see your GFTs</span>
                                    </NavLink>
                                </li>
                                {isSigned ? 
                                    <li className="md:ml-24 mr-2"><button className="text-black-primary text-lg hover:text-opacity-70" onClick={Logout}>Log Out</button></li> :
                                    <>
                                        <li className="md:ml-24 mr-2"><button className="text-black-primary text-lg hover:text-opacity-70" onClick={() => setSignInOpen(true)}>Sign in</button></li>
                                        
                                        <span className="opacity-25">|</span>
                                        <li className="ml-2"><button className="text-black-primary text-lg hover:text-opacity-70" onClick={() => setSignUpOpen(true)}>Register</button></li>
                                    </>
                                }
                                <li className="ml-6">
                                    <button className="bg-black-primary text-white-primary px-5 py-2 rounded-2xl border-2 border-black-primary hover:bg-transparent hover:text-black-primary" onClick={connectWallet}>{showAddress}</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <SlidingPane
                        className="mobile-menu"
                        isOpen={menuOpen}
                        width="250px"
                        hideHeader={true}
                        onRequestClose={() => {
                            updateMenuOpen(false);
                    }}>
                        <ul>
                            <li className="my-12"><NavLink to="" className="text-white-primary font-bold text-2xl uppercase hover:text-opacity-70" onClick={goToCollections}>Collections</NavLink></li>
                            <li className="my-12"><NavLink to="" className="text-white-primary font-bold text-2xl uppercase hover:text-opacity-70" onClick={goToHowitworks}>How it works</NavLink></li>
                            <li className="my-12"><NavLink to="" className="text-white-primary font-bold text-2xl uppercase hover:text-opacity-70" onClick={goToFAQ}>FAQ</NavLink></li>
                            <li className="my-12">
                                <NavLink to="/mygft" className={` ${!isSigned && !isConnected ? 'text-gray-primary' : 'text-white-primary'} font-bold text-2xl uppercase hover:text-opacity-70`} onClick={goToMygft} >
                                    My GFTs
                                </NavLink>
                            </li>
                        </ul>
                    </SlidingPane>
                </div>
            </header>
            <SignInModal isOpen={signInOpen} setIsOpen={setSignInOpen} setSingUpOpen={setSignUpOpen} />
            <SignUpModal isOpen={signUpOpen} setIsOpen={setSignUpOpen} setSingInOpen={setSignInOpen} />
        </>
    );
};

export default Header;
