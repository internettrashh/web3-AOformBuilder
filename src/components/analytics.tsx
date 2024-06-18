
import { Link, useLocation } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { CChart } from '@coreui/react-chartjs';
import React, { useState ,useEffect } from 'react';
import { createDataItemSigner, message, dryrun, result, connect } from "@permaweb/aoconnect";
import {useActiveAddress, ConnectButton, useConnection } from "@arweave-wallet-kit/react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
declare global {
  interface Window {
    arweaveWallet: {
      connect: (foo: string[]) => void;
      disconnect: () => void;
      getActiveAddress: () => void;
    };
  }
}

export function Analytics() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { connected } = useConnection();
  const ao = connect();
  const location = useLocation();
  const processID = "ZmFtKfSfNiKGWD7ERDnnhuZ6WGusdmiE7MWbkSOwsYo";
  const { post } = location.state || {};

  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true);
      try {
        const resl = await ao.message({
          process: processID,
          tags: [{ name: "Action", value: "View-Responses" },
                 { name: "FID", value: post.FID }],
          data: "",
          signer: createDataItemSigner(window.arweaveWallet),
        });
        console.log("Dry run result", resl);

        let { Output } = await result({
          message: resl,
          process: processID,
        });

        const resp = JSON.parse(Output.data);
        console.log("responses", resp);
        setData(resp);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setData([]); // Set data to an empty array in case of error
      } finally {
        setIsLoading(false); // Ensure isLoading is set to false in both success and error cases
      }
    }

    fetchPost(); // Call fetchPost within useEffect
  }, [post]); // Add `post` as a dependency if it can change over time

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    ); // Display loading indicator
  }
  return (
    connected ? 
    (
    <div className="flex min-h-screen w-full bg-gray-950 text-white">
      <nav className="flex flex-col items-start gap-4 border-r border-gray-800 p-4">
        <Link to="#" className="flex items-center gap-2 text-lg font-semibold" >
          <LayoutGridIcon className="h-6 w-6" />
          <span className="sr-only">Form Builder</span>
        </Link>
        <div className="flex flex-col items-start gap-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-900"
            
          >
            <FileIcon className="h-5 w-5" />
            Forms
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-900 bg-gray-900"
            
          >
            <BarChartIcon className="h-5 w-5" />
            Analytics
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-900"
            
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
         
        </div>
      </nav>
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gray-900 p-4 w-full max-w-[100%] text-white  h-64">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-medium">Total Submissions</h3>
  </div>
  <div className="flex flex-col items-between justify-center mt-8">
      <div className="mt-4 flex items-center justify-between">
      <div>
      {/* Your existing JSX, assuming data is now available */}
      <div className="text-4xl font-bold">{data.AnswerCount}</div>
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <ArrowUpIcon className="h-4 w-4 text-green-500" />
      <span>12% increase</span>
      </div>
    </div>
  </div>
</Card>


<Card className="bg-gray-900 p-4 w-3/4 max-w-[100%] text-white ml-60">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-medium">Sentiment Analysis</h3>
  </div>
  <CChart
    type="doughnut"
    data={{
      labels: ['positive', 'negative'],
      datasets: [
        {
          backgroundColor: ['#FFFFFF', '#000000'], // Corrected the color code for black
          data: [40, 20],
        },
      ],
    }}
    options={{
      plugins: {
        legend: {
          labels: {}
        }
      },
    }}
  />
  <div className="mt-1">
  </div>
</Card>
          
        </div>
        <h2 className="text-xl font-bold mt-6">Submissions for {post.Title}</h2>
        <table >
      <thead>
        <tr>
          <th>user</th>
          <th>response</th>
        </tr>
      </thead>
      <tbody>
  {data.Answers.map((item, index) => (
    <tr key={index}>
    <td style={{ paddingRight: '50px' }}>{item.PID.length > 10 ? `${item.PID.substring(0, 10)}...` : item.PID}</td>
    <td>{item.ANS}</td>
  </tr>
  ))}
</tbody>
    </table>
      
      </div>
    </div>
  ):
   
    (
      <div className="max-w-6xl mx-auto mt-8 pt-16">
      <div className="text-center mt-8 text-4xl font-bold mb-4">
        <p>Please connect your wallet to create posts.</p>
      </div>
      <div className="flex justify-center items-center h-screen">
  <ConnectButton
      accent="rgb(32, 32, 32)"
    profileModal={true}
    showBalance={false}
    showProfilePicture={true}
  />
</div>
      </div>
    )
  );
}

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}


function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}


function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}





function LayoutGridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}





function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
