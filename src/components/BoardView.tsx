import { Board } from "../types";
import BoardHeader from "./BoardHeader.tsx";
import ListContainer from "./ListContainer.tsx";

interface BoardViewProps {
  board: Board;
}

const BoardView = ({ board }: BoardViewProps) => {
  return (
    <div className="flex flex-col h-full">
      <BoardHeader board={board} />
      <div className="flex-grow p-4 h-[calc(100vh-144px)] overflow-hidden">
        <ListContainer board={board} />
      </div>
    </div>
  );
};

export default BoardView;