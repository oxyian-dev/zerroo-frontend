import { Container, Typography } from '@mui/material'
import React from 'react'
import Faq from '../components/Faq'

export default function CommonlyUsedTerms() {
    return (
        <Container sx={{ my: 4 }}>
            <Typography variant="h1" mb={4}>
            Commonly used terms in Direct selling 
            </Typography>
            <Faq faqs={[
                {
                    question: "Customer",
                    answer: `“Customer” refers to any person/s whether an individual or an organisation (a group of individuals) who:
<br></br>Buys any goods for a consideration which has been paid or promised or partly paid and partly promised, or under any system of deferred payment who may be a user/consumer includes any user of such goods other than the person who buys such goods for consideration paid or promised or partly paid or partly promised, or under any system of deferred payment when such use is made with the approval of such person, but does not include a person who obtains such goods for resale.
<br></br>Or
<br></br>Hires or avails of any services for a consideration which has been paid or promised or partly paid and partly promised, or under any system of deferred payment and includes any beneficiary of such services other than the person who hires or avails of the services for consideration paid or promised, or partly paid and partly promised, or under any system of deferred payment, when such services are availed of with the approval of the first-mentioned person but does not include a person who avails of such services for providing it to another person/s.`
                },
                {
                    question: "Explanation – for this clause",
                    answer: `a.“commercial purpose” does not include use by a person who purchases the goods or services to use/consumes them, but the goods or services are purchased exclusively to earn his livelihood using self-employment.
<br></br> b.The expressions “buys any goods” and hires or avails any services include offline and/online transactions through electronic means or by teleshopping or direct selling deploying direct, single-level or multi-level marketing compensation plan.
<br></br>The "customer" may or may not be a direct seller.
<br></br>A customer may or may not be a consumer.
(with inputs from the Consumer Protection Act, 2019)
`
                },
                {
                    question: "Direct Selling",
                    answer: `“Direct selling” means marketing, distribution, and sale of goods or provision of services through a network of persons (registered with the company as independent contractors), other than through a permanent retail location/s.
<br></br>It Is primarily a B2C (Business to Customer) model with some exceptions (where the agreement is entered into between the Direct selling entity and an Entity / Organisation- Proprietary, Partnership, Limited liability Partnership, One-person company / Private limited company, Trust, Public limited company, etc.)
<br></br>Also known as Direct Sales, Network marketing, Referral marketing, Affiliate marketing, etc.
 `
                },
                {
                    question: "Company Literature",
                    answer: `“Company Literature” refers to any documents in physical or in electronic form including business opportunity materials, product catalogues, brochures, newsletters, emails, etc. issued or published by the Company on their official platforms to share information, spread awareness, etc.`
                },
                {
                    question: "Direct Selling Entity",
                    answer: `“Direct Selling Entity”, means a body corporate which may be a One-person company or a Limited liability partnership or a private limited company engaged in the business of Direct Selling.
<br></br>The organisation may be a manufacturer or a trader of the product/s and/or services.
<br></br>It utilises the services of persons who are independent contractors, also known as direct sellers, to recommend and retail product/s and /or services.
<br></br>The company may commit, calculate and pay incentives/commissions to the direct sellers by deploying Direct, Single level or a Multi-level marketing compensation plan/s.`
                },
                {
                    question: "Independent Contractor",
                    answer: `An Independent Contractor is a person who signs a contract for service* with the entity.
<br></br>A contract for service* implies an agreement wherein one party undertakes to provide services, to or for another in the performance of which he is not subject to detailed direction and control but exercises professional or technical skill and uses his knowledge and discretion.
<br></br>A direct seller/participant Is an independent contractor.
`
                },
                {
                    question: "Direct seller",
                    answer: `“Direct Seller” is a person above the age of 18 years on the date of enrolment with eligibility to enter into a business contract* who enrols/registers/signs up with the direct selling entity through a legally enforceable agreement (as an “independent contractor”) to undertake direct selling business on principal to principal basis for purchasing the goods at a discount for self-consumption and/or an opportunity to earn income by retailing goods and/or by helping others enrol and retail the goods.
<br></br>A direct seller may be a consumer/user or a customer/purchaser/buyer or a reseller or all of the three.
<br></br>Direct Sellers are generally also known as Distributors, Associates, Independent business owners, Consultants, Networkers, Members, Advisors, Independent business associates, Affiliates, Independent representatives, Agents, etc.
<br></br>*Explanation: - A ‘contract’ includes e-contracts or digital contracts and the same shall be governed as per the provisions of the Information Technology Act, 2000 and Indian Contract Act as amended from time to time.`
                },
                {
                    question: "Prospect & Prospective",
                    answer: `“Prospect” means a person to whom an offer or a proposal is made by the Direct Seller to join a Direct Selling business opportunity or to purchase a product/service.`
                },
                {
                    question: "Goods",
                    answer: `The term “goods” refers to movable property and includes anything, products or services, tangible or intangible that constitutes the subject of a proposed transaction.`
                },
                {
                    question: "Saleable",
                    answer: `“Saleable” concerning goods or services means unopened, unused, marketable and of merchantable quality, which has not expired, and which is not discontinued or goods or services of special promotion/s or the ones offered free or at a token price.
`
                },
                {
                    question: "Service",
                    answer: `Service means service of any description which is made available to potential users and includes, but not limited to, the provision of facilities in connection with banking, financing, insurance, transport, processing, the supply of electrical or other energy, telecom, boarding or lodging or both, housing construction, entertainment, amusement or the purveying of news or additional information but does not include the rendering of any service free of charge or under a contract of personal service.`
                },
                {
                    question: "Price",
                    answer: `Service means service of any description which is made available to potential users and includes, but not limited to, the provision of facilities in connection with banking, financing, insurance, transport, processing, the supply of electrical or other energy, telecom, boarding or lodging or both, housing construction, entertainment, amusement or the purveying of news or additional information but does not include the rendering of any service free of charge or under a contract of personal service.`
                },
                {
                    question: "Purchase",
                    answer: `“Purchase” means the acquisition of goods/service against a price.`
                },
                {
                    question: "Person",
                    answer: `“Person”, unless otherwise provided, will mean a person as per the Consumer Protection Act, 2019.`
                },
                {
                    question: "Quality",
                    answer: `“Quality” is the ability to perform satisfactorily in service and is suitable for its intended purpose as indicated in the official literature/application/website including brochures, labels, and presentations developed/distributed/retailed by the company. Quality of goods/services includes their state or condition.
This policy is to address the quality issues of the good/s.`
                },
                {
                    question: "Money Back Guarantee",
                    answer: `“Money back guarantee” is the promise to the persons associated with the company and the customers to empower them to return the goods If they are unable to retail the purchased product/s to the customer/s alternatively, unable to use them for self-consumption.
This policy is to address the concerns of the overstocking of products by the persons (direct sellers/independent contractors) engaged in direct selling. It also builds good faith between the parties and helps minimise the wastage of resources.`
                },
                {
                    question: "Negative Product List",
                    answer: `“Negative product list” is the list of goods which are not to be promoted by the company.`
                },
                {
                    question: "Special Product List",
                    answer: `“Special product list” is the list of products/services which may be promoted following the conditions mentioned along with them.`
                },
                {
                    question: "Official Communication",
                    answer: `“Official communication” shall refer to any communication made by the entity or its authorised personnel in written form (printed or in electronic form on the domains/application owned and/or operated by the entity).`
                },
                {
                    question: "Delivery",
                    answer: `“Delivery” is a voluntary transfer of possession/s from one party to another.`
                },
                {
                    question: "Office",
                    answer: `““Office” means a room, set of rooms, or building used as a place of exclusively conducting business activities as mentioned on the official literature/website/application of the entity.`
                },
                {
                    question: "Enrol",
                    answer: `“Enrol” means to introduce/register/signup formally through a legally enforceable contract (as per the latest version of the Indian Contract Act and IT Act) for undertaking the business on principal to principal basis as a participant or a person or any entity including any names mentioned under the definition of a direct seller.`
                },
                {
                    question: "Organization Structure",
                    answer: `“Organization Structure” is the way of representing the tiered nature of persons in a graphical form to help them recognize their relative positions to the company or the persons above or below them.
 <br></br>This arrangement is also known as the Tree structure or Network Structure.`
                },
                {
                    question: "Types of Organization Structures",
                    answer: `<b>a.Types of frontline (or leg) structures (the maximum number of participants that can be arranged in the frontline)</b>
<br></br>Participants mapped directly with the Participant in his/her Organisation Structure are known as the frontline.
<br></br>1.<b>Binary</b> – Maximum two persons in the frontline

<br></br><b>b.Types of Generation (or Level) Structures (of participant/s)</b>

<br></br>A company may choose to have the participants (independent contractors) structured in a  Multi-level structure/s. It is completely influenced by the compensation plan of the company.
<br>Generation is commonly referred to as a level.
<br></br>1.<b>Multi-level</b> – The participants are connected to the company via another participant/s arranged in more than a single level all having existing contractual relationships with the company`
                },
                {
                    question: "Compensation Plan",
                    answer: `“Compensation plan” is a technique to calculate the returns/commissions/incentives and/or the rewards assured/promised to be given to/among participant/s from the money invested/turnover from the sales of goods/provision of services directly/indirectly provided by them personally or by other participants in their organisation structure.
                    <br></br>The Compensation plans are developed to encourage and reward various behaviours – Personal purchase for self-consumption or retail, and/or supporting the participants in the Organisation Structure for retailing, enrolling participants (though offering compensation on conscription of persons is an unethical practice), etc.
<br></br>This is also known as Remuneration system.
`
                },
                {
                    question: "Types of compensation plans",
                    answer: `<b>a.Paid on Generation/s:</b>
<br></br><b>Multiple</b> – The participants using/consuming or selling the goods get an opportunity to be compensated on their purchases/retail and the purchases/retail by persons in more than the first generation. This type of compensation plan is usually deployed by companies having persons arranged in multiple levels or Multi-level marketing organisation structure.

                    <br></br><b>b.Rank/ Title achievement:</b>
<br></b><b>Non-cumulative</b> – Participants, regardless of their ranks/titles in the previous month, start a new calendar month with the same levels/ranks/ titles. The sales counter starts with zero every month.
<br></b><b>Cumulative</b> – On achievement of any ranks/titles, the participants continue to enjoy the privileges meant for the highest rank attained although their association with the company while the earning is calculated on the sales for that specific period.

<br></br><b>c.The frequency of Compensation Pay-outs:</b>
<br></b><b>Weekly</b> – Pay-out is calculated and disbursed weekly`
                },
                {
                    question: "Direct Marketing",
                    answer: `“Direct marketing” is a method in which companies communicate directly with prospects through formats like online advertisements, direct mailing (postal mail and email), text messaging and voice calls.`
                },
                {
                    question: "Ecommerce",
                    answer: `“E-commerce” is the display and/or the sale and/or purchase of goods & services conducted using the digital or an electronic network including but not limited to the world wide web.`
                },
                {
                    question: "Electronic Service Provider",
                    answer: `Electronic service provider means a person/entity who provides technologies or processes to enable a product seller to engage in advertising or selling goods or services to a consumer and includes any online marketplace or online auction sites.`
                },
                {
                    question: "Prevailing Laws",
                    answer: `“Prevailing Laws” means all provisions of the applicable Acts, Rules, Regulations, Notifications, Guidelines, Circulars, Ordinances, Orders, Advisories, Clarifications, etc., including any amendments therein or enactment thereof, for the time being in force.`
                },
               
            ]} />
        </Container>
    )
}
