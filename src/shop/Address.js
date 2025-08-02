import { lazy, useEffect } from "react";
import { BrowserView, MobileView } from 'react-device-detect';
import { useOutletContext } from "react-router-dom";
import AuthPage from "../components/AuthPage";
import Loadable from "../components/Loadable";

const MobileAddress = Loadable(lazy(() => import("./MobileAddress")))
const BrowserAddress = Loadable(lazy(() => import("./BrowserAddress")))

const Address = () => {
    const [setLayout, layout] = useOutletContext()

    useEffect(() => {
        setLayout({ ...layout, back: '/cart', title: 'Address' })
    }, [])

    return (
        <AuthPage>
            <MobileView>
                <MobileAddress />
            </MobileView>
            <BrowserView>
                <BrowserAddress />
            </BrowserView>
        </AuthPage>
    )
}
export default Address