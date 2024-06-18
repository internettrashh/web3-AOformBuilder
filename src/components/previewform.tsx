


import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createDataItemSigner, message, dryrun, result, connect } from "@permaweb/aoconnect";
import { useActiveAddress, ConnectButton, useConnection } from "@arweave-wallet-kit/react";

import * as React from "react"
declare global {
  interface Window {
    arweaveWallet: {
      connect: (foo: string[]) => void;
      disconnect: () => void;
      getActiveAddress: () => void;
    };
  }
}
export function Previewform() {
  const navigate = useNavigate();
  const { connected  } = useConnection();
  const ao = connect();
  const processID = "ZmFtKfSfNiKGWD7ERDnnhuZ6WGusdmiE7MWbkSOwsYo";
  const [isPosting, setIsPosting] = useState(false);
  const location = useLocation();
  const data = location.state?.data;
  const {  messages } = location.state || {};
  const PID = messages?.[0]?.Target || '';
  const [textFieldValues, setTextFieldValues] = useState(Array(data?.Questions.length).fill('')); // Step 1
  const extractAndDisplayBodyContents = React.useCallback(() => {
    if (!data || !data.Questions.length) return { contents: [], FID: '' };
    const FID = data.FID; // Extract FID here
    const bodyString = data.Questions[0].Body;
    const segments = bodyString.split(',').map(segment => segment.trim()).filter(Boolean);
    const contents = segments.map((segment, index) => {
      const [indexStr, content] = segment.split(':').map(part => part.trim());
      return { index: index + 1, content };
    });
    return { contents, FID }; // Include FID in the return value
  }, [data]);
  const { contents, FID } = extractAndDisplayBodyContents();
 
  const handleTextFieldChange = (index, value) => { // Helper function for step 2
    const updatedValues = [...textFieldValues];
    updatedValues[index] = value;
    setTextFieldValues(updatedValues);
  };
  const handleClick = async () => {
    const allTextsConcatenated = textFieldValues.join(' / '); // Concatenate all text field values into a single string
    console.log(allTextsConcatenated);
    try {
      const res = await await ao.message({
        process: processID,
        data: "",
        tags: [{ name: "Action", value: "postAnswe" },
        { name: "PID", value: PID },
        { name: "FID", value: FID },
        { name: "Ans", value: allTextsConcatenated}
        ],
        signer: createDataItemSigner(window.arweaveWallet),
        
      });
      console.log("Dry run result", res);
      const postResult = await result({
        process: processID,
        message: res,
      });
      console.log("Post Created successfully", postResult);
      navigate('/end');
  
      
  
    } catch (error) {
      console.log(error);
    }
  };
  function generateShareUrl(title, questions, FID, PID) {
    const baseUrl = "http://localhost:5173/submit";
    const queryParams = new URLSearchParams({
      title, // Add the title to the query parameters
      questions: JSON.stringify(questions), // Assuming questions is an array or object that needs to be stringified
      FID,
      PID,
    }).toString();
    return `${baseUrl}?${queryParams}`;
  }
  const handleShareClick = () => {
    const title = data.Title; // Assuming this is how you access the title in your component
    const questions = data.Questions; // Adjust according to your actual data structure
    const shareUrl = generateShareUrl(title, questions, FID, PID);
    // Example action: Copy the URL to the clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      console.log('Share URL copied to clipboard');
    }, (err) => {
      console.error('Could not copy URL to clipboard: ', err);
    });
  };
  // Function to extract and display contents from the Body string
  

  // Call the function to process the data and store the result
  const processedContents = extractAndDisplayBodyContents();

  return (
    <div className="flex min-h-screen w-full bg-gray-950 text-white">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-start">
          <h1 className="text-2xl font-bold">AO Forms</h1>
        </div>
        <ConnectButton
        profileModal={true}
        showBalance={false}
        showProfilePicture={true}
      />
        <div className="mt-6 space-y-4">
          <div className="flex justify-center ">
            <div>
              <h2 className="text-xl font-bold mb-4">{data?.Title}</h2>
            </div>
          </div>
          {contents.map(({ index, content }) => (
            <div key={index} className="mb-4">
              <p>{index}: {content}</p> 
              <Textarea
                className="w-full rounded-md bg-gray-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-gray-600 dark:text-gray-300"
                placeholder={`Answer `}
                value={textFieldValues[index]} // Display the current value
            onChange={(e) => handleTextFieldChange(index, e.target.value)} // Step 2: Update state on change
                rows={2}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800" onClick={handleClick}>Submit All</Button>
          <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500" variant="outline" onClick={handleShareClick}>
      Share Form
    </Button>
        </div>
      </div>
    </div>
  );
}
