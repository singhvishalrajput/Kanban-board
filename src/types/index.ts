export interface Label {
    id: string;
    color: string;
  }
  
  export interface Member {
    id: string;
    name?: string;
    avatar: string;
  }
  
  export interface Card {
    id: string;
    title: string;
    description?: string;
    coverImage?: string;
    labels?: Label[];
    comments: number;
    votes: number;
    attachments: number;
    members?: Member[];
  }
  
  export interface List {
    id: string;
    title: string;
    cards: Card[];
  }
  
  export interface Board {
    id: string;
    title: string;
    isPublic: boolean;
    lists: List[];
    members: Member[];
    labelColors: {
      [key: string]: string;
    };
  }