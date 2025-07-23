


export const UsePrompt = () => {
  const handleUsePrompt = () => {
    // Logic to use the prompt, e.g., sending a request to an API
    console.log("Using prompt...");
  };

  return (
    <div>
      <label onClick={handleUsePrompt} className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        AI Prompt
      </label>
    </div>
  );
}