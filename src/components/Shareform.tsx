import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { createDataItemSigner, connect, result } from "@permaweb/aoconnect";
import { ConnectButton, useConnection } from "@arweave-wallet-kit/react";

export function Shareform() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { connected } = useConnection();
  const ao = connect();
  const processID = "ZmFtKfSfNiKGWD7ERDnnhuZ6WGusdmiE7MWbkSOwsYo";
  const [isPosting, setIsPosting] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const Title = searchParams.get('title');

  // Correctly parsing the 'questions' query parameter as an array
  const questionsString = queryParams.get('questions');
  const questions = questionsString ? JSON.parse(decodeURIComponent(questionsString)) : [];

  const FID = searchParams.get('FID');
  const PID = searchParams.get('PID');

  const [textFieldValues, setTextFieldValues] = useState(Array(questions.length).fill(''));

  // Function to extract and display contents from the Body string
  const extractAndDisplayBodyContents = useCallback(() => {
    if (!questions.length) return [];
    const bodyString = questions[0].Body;
    const segments = bodyString.split(',').map(segment => segment.trim()).filter(Boolean);
    const contents = segments.map((segment, index) => {
      const [indexStr, content] = segment.split(':').map(part => part.trim());
      return { index: index + 1, content };
    });
    return contents;
  }, [questions]);

  const contents = extractAndDisplayBodyContents();

  const handleTextFieldChange = (index, value) => {
    const updatedValues = [...textFieldValues];
    updatedValues[index] = value;
    setTextFieldValues(updatedValues);
  };

  const handleClick = async () => {
    const allTextsConcatenated = textFieldValues.join(' / ' );
    console.log(allTextsConcatenated);
    try {
      const res = await ao.message({
        process: processID,
        data: "",
        tags: [
          { name: "Action", value: "postAnswe" },
          { name: "PID", value: PID },
          { name: "FID", value: FID },
          { name: "Ans", value: allTextsConcatenated }
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
      title,
      questions: JSON.stringify(questions),
      FID,
      PID,
    }).toString();
    return `${baseUrl}?${queryParams}`;
  }

  const handleShareClick = () => {
    const title = Title;
    const shareUrl = generateShareUrl(title, questions, FID, PID);
    navigator.clipboard.writeText(shareUrl).then(() => {
      console.log('Share URL copied to clipboard');
    }, (err) => {
      console.error('Could not copy URL to clipboard: ', err);
    });
  };

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
              <h2 className="text-xl font-bold mb-4">{Title}</h2>
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
