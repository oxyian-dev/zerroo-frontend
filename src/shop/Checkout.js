import React, { lazy } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Navigate } from "react-router-dom";
import Loadable from "../components/Loadable";

const MobileCheckout = Loadable(lazy(() => import("./MobileCheckout")));
const BrowserCheckout = Loadable(lazy(() => import("./BrowserCheckout")));
const AuthPage = Loadable(lazy(() => import("../components/AuthPage")))

const Checkout = () => {
    return (
        <AuthPage>
            {sessionStorage.getItem('address') ? (
                <React.Fragment>
                    <MobileView>
                        <MobileCheckout />
                    </MobileView>
                    <BrowserView>
                        <BrowserCheckout />
                    </BrowserView>
                </React.Fragment>
            ) : (
                <Navigate to="/address" />
            )}
        </AuthPage>
    )
}
export default Checkout