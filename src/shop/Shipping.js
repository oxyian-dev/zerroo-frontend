import { Container, Typography, Box, Divider } from '@mui/material'
import React from 'react'
import Faq from '../components/Faq'

export default function Shipping() {
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
                    Shipping Information
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
                    Find answers to all your shipping-related questions. We're committed to delivering your orders safely and on time.
                </Typography>
            </Box>

            {/* FAQ Section */}
            <Faq faqs={[
                {
                    question: "Why does the delivery date not correspond to the delivery timeline of X-Y business days?",
                    answer: `It is possible that the Seller or our courier partners have a holiday between the day you're placed your order and the date of delivery, which is based on the timelines shown on the product page. In this case, we add a day to the estimated date. Some courier partners and Sellers do not work on Sundays and this is factored in to the delivery dates.`
                },
                {
                    question: "Why does the estimated delivery time vary for each seller?",
                    answer: `You have probably noticed varying estimated delivery times for sellers of the product you are interested in. Delivery times are influenced by product availability, geographic location of the Seller, your shipping destination and the courier partner's time-to-deliver in your location.<br>

Please enter your default pin code on the product page (you don't have to enter it every single time) to know more accurate delivery times on the product page itself.`
                },
                {
                    question: "What are the delivery charges?",
                    answer: `Delivery charge varies with each Seller. Sellers incur relatively higher shipping costs on low value items. In such cases, charging a nominal delivery charge helps them offset logistics costs. The delivery charge may be waived off by some Sellers, if you shop with them for a minimum predefined value. For example, seller WS Retail, which generally charges ₹100 for delivery, provides free delivery on orders valued at ₹ 10,000 or more. Please check with individual Sellers to understand what the delivery charges are.`
                },
                {
                    question: "Are there any hidden costs (Sales tax, octroi etc) on items sold by Sellers on Victory World?",
                    answer: `There are NO hidden charges when you make a purchase on Victory World. List prices are final and delivery charges are all exclusive. The price you see on the product page is exactly what you would pay. Delivery charges are not hidden charges and are charged (if at all) extra depending on the Seller's shipping policy.`
                },
                {
                    question: "What is the estimated delivery time?",
                    answer: `Sellers generally procure and ship the items within the time specified on the product page. Business days exclude public holidays and Sundays.<br><br>

Estimated delivery time depends on the following factors:<br>

 * The Seller offering the product<br>

 * Product's availability with the Seller<br>

 * The destination to which you want the order shipped to and location of the Seller.<br>

<span><b>'Pre-order' or 'Forthcoming'</b></span><br><br>

Such items are expected to be released soon and can be pre-booked for you. The item will be shipped to you on the day of its official release launch and will reach you in 2 to 6 business days. The Pre-order duration varies from item to item. Once known, release time and date is mentioned. (Eg. 18th Jan, Feb 3rd week)<br><br>

<span><b>'Out of Stock'</b></span><br><br>

Currently, the item is not available for sale. Use the 'Notify Me' feature to know once it is available for purchase.<br><br>

<span><b>'Imported'</b></span><br><br>

Sometimes, items have to be sourced by Sellers from outside India. These items are mentioned as 'Imported' on the product page and can take at least 10 days or more to be delivered to you.<br><br>

<span><b>'Back in Stock Soon'</b></span><br><br>

The item is popular and is sold out. You can however 'book' an order for the product and it will be shipped according to the timelines mentioned by the Seller.<br><br>

<span><b>'Temporarily Unavailable'</b></span><br><br>

The product is currently out of stock and is not available for purchase. The product could to be in stock soon. Use the 'Notify Me' feature to know when it is available for purchase.<br><br>

<span><b>'Permanently Discontinued'</b></span><br><br>

This product is no longer available because it is obsolete and/or its production has been discontinued.<br><br>

<span><b>'Out of Print'</b></span><br><br>

This product is not available because it is no longer being published and has been permanently discontinued.<br><br>

<span><b>Does Victory World deliver internationally?</b></span><br><br>

As of now, Victory World doesn't deliver items internationally. You will be able to make your purchases on our site from anywhere in the world with credit/debit cards issued in India, but please ensure the delivery address is in India.`
                },
                {
                    question: "Seller does not/cannot ship to my area. Why?",
                    answer: `Please enter your pincode on the product page (you don't have to enter it every single time) to know whether the product can be delivered to your location. If you haven't provided your pincode until the checkout stage, the pincode in your shipping address will be used to check for serviceability.<br><br>

Whether your location can be serviced or not depends on<br><br>

Whether the Seller ships to your location<br><br>

Legal restrictions, if any, in shipping particular products to your location<br><br>

The availability of reliable courier partners in your location<br><br>

At times Sellers prefer not to ship to certain locations. This is entirely at their discretion.`
                },
                {
                    question: "Why is the COD option not offered in my location?",
                    answer: `Availability of COD depends on the ability of our courier partner servicing your location to accept cash as payment at the time of delivery.<br><br>

Our courier partners have limits on the cash amount payable on delivery depending on the destination and your order value might have exceeded this limit. Please enter your pin code on the product page to check if COD is available in your location.`
                },
                {
                    question: "I need to return an item, how do I arrange for a pick-up?",
                    answer: `Returns are easy. Contact us to initiate a return. You will receive a call explaining the process, once you have initiated a return.<br><br>

Wherever possible Logistics will facilitate the pick-up of the item. In case, the pick-up cannot be arranged through them, you can return the item through a third-party courier service. Return fees are borne by the Seller.<br><br>

<span><b>What do the different tags like "In Stock", "Available" mean?</b></span><br>

<span><b>'In Stock'</b></span><br><br>

For items listed as "In Stock", Sellers will mention the delivery time based on your location pincode (usually 2-3 business days, 4-5 business days or 4-6 business days in areas where standard courier service is available). For other areas, orders will be sent by Registered Post through the Indian Postal Service which may take 1-2 weeks depending on the location.<br><br>

<span><b>'Available'</b></span><br><br>

The Seller might not have the item in stock but can procure it when an order is placed for the item. The delivery time will depend on the estimated procurement time and the estimated shipping time to your location.`
                },
            ]} />
        </Container>
    )
}

// Made with Bob
