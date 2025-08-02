import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetcher from "../utils/fetcher";

const MobileAddress = () => {
    const [addresses, setAddresses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetcher(`/api/addresses`)
            .then(r => r.json())
            .then(({ addresses }) => setAddresses(addresses))
    }, [])

    return (
        <Box p={1}>
            <Typography my={2} variant="h3">Deliver To</Typography>
            <Typography color={orange[700]} mb={1}>Select or add a Address to Checkout</Typography>
            {addresses.map(({
                id,
                saved_name,
                firstname,
                lastname,
                address_1,
                address_2,
                landmark,
                city,
                state,
                postcode,
                phone,
                alt_phone
            }) => (
                <Box key={id} mb={2}>
                    <Card
                        variant="outlined"
                        onClick={() => {
                            sessionStorage.setItem('address', id)
                            navigate('/checkout')
                        }}>
                        <CardContent>
                            <Chip
                                color='primary'
                                sx={{ mb: 2 }}
                                label={saved_name}></Chip>
                            <Typography>{firstname} {lastname}</Typography>
                            <Typography>{address_1}</Typography>
                            <Typography>{address_2}</Typography>
                            <Typography>{landmark}</Typography>
                            <Typography>{city}</Typography>
                            <Typography>{state}</Typography>
                            <Typography>{postcode}</Typography>
                            <Typography>{phone}</Typography>
                            <Typography>{alt_phone}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            ))}
            <Box
                textAlign="center"
                mb={2}>
                <Button
                    component={Link}
                    to="/add-address"
                    size="large"
                    variant="outlined">+ Add New Address</Button>
            </Box>
        </Box>
    )
}
export default MobileAddress;