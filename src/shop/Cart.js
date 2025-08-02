import {Box} from "@mui/material";
import {BrowserView, MobileView} from "react-device-detect";
import Loadable from "../components/Loadable";
import {lazy} from "react";
const MobileCart = Loadable(lazy(() => import('../shop/MobileCart')))
const BrowserCart = Loadable(lazy(() => import('../shop/BrowserCart')))

const Cart = () => {
    return (
        <Box>
            <MobileView>
                <MobileCart/>
            </MobileView>
            <BrowserView>
                <BrowserCart/>
            </BrowserView>
        </Box>
    )
}
export default Cart