import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.css';
import { ArweaveWalletKit } from "@arweave-wallet-kit/react";
import ArConnectStrategy from "@arweave-wallet-kit/arconnect-strategy";
import  {BrowserRouter , Routes , Route} from 'react-router-dom';
import { Landingpage } from './components/landingpage';
import { Listform } from './components/listform';
import { Createfrom } from './components/createfrom';
import { Previewform } from './components/previewform';
import { Thankspage } from './components/thankspage';
import { Shareform } from './components/Shareform';
import { Analytics } from './components/analytics';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: [
          "ACCESS_ADDRESS",
          "ACCESS_PUBLIC_KEY",
          "SIGN_TRANSACTION",
          "DISPATCH",
        ],
        ensurePermissions: true,
        strategies: [new ArConnectStrategy()],
      }}
      
    >

  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Landingpage/>} />
    <Route path="/dashboard" element={<Listform/>} />
    <Route path="/create" element={<Createfrom/>} />
    <Route path="/preview" element={<Previewform/>} />
    <Route path="/end" element={<Thankspage/>} />
    <Route path="/submit" element={<Shareform/>} />
    <Route path="/analytics" element={<Analytics/>} />

   </Routes>      
     </BrowserRouter>
     
     
    </ArweaveWalletKit>
    
  </React.StrictMode>
);
