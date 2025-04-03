// Card.tsx with description added
import { Card as CardType } from "../types";
import { MessageSquare, Paperclip, Heart, Plus } from "lucide-react";

interface CardProps {
  card: CardType;
  labelColors: {
    [key: string]: string;
  };
}

const Card = ({ card, labelColors }: CardProps) => {
  return (
    <div className="bg-gray-100 rounded ">
      {card.coverImage && (
        <div className="h-32 overflow-hidden rounded-t">
          <img
            src={card.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-2">
        {card.labels && card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.labels.map((label) => (
              <div
                key={label.id}
                className="w-8 h-2 rounded"
                style={{ backgroundColor: labelColors[label.color] }}
              />
            ))}
          </div>
        )}
        <h4 className="text-sm font-md mb-1">{card.title}</h4>
        
        {/* Add description display here */}
        {card.description && (
          <p className="text-xs text-gray-400 mb-6 ">{card.description}</p>
        )}
        
        <div className="flex items-center justify-between mt-2 mb-2">
          <div className="flex -space-x-1">
            {card.members && card.members.length > 0 && (
              card.members.map((member) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt="Member"
                  className="w-6 h-6 rounded-full border border-white"
                />
              ))
            )}
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <Plus className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            {card.comments > 0 && (
              <div className="flex items-center mr-3">
                <MessageSquare className="h-3 w-3 mr-1" />
                {card.comments}
              </div>
            )}
            {card.attachments > 0 && (
              <div className="flex items-center mr-3">
                <Paperclip className="h-3 w-3 mr-1" />
                {card.attachments}
              </div>
            )}
            {card.votes > 0 && (
              <div className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {card.votes}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;