import { Container, Typography, Box, Divider } from '@mui/material'
import React from 'react'
import Faq from '../components/Faq'

export default function Termination() {
    return (
        <Container 
            maxWidth="lg"
            sx={{ 
                py: { md: 14, xs: 10 }, 
                px: { md: 10, xs: 3 }
            }}
        >
            {/* Page Header */}
            <Box mb={6}>
                <Typography 
                    variant="h1" 
                    sx={{
                        color: '#efcb77',
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        mb: 2
                    }}
                >
                    Common Reasons of Termination in Direct Selling Industry
                </Typography>
                <Divider sx={{ 
                    borderColor: 'rgba(255,255,255,.08)',
                    mb: 4
                }} />
                <Typography 
                    sx={{ 
                        color: 'rgba(255,255,255,.68)',
                        lineHeight: 2.1,
                        fontSize: { xs: '0.95rem', md: '1rem' }
                    }}
                >
                    Understanding termination policies and procedures in the direct selling industry. Learn about common reasons, legal aspects, and company policies.
                </Typography>
            </Box>

            {/* FAQ Section */}
            <Faq faqs={[
                {
                    question: "Termination",
                    answer: `The process by which an MLM company ceases cooperation with an independent entrepreneur and removes them from the partner structure.
<br></br>The terms of termination from an MLM company are specified in the distributor agreement. In the case of primary and minor violations, companies usually do not resort to radical methods and limit themselves to a warning, giving the distributor a chance to correct their behavior. However, when the activities of leaders and partners begin to cause real or potential harm to the company, the termination of business relationships becomes necessary.
<br></br>A multi-level marketing (MLM) company can terminate a distributor for a number of reasons, including:
<br></br>Contract violation: A distributor can be terminated if they violate a contract, even if it was unintentional.
<br></br>Abrupt termination: It's not uncommon for an MLM company to terminate a distributor suddenly.
<br></br><b>Distributors are independent contractors and can stop working for an MLM company without notice.</b> However, a terminated distributor can lose the relationships and value they built with the company.`
                },
                {
                    question: "Legal Reasons for Termination in Network Marketing",
                    answer: `Among the most common reasons for termination are cross-recruiting, cessation of activity, and violation of the company's ethical rules. Let's take a closer look at them.`
                },
                {
                    question: "Participation in Two MLM Companies Simultaneously",
                    answer: `There are several reasons why such a situation is dangerous and prohibited by the rules of network companies. Firstly, the main task of an MLM distributor is not to sell, but to develop their structure. Being simultaneously in two organizations, the distributor is focused on profit from sales, not on the development of the structure. Often, for their own benefit, they are willing to give away a large amount of product with minimal markup, which leads to the deterioration of the client market. The second danger that comes from such distributors is the quality of the structure they build. Partners added by such a distributor usually do not understand the advantages and features of the product and company and leave quickly, sometimes even taking the neighbouring structure with them. And perhaps the most significant danger of this situation is that company "A" becomes a donor for company "B," leading to a decrease in turnover.
                     <br></br>To sell a product and gain a regular customer, the distributor must focus on the advantages of this product over similar ones from regular retail or other network companies. Each company has its unique advantages and features that attract people to network business. When a distributor participates in two companies, their efforts are diluted. It's important to remember that working with one company, one marketing plan, one set of product advantages, and one pricing policy is much more effective.
                    <br></br>Being simultaneously in two structures provokes the phenomenon of cross-recruiting – the practice of recruiting people from one MLM company to another. It can include attempts to persuade members of one network marketing organization to switch to another or to attract them to a new project within the same industry. Cross-recruiting undermines trust and stability within organizations and leads to conflicts of interest.`
                },
                {
                    question: "Distributor Inactivity",
                    answer: `The success of a network company is measured not by the number of distributors, but primarily by their activity. An inactive distributor is a "dead horse" that does not benefit the company. If minimum requirements for sales volume or partner recruitment are not met within a certain period, the network company decides to terminate the relationship.`
                },
                {
                    question: "Spreading Negativity About the Company, Product, or Management",
                    answer: `Network marketing is built exclusively on positive emotions. Negativity is inherently destructive, so finding a positive "seed" in any situation is an exceptionally important trait for a network entrepreneur. Self-control is particularly necessary in MLM business, as constant interaction with people requires a high level of self-discipline and emotional control. Moreover, just like in any other business, MLM cannot avoid problems with warehouses, products, and relationships between structure members do not always go smoothly. Spreading negative information through the structure is a fatal mistake for an MLM entrepreneur. It undermines trust in the company and can quickly destroy the results of years of work.`
                },
                {
                    question: "Unscrupulous Termination Methods",
                    answer: `Firstly, it's important to note that the "cleanliness," ethics of the company, and its leaders are one of the keys to success in network marketing. As soon as owners or leaders of structures apply unscrupulous termination methods, this immediately spreads through the network and destroys the company from within.`
                },
                {
                    question: "Termination by the Decision of MLM Company Owners",
                    answer: `In some companies, leaders come to the conclusion that some distributors are earning too much. This often happens in binary structures. The company's management begins to look for reasons to terminate the employee in order to appropriate their checks – and as a rule, such reasons are found. Taking money from terminated leaders is a way for a company, which is not doing too well, to stay afloat for some time.<br><br>

<br></br><b>Important Note:</b>
<br></br>Distributors can't give proper services to teams. Company will give the warning for distributors. Again she/he can't follow the Rules/guidelines. Company can terminate the id number of that person with proper information. Income could be blocked from our company.
`
                },
                {
                    question: "Dynamic Compression",
                    answer: `Sometimes company owners decide to terminate one partner to motivate other partners to work better. The reason for such termination usually becomes insufficient turnover. Practice shows that such methods only work for a while. In the long term, they doom the company to degradation.`
                },
                {
                    question: "Sexual Harassment Act in India",
                    answer: `The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, also known as the PoSH Act, is a law that aims to protect women from sexual harassment in the workplace. The law includes the following provisions:`
                },
                {
                    question: "Penalties",
                    answer: `The Criminal Law (Amendment) Act, 2013 added Section 354 A to the Indian Penal Code, which states that sexual harassment is a crime and carries a penalty of up to three years in prison and/or a fine.`
                },
                {
                    question: "Internal Complaints Committee",
                    answer: `Employers are required to establish an Internal Complaints Committee to address complaints of sexual harassment.`
                },
                {
                    question: "Definition of sexual harassment",
                    answer: `The PoSH Act defines sexual harassment as unwelcome physical, verbal, or non-verbal conduct of a sexual nature, including physical contact, sexual advances, sexual remarks, and showing pornography.`
                },
                {
                    question: "Rules",
                    answer: `The Central Government can make rules to carry out the provisions of the Act.`
                },
                {
                    question: "Company Terms",
                    answer: `<b>Important note:</b>
 <br><br>Company cannot take any responsibility of No-one. Each and everyone can protect ourselves accordingly. Government can only punish that persons. Immediately, company can terminate that person.`
                },
                {
                    question: "Conclusion",
                    answer: `Despite the importance of termination in network marketing, owners of network companies should make every effort to minimize the number of terminations. For MLM business to thrive, it is important to focus on developing a quality bonus plan that will motivate MLM entrepreneurs to work actively and honestly, benefiting themselves and their company. Preventive measures to minimize termination in network marketing include:
                    <br></br> - Quality training and support
<br></br> - A well-designed motivation system
<br></br> - A personalized approach to each participant
<br></br> - Honest and transparent communication
<br></br>Implementing these strategies will help reduce the level of terminated participants in MLM, increase the satisfaction and loyalty of structure members, and contribute to the sustainable growth and development of the company.`
                },
            ]} />
        </Container>
    )
}

// Made with Bob
