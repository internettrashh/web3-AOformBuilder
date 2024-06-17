
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useActiveAddress, ConnectButton, useConnection } from "@arweave-wallet-kit/react";
import { createDataItemSigner, message, dryrun, result, connect } from "@permaweb/aoconnect";


interface Question {
  text: string;
}
declare global {
  interface Window {
    arweaveWallet: {
      connect: (foo: string[]) => void;
      disconnect: () => void;
      getActiveAddress: () => void;
    };
  }
}
export function Createfrom() {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState<string>("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [isPosting, setIsPosting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { connected  } = useConnection();
  const ao = connect();
  const processId = "ZmFtKfSfNiKGWD7ERDnnhuZ6WGusdmiE7MWbkSOwsYo";
  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "" }])
  }
  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].text = value
    setQuestions(updatedQuestions)
  }
  const handleSaveForm = () => {
    console.log("Form Title:", formTitle);
    if (questions.length > 0) {
      let allQuestions = questions.map((question, index) => ` ${index + 1}: ${question.text}`).join(", ");
      console.log(allQuestions);
      // Call createPost with formTitle and allQuestions as arguments
      createPost(formTitle, allQuestions);
    } else {
      console.log("No questions added.");
    }
  };
  
  const createPost = async (title, text) => {
    
    if (!connected) {
      return;
    }
  
    setIsPosting(true);
  
    try {
      const res = await ao.message({
        process: processId,
        tags: [
          { name: "Action", value: "Create-Post" },
          { name: "Content-Type", value: "text/html" },
          { name: "Title", value: title }, // Use the title parameter
        ],
        data: text, // Use the text parameter
        signer: createDataItemSigner(window.arweaveWallet),
      });
      console.log("Post result", res);
  
      const postResult = await result({
        process: processId,
        message: res,
      });
      console.log("Post Created successfully", postResult);
      previewForm(res);
  
    } catch (error) {
      console.log(error);
    }
    setIsPosting(false);
  };
  
  const previewForm = async (FID: string) => {
    if (!connected) {
      console.log("Not connected");
      return;
    }
  
    try {
      const response = await ao.message({
        process: processId,
        data: "",
        tags: [
          { name: "Action", value: "View-Form" },
          { name: "FID", value: FID }
        ],
        signer: createDataItemSigner(window.arweaveWallet),
      });
      console.log("Form preview response:", response);
  
      try {
        let { Output,Messages } = await result({
          message: response, // Assuming this is the correct parameter for the result function
          process: processId,
        });
        // Parse Output.data as JSON and log it
        if (Output && Output.data) {
          const dataObject = JSON.parse(Output.data);
          console.log("messages are", Messages);
          console.log("Filtered result data:", dataObject);
        
          navigate('/preview', { state: { data: dataObject, messages: Messages } });
        } else {
          console.log("Filtered result:", { Output });
          // Navigate to the preview page with Messages even if Output.data is not present
          navigate('/preview', { state: { output: Output, messages: Messages } });
        }
      } catch (resultError) {
        console.error("Error processing result:", resultError);
      }
    } catch (error) {
      console.error("Error previewing form:", error);
    }
  };
      

  return (
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
          <h1 className="text-2xl font-bold">Create Form</h1>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="formTitle">Form Title</Label>
            <Input
              id="formTitle"
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <div>
            <Label>Questions</Label>
            <div className="space-y-2">
              {questions.map((question, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    className="flex-1 rounded-md bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const updatedQuestions = [...questions]
                      updatedQuestions.splice(index, 1)
                      setQuestions(updatedQuestions)
                    }}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-2" onClick={handleAddQuestion}>
              Add Question
            </Button>
          </div>
          <div className="flex justify-end">
          {isPosting ? (
              <p>Saving...</p> // Example loading indicator
            ) : (
              <Button onClick={handleSaveForm} disabled={isPosting}>Save Form</Button>
            )}
          </div>
        </div>
      </div>
    </div>
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


function FileIcon(props: React.SVGProps<SVGSVGElement> ) {
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
function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}