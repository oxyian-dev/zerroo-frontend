import { Box } from "@mui/material";
import { lazy } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Loadable from "../components/Loadable";

const MobileShopDetails = Loadable(lazy(() => import("./MobileShopDetails")))
const BrowserShopDetails = Loadable(lazy(() => import("./BrowserShopDetails")))

const ShopDetails = () => {
    return (
        <Box>
            <BrowserView>
                <BrowserShopDetails />
            </BrowserView>
            <MobileView>
                <MobileShopDetails />
            </MobileView>
        </Box>
    )
}
export default ShopDetails