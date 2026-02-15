import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import Loader from "../components/Loader";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function DefaultLayout() {
    const { loading } = useContext(GlobalContext);
    return (
        <>
            <AppHeader />
            <div className="container my-3">
                {loading && <Loader/>}
                <Outlet />
            </div>
        </>
    )
}