import React, { useState } from 'react';
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Typography } from "@mui/material";
import fetcher from '../utils/fetcher';
import { constructFormData } from '../utils/util';
import { useSnackbar } from 'notistack';

const DeclarationForm = ({ setHasAcceptedDeclaration }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = () => {
        setLoading(true);
        fetcher('/api/distributors/declaration-status', {
            method: 'PUT',
            body: constructFormData({
                declaration_status: true,
            }),
        })
            .then(r => r.json())
            .then(({ status, message }) => {
                if (status === 'success') {
                    setHasAcceptedDeclaration(true)
                    enqueueSnackbar('Declaration submitted successfully', { variant: 'success' });
                }
            })
            .catch(error => {
                enqueueSnackbar('Failed to submit declaration', { variant: 'error' });
            });
    };

    

    return (
        <Dialog
            open={true}

            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    width: { xs: "90%", sm: "80%", md: "40%" },  
                    maxHeight: { xs: "90%", sm: "85%", md: "80%" },
                    mx: "auto",
                },
            }}
        >
            <Box>
                <DialogTitle textAlign="center">Terms & Conditions</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText component="div">

                        <Typography variant="body2" sx={{ textAlign: "justify" }}>

                            • This contract is made between the	Applicant (herein after	 referred to as “Distributor” or “He/She”) and Zerabiz Ecom LLP, which is a company incorporated under	the Companies	Act, 2008, having its registered office at 5/837, Naal road, Thennampatti, Vedasandur (Taluk), Dindigul- 624802, Tamilnadu, India.
                            (herein after	 referred as “Zerabiz” or “company” or “we” or “us”) on a principal-to-principal basis.
                            <br></br>• (Which Expressions) shall	 unless	repugnant to the context or meaning there of	be deemed to mean and include his /	her / their legal heirs,	executors, administrators and	assignees of both the parties.

                            <br></br>• This contract is construed,	 agreed, signed	 and executed in accordance with the model guidelines on direct selling issued by the Govt of India, Ministry of Consumer Affairs.
                            <br></br>• The undersigned Distributor acknowledges that he / she	has read, understood and accepted  all	  the terms & conditions of this Agreement Form and also	 agrees	to comply by all the terms mentioned	on the company's website www.zerroo.in.
                            <br></br>•The	distributor also agrees	 to read	 and comply by	 further amendments,	which	will be	made from time to time.<br></br>

                            <br></br><b>The	 terms & conditions agreed by the Distributor and the Company	is as	under:</b>

                            <br></br>1.Each applicant should be at	least 18 years of age at the time of application, to become an Zerabiz Distributor. He/she  is capable of taking independent decision, of sound mind and has not been convicted by any court of law for any offence classified as economic offence or  of moral turpitude. He/she further undertakes not  to use any unethical means and not  to sell/ to refer/ to build Network (s) against the policies of the company.<br></br>

                            <br></br>2.The	registration is	free and non-transferable.<br></br>

                            <br></br>3.The	distributor further agrees that  all the	information furnished	by him/her/ them to the company is correct and properly entered. Any request for correction demanded by the Independent Distributor as to his/her/ their sponsor or placement details will not be entertained. The company reserves the right to accept or reject any such request, without assigning any reason thereof. The Company reserves the right to reject	any distributorship application	at its own discretion.<br></br>

                            <br></br>4.The	company may	approve the Distributorship by an online registration,	which	will carry the password and an identification number known as ID	as chosen automatically. The ID once created will l not be altered later at any point of time. He/she will be authorised to start a business as a distributor only after completion of KYC procedure and availing minimum 500  Business Volume products  of Zerabiz , in no time Limit.<br></br>

                            <br></br>5.Commission	  to the	Distributor may be released by the Company	after deduction of Tax Deducted at Source (TDS) or all other	government taxes (whatsoever of any	kind), or other	charges (Admin charges)whenever due/ applicable. These taxes are	payable by the	distributor and	 company will	have nothing to do or responsible for	the same. (Please send photocopy of your PAN	Card + Aadhar	Card +	Bank pass Book/Cancel Cheque for entry in the system)<br></br>

                            <br></br>6.This form is an application	and an	agreement to appoint an individual as a self-employed Distributor for the sale of zerabiz Products. Signing of this form in no way makes you an employee or agent of the company. Distributors
                            are not permitted under any circumstances  to market or deal in any manner with any product/ services, which are not approved by Zerabiz in	their network.	He/she  is permitted to sell the products/services on	an e-commerce platform /market place, only if he/she has	taken prior written consent from zerabiz  to do the same. He/she shall not be involved directly or indirectly (including by proxy) in  any activities of other direct sales companies or any other activities  that will bring negative effects to zerabiz. Zerabiz  reserves the right to terminate any distributor who commits such offence.<br></br>

                            <br></br>7.The	Distributor shall not compel or induce  or mislead any person with any false	statements/ promise to become a distributor	or to purchase	any product.<br></br>

                            <br></br>8.The	Distributor shall take appropriate steps to ensure protection of all confidential information  provided to him/her by	the customers.<br></br>

                            <br></br>9.The	Distributor shall  attend the mandatory orientation (face to face/ online session) given by zerabiz regarding provision of fair and accurate information	on all aspects of the direct selling operation, remuneration system and expected remuneration for	newly recruited Distributors.	The date of such an orientation session will be available to the  distributor either on the Company’s Website or inform by	the sms or whatsapp on his/her registered mobile number.<br></br>

                            <br></br>10.I authorized you to send sms/email related to Zerabiz Business	on my mobile number/email id registered with the	company.<br></br>

                            <br></br>11.In	case of	any grievance or complaint received by the Distributor from  a customer regarding any product of zerabiz  sold in pursuance	of this contract, the Distributor shall refer such complaint to	the Grievance	Redressal Committee	which	shall address such grievances	within	30 (Thirty) days. The decision	of the Grievance Committee	regarding such	complaints shall be final.<br></br>

                            <br></br>12. No 	monetary gain	is guaranteed by the company.	 Remuneration	 depends upon	solely on the distributor's work, efforts and performance. For further detail	 please	check the business plan on www.zerroo.in.<br></br>

                            <br></br>13.The Distributor's	spouse	shall be deemed to be	his/her	 nominee unless the distributor fill ups the prescribed details in this application form and	 nominate some other person	as his/her nominee.<br></br>

                            <br></br>14.The undersigned confirms hat he/she has not joined zerabiz under any other Network.<br></br>

                            <br></br>15. Zerabiz agrees to allow the cooling off period, as	provided under Government guidelines, in order to cancel/withdraw, the Independent	Distributorship and to	receive	refund	for goods or services purchased and further agrees to allow buy	- back/ repurchase as per the policies of the company.	 (Kindly read the terms and condition  mentioned on the company's website www.zerroo.in more details.)<br></br>

                            <br></br>16.In	case of	any dispute, default or	complaint, the	company’s decision will be final. Any dispute arising	in future	shall be entertained at	Dindigul, India	jurisdiction only.<br></br>

                            <br></br>17.That I have read and understood the terms and conditions for appointment of Zerabiz Retailer/ Distributors (Direct Seller) of the company, and accept to them.<br></br>

                            <br></br>18.I have also gone through the Company’s official website including FAQs, Printed materials and Brochures. I agree to the contents of the materials and convinced about the business and I have applied to appoint me as a Direct Seller on my own volition.<br></br>

                            <br></br>19.I declare that I have not been given any assurance or promise or inducement by the company or its Partners in regard to any fixed income incentive, price or benefit on account of the products purchased by me.<br></br>

                            <br></br>20.I have clearly understood that eligibility of income exclusively depends on my performance as per the Business plan of the company. I further agree that company reserves the right to change the Business plan at any point of time without any prior notice.<br></br>

                            <br></br><b>Declaration</b>
                            <br></br>I hereby declared that	I am resident of India,	my age	is more  than 18 years	as on date. I am legally	qualified to do any business or agreement or declaration	 in India. I have	no criminal history. I am qualified to do Zerabiz business in India. I have read and	understood the contents of the above	agreements and I will abide by  the above. I also confirm that I know my sponsor and have full	faith in	him. The legal	provisions were explained to me (in the language I understand) by my sponsor and I make myself legally bound	by the above.<br></br>

                            <br></br>I hereby declared that	Applicant/Distributor(s) is known to me. I take responsibility for the face that he/she applied for Zerabiz Products	distributorship only after he/she has	read and I have	 explained him/her (in	the language he/she	understands) about the company, company's	products, sales	&marketing plan, Company's the application	of Policy	and terms & conditions. I reconfirm that all information and	declaration given by Applicant/Distributor(s)	is true. I	recommend that Zerabiz should accept Applicant/Distributor(s) for	distributorship of its products	and services. Thankyou.<br></br>

                        </Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="I agree to the declaration"
                    />
                    <Box mt={2}>
                        <Button
                            disabled={!isChecked || loading}
                            variant="contained"
                            onClick={handleSubmit}
                            fullWidth
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                            
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Box>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default DeclarationForm;
