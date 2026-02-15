import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalContext from "./context/GlobalContext";
import DefaultLayout from "./layouts/DefaultLayout";

//pages
import HomePage from "./pages/HomePage"

// Gods
import GodIndexPage from "./pages/gods/GodIndexPage"
import GodShowPage from "./pages/gods/GodShowPage"

// Pantheons
import PantheonIndexPage from "./pages/pantheons/PantheonIndexPage"
import PantheonShowPage from "./pages/pantheons/PantheonShowPage"

// Domains
import DomainIndexPage from "./pages/domains/DomainIndexPage"
import DomainShowPage from "./pages/domains/DomainShowPage"

function App() {


  return (
    <>
      <GlobalContext.Provider value={{API_STORAGE_URL: import.meta.env.VITE_API_STORAGE_URL, API_URL_GODS: import.meta.env.VITE_API_URL_GODS, API_URL_PANTHEONS: import.meta.env.VITE_API_URL_PANTHEONS, API_URL_DOMAINS: import.meta.env.VITE_API_URL_DOMAINS}}>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout/>}>
              <Route index element={<HomePage />} />
              <Route path="/gods" element={<GodIndexPage />} />
              <Route path="/gods/:id" element={<GodShowPage />} />
              <Route path="/pantheons" element={<PantheonIndexPage />} />
              <Route path="/pantheons/:id" element={<PantheonShowPage />} />
              <Route path="/domains" element={<DomainIndexPage />} />
              <Route path="/domains/:id" element={<DomainShowPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  )
}

export default App
