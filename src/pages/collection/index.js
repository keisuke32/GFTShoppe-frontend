import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FaTree, FaDiscord, FaChartBar } from 'react-icons/fa';
import { FiGift, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';


import queryString from 'query-string';
import axios from 'axios';
import crypto from 'crypto';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CHAIN_NAME, CHAIN_ID, ContractAddr, ContractAbi, WETHAbi, WETHAddr } from '../../contract';
import { MOONPAY_KEY, MOONPAY_URL, REDIRECT_URL } from '../../config'

import InstructionsModal from '../../containers/modals/instructions';
import InstructionsVideoModal from '../../containers/modals/instructions-video';

const Collection = () => {
    const params = queryString.parse(window.location.search);

    const { web3, userAddress, isSigned, signedUser} = useSelector(state => {
        return {
            web3: state.wallet.web3,
            userAddress: state.wallet.walletAddress,
            isSigned: state.auth.isSigned,
            signedUser: state.auth.signedUser
        }
    })

    
    const [processing, setProcessing] = useState({
        approveWETH: false,
        buyGFT: false,
        buyFromCard: false
    });
    
    const [gftCount, setGFTCount] = useState(params.amount ? params.amount : 1);
    const [gftCountLimit, setGFTCountLimit] = useState(1);
    
    const [instructionsOpen, setInstructionsOpen] = useState(false);
    
    const [instructionsVideoOpen, setInstructionsVideoOpen] = useState(false);
    
    if (userAddress && userAddress != "") {
        const contract = new web3.eth.Contract(
            ContractAbi,
            ContractAddr
        );
        contract.methods.walletOfUser(userAddress).call()
        .then(res => {
            setGFTCountLimit(res.length)
        })
        .catch(err => {

        })
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const buyWithWallet = async () => {
        setProcessing({
            ...processing,
            approveWETH: true,
            buyGFT: true,
        })
        let gas = 178000;
        const amount = gftCount;
        if (!userAddress) {
            toast.warning(`Please connect a wallet`);
            setProcessing({
                ...processing,
                approveWETH: false,
                buyGFT: false,
            })
            return;
        }
        const chainId = await web3.eth.getChainId();
        if (chainId !== CHAIN_ID) {
            setProcessing({
                ...processing,
                approveWETH: false,
                buyGFT: false,
            })
            return toast.warning(`Please switch to ${CHAIN_NAME}`);
        }
        const contract = new web3.eth.Contract(
            ContractAbi,
            ContractAddr
        );
        const WETHcontract = new web3.eth.Contract(
            WETHAbi,
            WETHAddr
        );
        
        gas = gas + (amount - 1) * 50000;
        let value = 0.02 * amount;

        // // approve 0,02 eth for buying.
        const approveresult = await WETHcontract.methods.approve(ContractAddr, web3.utils.toWei((value).toString(), 'ether')).send({from: userAddress}).catch(
            err => {
                return setProcessing({
                ...processing,
                approveWETH: false,
                buyGFT: false,
            })
        })
        setProcessing({
            ...processing,
            approveWETH: false,
            buyGFT: true,
        })
        // console.log(approveresult);
        // await contract.methods.togglePublicSale().send({from: userAddress})
        // return;
        contract.methods.createItem(amount).send({from: userAddress})
        .then(res => {
            let tokenIds = new Array();
            if (res.events.Transfer.length === undefined) {
                tokenIds.push(res.events.Transfer.returnValues.tokenId)
            } else {
                for (let i in res.events.Transfer) {
                    tokenIds.push(res.events.Transfer[i].returnValues.tokenId)
                }
            }
            toast.success('Your GFT has been minted');
            setProcessing({
                ...processing,
                approveWETH: false,
                buyGFT: false,
            })
        })
        .catch(err => {
            console.log(err)
            setProcessing({
                ...processing,
                approveWETH: false,
                buyGFT: false,
            })
            toast.error(`Transaction failed`);
        })
    }

    const buyWithCreditCard = async () => {
        let amount = gftCount;
        let value = 0.02 * amount;
        if (!isSigned) {
            return toast.warning("Please Log In first");
        }
        setProcessing({
            ...processing,
            buyFromCard: true
        })
        axios.post("/api/gftshoppe/mint/requestMoonpay", {id: signedUser.id, amount})
        .then(res => {
            if (res.data.status) {
                let moonpayUrl = `${MOONPAY_URL}?apiKey=${MOONPAY_KEY}&externalCustomerId=${signedUser.id}&externalTransactionId=${res.data.id}&walletAddress=${res.data.adminWallet}&currencyCode=USDC&baseCurrencyCode=USD&quoteCurrencyAmount=100&redirectURL=${REDIRECT_URL}%2F${res.data.id}&colorCode=%235633D5`;
                const signature = crypto
                .createHmac('sha256', 'sk_test_IM8908pHqjzfmadY3BCs7uXJSkhpR5rc')
                .update(new URL(moonpayUrl).search)
                .digest('base64');
                moonpayUrl = `${moonpayUrl}&signature=${encodeURIComponent(signature)}`;

                window.open(moonpayUrl, "_blank")
            } else {
                setProcessing({
                    ...processing,
                    buyFromCard: false
                })  
                return toast.warning("Something is wrong");
            }
        })
        .catch(err => {
            setProcessing({
                ...processing,
                buyFromCard: false
            })
            return toast.warning("Something is wrong");
        })
    }

    return (
        <>
        <Header />
        <main className="mb-10">
            <section className="p-0 md:py-20 px-10 md:px-0 relative">
                <div className="container mx-auto">
                    <h1 className="text-3xl md:text-6xl text-center font-bold leading-tight">GFT Holiday Edition</h1>
                    <div className="flex justify-center">
                        <p className="mt-10 text-lg text-center w-full md:w-2/5">First edition GFTs brought to you by the GFT Shoppe, the digital destination for NFT gifts.</p>
                    </div>
                    <div className="p-0 md:p-32 pb-0 flex justify-between flex-col md:flex-row mt-10 md:mt-0">
                        <div className="w-full md:w-2/4 pr-0 md:pr-20 relative">
                            {/* <ReactPlayer url='https://youtu.be/CViGLhV77JM' loop={true} playing={true} muted={true} height="100%" width="100%" /> */}
                            <video src="./assets/video/GiftBox.mp4" autoPlay loop muted className="w-full rounded-xl" />
                            <FiGift size={55} className="absolute -left-7 -bottom-7 transform -rotate-15 gfticonbox hidden md:block" color="#5633D5" />
                        </div>
                        <div id="buygft" className="w-full md:w-2/4 relative">
                            <p className="mt-10 text-black-primary leading-6">
                                The perfect gift NFT is the GFT! This collection of 10,000 limited edition GFTs is designed to delight this holiday season. Send one to that special someone (and hold onto one for yourself, too!)
                            </p>
                            <div className="flex justify-start items-start md:items-center mt-10 md:mt-20 flex-col md:flex-row">
                                <div className="flex justify-between">
                                    <div className="flex justify-between shadow-3xl rounded-lg h-11">
                                        <button className="px-2" onClick={ () => gftCount > 1 ? setGFTCount(parseInt(gftCount) - 1) : 1 }>-</button>
                                        <input className="w-10 h-full text-center" value={gftCount} readOnly />
                                        <button className="px-2" onClick={ () => gftCount < 10 - gftCountLimit ? setGFTCount(parseInt(gftCount) + 1) : 10 - gftCountLimit }>+</button>
                                    </div>
                                    <div className="ml-5 -mt-2">
                                        <p className="text-xs opacity-50 mt-2">Price</p>
                                        <div className="flex justify-start mt-1">
                                            <img src="./assets/img/price.png" className="h-5" />
                                            <h5 className="text-md font-bold ml-2">{parseInt(gftCount) * 0.02}</h5>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-purple-primary text-white-primary w-full md:w-48 py-2 rounded-lg shadow-3xl border border-solid border-purple-primary hover:bg-white-primary hover:text-purple-primary ml-0 md:ml-5 mt-5 md:mt-0" onClick={buyWithWallet}>
                                    {processing.approveWETH && processing.buyGFT ? 
                                        <div className='flex items-center'>
                                            <div className="w-5 h-5 border-l-2 border-white hover:border-purple-primary rounded-full    animate-spin mr-2"></div>Approving WETH
                                        </div> : 
                                    (!processing.approveWETH && processing.buyGFT ? 
                                        <div className='flex items-center'>
                                            <div className="w-5 h-5 border-l-2 border-white hover:border-purple-primary rounded-full    animate-spin mr-4"></div>Buying GFT
                                        </div> : 
                                        'Buy with wallet'
                                    )}
                                </button>
                            </div>
                            <FiGift size={55} className="absolute -right-10 top-0 transform -rotate-15 gfticonbox hidden md:block" color="#5633D5" />
                            <FiGift size={55} className="absolute right-0 bottom-0 transform rotate-15 gfticonbox hidden md:block" color="#5633D5" />
                        </div>
                    </div>
                </div>
                {/* <div className="w-2/5 h-96 absolute -right-60 top-0 bg-pink-primary opacity-70 transform -rotate-180 blur-effect z-20"></div> */}
                {/* <div className="w-2/5 h-96 absolute -left-60 top-0 bg-purple-primary opacity-70 transform -rotate-180 blur-effect"></div> */}
            </section>
            <section className="mt-20">
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
                                You can buy a GFT with a credit card or with cryptocurrency. If you want to buy with crypto, but don’t have a wallet, instructions on how to set one up are <a className="underline cursor-pointer"  onClick={ () => setInstructionsOpen(true) }>here</a> and a video is <a className="underline cursor-pointer"  onClick={ () => setInstructionsVideoOpen(true) }>here</a>.
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
                            <a href="" className="flex items-center text-purple-primary font-bold mt-5">Join Discord <FaDiscord size={20} color="#5633D5" className="ml-2" /></a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-20 px-10 md:px-0">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h3 className="black-primary text-3xl font-bold">Rarity Table</h3>
                    </div>
                    <div className="flex justify-between mt-10 px-0 md:px-40 flex-col md:flex-row">
                        <div className="w-full md:w-2/5 relative">
                            <table className="text-sm w-full">
                                <thead>
                                    <tr className="h-10">
                                        <th className="w-1/3 font-normal opacity-50">GFT ID</th>
                                        <th className="w-1/3 font-normal opacity-50"># Existing</th>
                                        <th className="w-1/3 font-normal opacity-50">% of Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">1</td>
                                        <td className="text-center">1</td>
                                        <td className="text-center rounded-r-lg">0.01%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">2</td>
                                        <td className="text-center">5</td>
                                        <td className="text-center">0.05%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">3</td>
                                        <td className="text-center">5</td>
                                        <td className="text-center rounded-r-lg">0.05%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">4</td>
                                        <td className="text-center">25</td>
                                        <td className="text-center">0.25%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">5</td>
                                        <td className="text-center">45</td>
                                        <td className="text-center rounded-r-lg">0.45%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">6</td>
                                        <td className="text-center">50</td>
                                        <td className="text-center">0.50%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">7</td>
                                        <td className="text-center">50</td>
                                        <td className="text-center rounded-r-lg">0.50%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">8</td>
                                        <td className="text-center">75</td>
                                        <td className="text-center">0.75%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">9</td>
                                        <td className="text-center">100</td>
                                        <td className="text-center rounded-r-lg">1.00%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">10</td>
                                        <td className="text-center">125</td>
                                        <td className="text-center">1.25%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">11</td>
                                        <td className="text-center">150</td>
                                        <td className="text-center rounded-r-lg">1.50%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">12</td>
                                        <td className="text-center">200</td>
                                        <td className="text-center">2.00%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">13</td>
                                        <td className="text-center">200</td>
                                        <td className="text-center rounded-r-lg">2.00%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">14</td>
                                        <td className="text-center">219</td>
                                        <td className="text-center">2.19%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">15</td>
                                        <td className="text-center">450</td>
                                        <td className="text-center rounded-r-lg">4.50%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">16</td>
                                        <td className="text-center">550</td>
                                        <td className="text-center">5.50%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">17</td>
                                        <td className="text-center">1 000</td>
                                        <td className="text-center rounded-r-lg">10.00%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">18</td>
                                        <td className="text-center">1 100</td>
                                        <td className="text-center">11.00%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center rounded-l-lg">19</td>
                                        <td className="text-center">1 250</td>
                                        <td className="text-center rounded-r-lg">12.50%</td>
                                    </tr>
                                    <tr className="h-10">
                                        <td className="text-center">20</td>
                                        <td className="text-center">1 400</td>
                                        <td className="text-center">14.00%</td>
                                    </tr>
                                    <tr className="bg-white-secondary h-10">
                                        <td className="text-center">21</td>
                                        <td className="text-center">3 000</td>
                                        <td className="text-center">30.00%</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="absolute -right-36 top-44 hidden md:block">
                                <div className="relative transform -rotate-15">
                                    <FaChartBar size={55} className="gfticonbox" color="#5633D5" />
                                    <span className="w-5 h-5 absolute left-11 -top-2 bg-purple-primary rounded-full -z-10"></span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 pl-0 md:pl-10">
                            <div className="mt-3 p-5 border border-solid border-purple-primary/30 rounded-lg">
                                <p className="text-black-primary text-sm">
                                    First edition Holiday GFTs will unwrap on December 25th. If you’re lucky, you may even get a super rare GFT.
                                </p>
                                <a href="#buygft" className="mt-5 text-center bg-purple-primary text-white-primary py-2 w-full md:w-1/2 inline-block rounded-lg shadow-3xl border border-solid border-purple-primary hover:bg-white-primary hover:text-purple-primary">Buy a GFT</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <InstructionsModal isOpen={instructionsOpen} setIsOpen={setInstructionsOpen} />
            <InstructionsVideoModal isOpen={instructionsVideoOpen} setIsOpen={setInstructionsVideoOpen} />
            
        </main>
        <Footer />
        </>
    );
};
export default Collection;