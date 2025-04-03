import { useEffect, useState } from "react";
import { Board } from "./types";
import BoardView from "./components/BoardView.tsx";

function App() {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://json-data-api-4ry2.onrender.com/api/data",);
        if (!response.ok) {
          throw new Error("Failed to fetch board data");
        }
        const data = await response.json();
        setBoard(data.board);
      } catch (err) {
        setError("Error fetching board data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return board ? <BoardView board={board} /> : null;
}

export default App;