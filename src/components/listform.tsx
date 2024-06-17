
import { Link,useNavigate} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { SVGProps } from "react";
import {useActiveAddress, ConnectButton, useConnection } from "@arweave-wallet-kit/react";
import { useState } from "react";
import { createDataItemSigner, message, dryrun, result, connect } from "@permaweb/aoconnect";
import "./ui/Loader.css";
import { Loader } from "lucide-react"

declare global {
  interface Window {
    arweaveWallet: {
      connect: (foo: string[]) => void;
      disconnect: () => void;
      getActiveAddress: () => void;
    };
  }
}

export function Listform() {
  const navigate = useNavigate(); 
  const { connected } = useConnection();
  const ao = connect();
  const processID = "ZmFtKfSfNiKGWD7ERDnnhuZ6WGusdmiE7MWbkSOwsYo";
  const [isFetching, setIsFetching] = useState(false);
  const [formList, setformList] = useState(); 
  const [ loading, setLoading ] = useState<boolean>(false);
  const handleButtonClick = async (e:any) => {
  const register = async () => {
    if (!connected) {
      return;
    }
    setLoading(true); 
    try {
      const res = await ao.message({
        process: processID,
        tags: [{ name: "Action", value: "Register" }],
        data: "",
        signer: createDataItemSigner(window.arweaveWallet),
      });
      console.log("Register result", res);
      const registerResult = await result({
        process: processID,
        message: res,
      });
      console.log("Registered successfully", registerResult);
      navigate('/create');
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };
  await register();
};
  
  return (
    connected ? 
    (
    <div className="flex min-h-screen w-full bg-gray-950 text-white">
       
      <nav className="flex flex-col items-start gap-4 border-r border-gray-800 p-4">
        <Link className="flex items-center gap-2 text-lg font-semibold" to="#">
          <LayoutGridIcon className="h-6 w-6" />
          <span className="sr-only">Form Builder</span>
        </Link>
        <div className="flex flex-col items-start gap-2">
          <Link
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-900"
            to="/dashboard"
          >
            <FileIcon className="h-5 w-5" />
            Forms
          </Link>
          <Link
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-900"
            to="#"
          >
            <BarChartIcon className="h-5 w-5" />
            Analytics
          </Link>
          <Link
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-900"
            to="#"
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
        </div>
      </nav>
      <div className="flex-1 p-6">
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold">Forms</h1>
    <div className="flex items-center">
    <Button variant="outline" className="mr-2" onClick={handleButtonClick}>Create Form</Button>
      <ConnectButton
        profileModal={true}
        showBalance={false}
        showProfilePicture={true}
      />
    </div>
  </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              className="w-full rounded-md bg-gray-900 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Search forms..."
              type="search"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2" variant="outline">
                <FilterIcon className="h-5 w-5" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                <Checkbox />
                Active{"\n                          "}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <Checkbox />
                Archived{"\n                          "}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <Checkbox />
                Draft{"\n                          "}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-900 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Contact Form</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoveVerticalIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="mt-2 text-sm text-gray-400">A simple contact form for your website.</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-400">Updated 2 days ago</span>
              </div>
              <div className="flex items-center gap-2">
                <EyeIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-400">124 views</span>
              </div>
            </div>
          </Card>
          {loading && <div className="loader">Loading...</div>}
          
        </div>
      </div>
    </div>
    ) : 
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

function BarChartIcon(props:SVGProps<SVGSVGElement>) {
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


function CalendarIcon(props:SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function EyeIcon(props:SVGProps<SVGSVGElement>) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function FileIcon(props:SVGProps<SVGSVGElement>) {
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


function FilterIcon(props:SVGProps<SVGSVGElement>) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function LayoutGridIcon(props:SVGProps<SVGSVGElement>) {
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


function MoveVerticalIcon(props:SVGProps<SVGSVGElement>) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  )
}


function SearchIcon(props:SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SettingsIcon(props:SVGProps<SVGSVGElement>) {
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

