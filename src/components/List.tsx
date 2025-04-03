import { List as ListType } from "../types";
import Card from "./Card.tsx";
import { Plus } from "lucide-react";

interface ListProps {
  list: ListType;
  labelColors: {
    [key: string]: string;
  };
}

const List = ({ list, labelColors }: ListProps) => {
  return (
    <div className="min-w-[272px] flex flex-col max-h-full rounded">
      <div className="flex justify-between bg-gray-100 rounded mb-2 items-center p-2 sticky top-0 z-10">
        <h3 className="font-medium text-sm">{list.title}</h3>
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
      {/* Modified class for better mobile support */}
      <div className="pb-2 space-y-2 overflow-y-auto flex-grow scrollbar-hide custom-scroll">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} labelColors={labelColors} />
        ))}
        <button className="border border-dashed border-gray-300 flex items-center justify-center w-full p-10 hover:bg-gray-200 rounded text-gray-800 text-sm">
          <Plus className="w-4 h-4 mr-1" />
          Add new card
        </button>
      </div>
    </div>
  );
};

export default List;