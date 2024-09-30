type TTime = {
  name: string;
  time: number;
};

export type TRecipe = {
  title: string;
  isDeleted?: boolean;
  isPremium?: boolean;
  ratting?: number;
  upvote?: string[];
  downvote?: string[];
  comments?: string[];
  ingredients: string[];
  timeFun: TTime[];
  thumbnail: string;
  tags: string;
};
