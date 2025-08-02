import { Box } from "@mui/material";
import { BrowserView, MobileView } from "react-device-detect";
import Loadable from "../components/Loadable";
import { lazy } from "react";

const BrowserShopList = Loadable(lazy(() => import("./BrowserShopList")));
const MobileShopList = Loadable(lazy(() => import("./MobileShopList")));

const ShopList = () => {
    return (
        <Box>
            <BrowserView>
                <BrowserShopList />
            </BrowserView>
            <MobileView>
                <MobileShopList />
            </MobileView>
        </Box>
    )
}
export default ShopList