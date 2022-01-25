import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import TermsModal from '../../containers/modals/terms';
import LOGOIMAGE from '../../assets/img/logo.svg';

const Footer = () => {

    const [termsOpen, setTermsOpen] = useState(false);

    return (
        <footer className="bg-white-primary border-t border-solid border-black-primary/50">
            <div className="container mx-auto">
                <div className="flex justify-between flex-col md:flex-row">
                    <NavLink to="/" className="hidden md:block">
                        <img src={LOGOIMAGE} className="w-24 md:block mr-10"/>
                    </NavLink>
                    <div className="text-center">
                        <p className="text-black-primary opacity-50">Copyright 2021 GFT Shoppe, Inc. All Rights Reserved.</p>
                        <a className="text-black-primary opacity-50 underline cursor-pointer" onClick={ () => setTermsOpen(true) }>Terms of Service</a>
                    </div>
                    <div className="text-center md:text-right mt-5 md:mt-0">
                        <p className="text-black-primary">Patent Pending</p>
                        <a className="text-purple-primary underline" href="mailto:hello@gftshoppe.com">hello@gftshoppe.com</a>
                    </div>
                </div>
                <p className="mt-10 text-tn black-black-primary opacity-50">
                    Disclaimer: In purchasing a non-fungible token (“NFT”) from Republic Realm Inc. (“Realm”) you acknowledge and agree that:
                    <br/><br/>
                    NEITHER REALM NOR ANY OF ITS AFFILIATES AND THEIR OFFICERS, DIRECTORS, MANAGER(S), EMPLOYEES, AGENTS, SHAREHOLDERS/MEMBERS MAKES ANY WARRANTY WHATSOEVER WITH RESPECT TO THE NFTs, INCLUDING ANY (A) WARRANTY OF MERCHANTABILITY; (B) WARRANTY OF FITNESS FOR A PARTICULAR PURPOSE; (C) WARRANTY OF TITLE; OR (D) WARRANTY AGAINST INFRINGEMENT OF INTELLECTUAL PROPERTY RIGHTS OF A THIRD PARTY; WHETHER EXPRESS OR IMPLIED BY LAW, COURSE OF DEALING, COURSE OF PERFORMANCE, USAGE OF TRADE OR OTHERWISE.
                    <br/><br/>
                    You shall take all statements, recommendations, data, opinions, documents, and the like on an as-is basis and rely on your own counsel, third-party service providers and judgment in connection therewith. IN NO EVENT SHALL REALM OR ANY OF ITS AFFILIATES AND THEIR OFFICERS, DIRECTORS, MANAGER(S), EMPLOYEES, AGENTS, SHAREHOLDERS/MEMBERS BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, WHETHER UNDER ANY TORT, CONTRACT, NEGLIGENCE, STRICT LIABILITY, OR OTHER LEGAL OR EQUITABLE THEORY WHATSOEVER, INCLUDING WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, INTELLECTUAL PROPERTY INFRINGEMENT, PRICE DEPRECIATION, LEGAL OR REGULATORY ENFORCEMENT, BUSINESS INTERRUPTION, LOSS OF BUSINESS INFORMATION, AND THE LIKE, ARISING OUT OF THIS AGREEMENT, EVEN IF REPUBLIC HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. 
                    <br/><br/>
                    THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.	
                    <br/><br/>
                    This NFT sale is not intended to be an offering or sale of securities, swaps on either securities or commodities or a financial instrument of any kind as may be determined by any law, rule, or regulation. Purchases and sales of NFTs may not be subject to the protections of any laws governing those types of financial instruments. This document and all other content, including without limitation on https://www.republicre alm.com/, do not constitute a prospectus or offering document, and are not an offer to sell.
                    <br/><br/>
                    In the event that you deposit digital assets or NFTs into an incorrect address, Realm may not have the ability, and are under no obligation or duty, to return such digital assets or NFTs to you. This section applies regardless of whether Realm controls the destination address.
                    <br/><br/>
                    **Please note: exceptions to this section may be considered and made on a case-by-ca se basis and in Realm’s sole discretion.**
                    <br/><br/>
                    Realm does not give any advice or recommendation regarding NFTs, including, but not limited to, the suitability and/or appropriateness of, and investment strategies for, the purchase of the NFTs for financial investment purposes. You are solely responsible for determining the nature, potential value, suitability, and appropriateness of your purchase of the NFTs for yourself for any purpose. The NFTs are not designed for investment purposes and Realm does not give any advice or recommendation that the NFTs are to be considered as a type of financial investment by any law, rule, or regulation. With respect to your purchase of the NFTs, you acknowledge and agree that you are not expecting to profit from the NFTs based on any efforts by Realm or its affiliates. The purchase of an NFT is a non-reversible and non-refundable event. Realm shall have no obligation or liability for the secure custody or use of the NFT and any losses arising from such custody or use or solely the purchasers. 
                    <br/><br/>
                    Please note the following risks in accessing or using Realm: The price and liquidity of blockchain assets, including NFTs, are extremely volatile and may be subject to large fluctuations; fluctuations in the price of other digital assets could materially and adversely affect NFTs, which may also be subject to significant price volatility; legislative and regulatory changes or actions at the state, federal, or international level may adversely affect the use, transfer, exchange, and value of NFTs; NFTs are not legal tender and are not backed by the government; transactions in NFTs may be irreversible, and, accordingly, losses due to fraudulent or accidental transactions may not be recoverable; some transactions in NFTs shall be deemed to be made when recorded on a public ledger, which is not necessarily the date or time that you initiated the transaction; the value of NFTs may be derived from the continued willingness of market participants to exchange fiat currency or digital assets for NFTs, which may result in the potential for permanent and total loss of value of a particular NFT should the market for that NFT disappear; the nature of NFTs may lead to an increased risk of fraud or cyber-attack, and may mean that technological difficulties experienced by Realm may prevent the access to or use of your digital assets and/ or personal information; and changes to any third party sites may create a risk that your access to and use of Realm will suffer.
                    <br/><br/>
                    You are solely responsible for determining the nature, potential value, suitability, and appropriateness of these risks for yourself. You access and use Realm at your own risk; however, you also acknowledge that this brief statement does not disclose all of the risks associated with NFTs and other digital assets. You agree and understand that Realm will not be responsible for any communication failures, disruptions, errors, distortions or delays it may experience when using, selling or promoting NFTs, however caused. 
                    <br/><br/>
                    You hereby expressly waive and release any and all claims, now known or hereafter known, against the Realm, its affiliates and their officers, directors, manager(s), employees, agents, shareholders/members (collectively, "Releasees"), related to the NFTs, whether arising out of the ordinary negligence of Realm or any Releasees or otherwise. You covenant not to make or bring any such claim against Realm or any other Releasee, and forever release and discharge Realm and all other Releasees from liability under such claims.
                </p>
            </div>
            <TermsModal isOpen={termsOpen} setIsOpen={setTermsOpen} />
        </footer>
    );
};
export default Footer;
