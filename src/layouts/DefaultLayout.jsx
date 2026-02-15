import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";

export default function DefaultLayout() {
    return (
        <>
            <AppHeader />
            <div className="container my-3">

                <Outlet />
            </div>
        </>
    )
}