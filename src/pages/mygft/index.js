import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TransferGFTModal from '../../containers/modals/transferGFT';
import TransferGFTToWalletModal from '../../containers/modals/transferGFTToWallet';
import { ContractAddr, ContractAbi, CHAIN_RPC } from '../../contract';

const MyGFT = () => {
    const {isSigned, signedUser, isConnected, web3, userAddress} = useSelector(state => {
        console.log(state.wallet)
        return {
            isSigned: state.auth.isSigned,
            signedUser: state.auth.signedUser,
            isConnected: state.wallet.isConnected,
            web3: state.wallet.web3,
            userAddress: state.wallet.walletAddress
        }
    })

    const [myGFTList, setMyGFTList] = useState([]);
    const [myGFTListProcessing, setMyGFTListProcessing] = useState(false);
    const [myEmailGFTList, setMyEmailGFTList] = useState([]);
    const [myEmailGFTListProcessing, setMyEmailGFTListProcessing] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedGFT, setSelectedGFT] = useState({
        tokenId: -1,
        type: ""
    });
    const [isOpenTransferModal, setOpenTransferModal] = useState(false);
    const [isOpenTransferToWalletModal, setOpenTransferToWalletModal] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(async () => {
        if (isConnected) {
            if (web3) {
                await setMyGFTList([]);
                await setMyGFTListProcessing(true);
                const contract = new web3.eth.Contract(
                    ContractAbi,
                    ContractAddr
                );
                const tokenIds = await contract.methods.walletOfUser(userAddress).call();
                // console.log(tokenIds);return;
                await Promise.all(tokenIds.map( async tokenId => {
                    const tokenURI = await contract.methods.tokenURI(tokenId).call();
                    console.log(tokenURI)
                    var request = new XMLHttpRequest();
                    request.open('GET', tokenURI, true);
                    request.send(null);
                    request.onreadystatechange = async function () {
                        if (request.readyState === 4 && request.status === 200) {
                            var type = await request.getResponseHeader('Content-Type');
                            console.log("okay")
                            if (type.indexOf("text") !== 1) {
                                let metadata = JSON.parse(request.responseText);
                                metadata.tokenId = tokenId;
                                metadata.type = 'wallet';
                                metadata.holderAddress = userAddress;
                                setMyGFTList(state => [metadata, ...state])
                                console.log(myGFTList)
                            }
                        }
                    }
                }));
                setMyGFTListProcessing(false);
            }
        } else {
            setMyGFTList([])
        }
    }, [isConnected, refresh]);

    // useEffect(async () => {
    //     // get gfts from db
    //     if (isSigned) {
    //         await setMyEmailGFTList([]);
    //         await setMyEmailGFTListProcessing(true);
    //         axios.post("/api/gftshoppe/mint/getGFTs", {id: signedUser.id})
    //         .then(async res => {
    //             if (res.data.status) {
    //                 const web3 = new Web3(CHAIN_RPC);
    //                 const contract = new web3.eth.Contract(
    //                     ContractAbi,
    //                     ContractAddr
    //                 );
    //                 const tokenIds = res.data.tokenIds;
    //                 await Promise.all(tokenIds.map( async tokenId => {
    //                     console.log(tokenId)
    //                     const tokenURI = await contract.methods.tokenURI(tokenId).call();
    //                     var request = new XMLHttpRequest();
    //                     request.open('GET', tokenURI, true);
    //                     request.send(null);
    //                     request.onreadystatechange = async function () {
    //                         if (request.readyState === 4 && request.status === 200) {
    //                             var type = await request.getResponseHeader('Content-Type');
    //                             if (type.indexOf("text") !== 1) {
    //                                 let metadata = JSON.parse(request.responseText);
    //                                 metadata.tokenId = tokenId;
    //                                 metadata.type = 'email';
    //                                 metadata.holderAddress = res.data.adminAddress;
    //                                 setMyEmailGFTList(state => [metadata, ...state])
    //                                 console.log(tokenURI)
    //                             }
    //                         }
    //                     }
    //                 }))
    //                 await setMyEmailGFTListProcessing(false);
    //             } else {
    //                 await setMyEmailGFTListProcessing(false);
    //                 toast.warning(res.data.error)    
    //             }
    //         })
    //         .catch(async err => {
    //             console.log(err)
    //             await setMyEmailGFTListProcessing(false);
    //             toast.warning("Something is wrongs")
    //         })
    //     } else {
    //         setMyEmailGFTList([])
    //     }
    // }, [isSigned, refresh])

    const transferGFT = (tokenId, type) => {
        setSelectedGFT({
            ...selectedGFT,
            tokenId: tokenId,
            type: type
        });
        setOpenTransferModal(true)
    }

    const transferGFTToWallet = (tokenId, type) => {
        setSelectedGFT({
            ...selectedGFT,
            tokenId: tokenId,
            type: type
        });
        setOpenTransferToWalletModal(true)
    }

    const transfertoownWallet = (tokenId, type) => {
        axios.post("/api/gftshoppe/transfer/transfertoownwallet", {tokenId, userid: signedUser.id, address: userAddress})
        .then(res => {
            if (res.data.status) {
                toast.warning("Successfully transferred");
                setRefresh(!refresh)
            } else {
                toast.warning(res.data.error);    
            }
        })
        .catch(err => {
            toast.warning("Something is wrong");
        })
    }

    return (
        <>
        <Header />
        <main>
            <section className="my-0 md:my-20">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h3 className="black-primary text-3xl font-bold">My GFTs</h3>
                    </div>
                    <div className="flex justify-start flex-wrap mt-10">
                    {!myGFTListProcessing ? myGFTList.map((metadata, index) => {
                        return (
                            <div className="w-1/3 p-3 relative">
                                <div className="p-6 bg-white-primary rounded-lg gft-collection-box z-200">
                                    <img src={metadata.image} className="w-full rounded-xl"/>
                                    <div className="flex justify-between mt-5">
                                        <h4 className="text-black-primary text-lg font-bold">GFT Holiday Edition</h4>
                                        <div className="px-1 text-white-primary bg-pink-primary flex items-center rounded-md">
                                            <FaCheckCircle size={10} />
                                            <span className="uppercase ml-1 mt-1 text-xs">gft</span>
                                        </div>
                                    </div>
                                    <p className="text-md mt-2">This collection of 10,000 limited edition GFTs is designed to delight this holiday season. Send one to that special someone (and hold onto one for yourself, too!)</p>
                                    <p className="text-sm opacity-50 mt-2">Holdings location</p>
                                    <h5 className="text-xl font-bold">{`${metadata.holderAddress.substring(0, 4)}...${metadata.holderAddress.substring(metadata.holderAddress.length - 4)}`}</h5>
                                    <div className="mt-5">
                                        <button className="bg-purple-primary text-white-primary py-2 w-full rounded-md shadow-3xl border border-solid border-purple-primary hover:bg-white-primary hover:text-purple-primary" onClick={() => transferGFTToWallet(metadata.tokenId, metadata.type)}>Gift GFT</button>
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    ) : 
                        <div className="flex items-center justify-center w-full py-10">
                            <div className="w-24 h-24 border-l-2 border-green-900 rounded-full animate-spin"></div>
                        </div>
                    }
                    {
                    // !myEmailGFTListProcessing ? myEmailGFTList.map((metadata, index) => {
                    //     return (
                            // <div className="w-1/3 p-3 relative">
                            //     {/* <div className="blur-circle absolute w-full h-2/4 -left-1/4 -top-10 bg-purple-primary opacity-50 rounded-full -z-10"></div> */}
                            //     <div className="p-6 bg-white-primary rounded-lg gft-collection-box z-200">
                            //         <img src={metadata.image} className="w-full rounded-xl"/>
                            //         <div className="flex justify-between mt-5">
                            //             <h4 className="text-black-primary text-lg font-bold">GFT Holiday Edition</h4>
                            //             <div className="px-1 text-white-primary bg-pink-primary flex items-center rounded-md">
                            //                 <FaCheckCircle size={10} />
                            //                 <span className="uppercase ml-1 mt-1 text-xs">gft</span>
                            //             </div>
                            //         </div>
                            //         <p className="text-md mt-2">This collection of 10,000 limited edition GFTs is designed to delight this holiday season. Send one to that special someone (and hold onto one for yourself, too!)</p>
                            //         <p className="text-sm opacity-50 mt-2">Holdings location</p>
                            //         <h5 className="text-xl font-bold">{`${metadata.holderAddress.substring(0, 4)}...${metadata.holderAddress.substring(metadata.holderAddress.length - 4)}`}</h5>
                            //         <div className="mt-5">
                            //             <button className="bg-purple-primary text-white-primary py-2 w-full rounded-md shadow-3xl border border-solid border-purple-primary hover:bg-white-primary hover:text-purple-primary" onClick={() => transferGFT(metadata.tokenId, metadata.type)}>Gift GFT</button>
                            //             {isConnected ? 
                            //             <button className="mt-4 bg-transparent text-purple-primary py-2 w-full rounded-md shadow-3xl border border-solid border-purple-primary hover:bg-purple-primary hover:text-white-primary" onClick={() => transfertoownWallet(metadata.tokenId)}>Transfer to wallet</button>
                            //             : ''
                            //             }
                            //         </div>
                            //     </div>
                            // </div>
                    //     )
                    // }
                    // ) : 
                    //     <div className="flex items-center justify-center w-full py-10">
                    //         <div className="w-24 h-24 border-l-2 border-green-900 rounded-full animate-spin"></div>
                    //     </div>
                        }
                        {/* <div className="w-1/3 p-3 relative">
                           
                            <div className="p-6 bg-white-primary rounded-lg gft-collection-box z-200">
                                <img src="./assets/img/ataribox.png" className="w-full"/>
                                <div className="flex justify-between mt-5">
                                    <h4 className="text-black-primary text-lg font-bold">Atari Edition One</h4>
                                    <div className="px-1 text-white-primary bg-red-primary flex items-center rounded-md">
                                        <FaCheckCircle size={10} />
                                        <span className="ml-1 mt-1 text-xs">Atari</span>
                                    </div>
                                </div>
                                <p className="text-md mt-2">A three-line description that explains the essence of the GFT. There is a wonderful placeholder here</p>
                                <p className="text-sm opacity-50 mt-2">Holdings location</p>
                                <h5 className="text-xl font-bold">0x6B2...e738</h5>
                                <div className="mt-5">
                                    <button className="bg-purple-primary text-white-primary py-2 w-full rounded-md shadow-3xl border border-solid border-purple-primary hover:bg-white-primary hover:text-purple-primary">Gift GFT</button>
                                    <button className="mt-4 bg-transparent text-purple-primary py-2 w-full rounded-md shadow-3xl border border-solid border-purple-primary hover:bg-purple-primary hover:text-white-primary">Transfer to wallet</button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </main>
        <TransferGFTModal isOpen={isOpenTransferModal} setIsOpen={setOpenTransferModal} selectedGFT={selectedGFT} setRefresh={setRefresh} refresh={refresh}/>
        <TransferGFTToWalletModal isOpen={isOpenTransferToWalletModal} setIsOpen={setOpenTransferToWalletModal} selectedGFT={selectedGFT} setRefresh={setRefresh} refresh={refresh}/>
        <Footer />
        </>
    );
};
export default MyGFT;