import { useState } from "react";
import "./App.css";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [wordCounts, setWordCounts] = useState({});
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;

        setFileContent(text);
        if (text) {
          calculateWordCounts(text);
          setError("");
        } else {
          setError("The file is empty.");
          setWordCounts({});
        }
      };
      reader.onerror = () => {
        setError("Error reading the file. Please try again.");
        setFileContent("");
        setWordCounts({});
      };
      reader.readAsText(file);
    } else {
      setError("Please select a .txt file.");
      setFileContent("");
      setWordCounts({});
    }
  };

  const calculateWordCounts = (text) => {
    const words = text.match(/\b\w+\b/g);

    const counts = {};

    words.forEach((word) => {
      counts[word] = (counts[word] || 0) + 1;
    });

    const repeatedWords = {};
    Object.keys(counts).forEach((word) => {
      if (counts[word] > 1) {
        repeatedWords[word] = counts[word];
      }
    });
    setWordCounts(repeatedWords);
  };

  return (
    <div className="App">
      <h1 className="title">Word Counter</h1>
      <div className="file-upload-container">
        <label htmlFor="file-input" className="file-label">
          Select .txt File
        </label>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          accept=".txt"
          className="file-input"
        />
      </div>
      {error && <div className="error">{error}</div>}
      {fileContent && (
        <div className="file-content">
          <h2 className="content-title">File Content:</h2>
          <pre className="content-text">{fileContent}</pre>
          <h2 className="count-title">Counts of Repeated Words:</h2>
          {Object.keys(wordCounts).length > 0 ? (
            <ul className="word-counts">
              {Object.keys(wordCounts).map((word) => (
                <li key={word} className="word-item">
                  <span className="word">{word}:</span>{" "}
                  <span className="count">{wordCounts[word]}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="no-repeat">No Repeated Words Found</span>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
