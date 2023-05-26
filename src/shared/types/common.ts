import { Dispatch, SetStateAction } from "react";

export interface TabInterface {
  name: string;
  id: number;
}

export interface UserInfoInterface {
  user: UserInterface;
}

export interface UserInterface {
  name: string;
  avatar: string;
  planets?: number;
  explorers?: number
  stars?: number;
  reviews?: number
  rating?: number | null;
  id: number;
}

export interface UserListInterface {
  list: Array<UserInterface>;
}
export interface ExplorerCardInterface {
  name: string;
  avatar: string;
  id?: number;
}

export interface EducationApplicationInterface {
  name: string;
  avatar: string;
  planet: string;
  rating?: number | null;
  id?: number;
}

export interface GradeApplicationInterface {
  name: string;
  avatar: string;
  star: string;
  planet: string;
  rating?: number | null;
  id?: number;
}

export interface ReviewCardInterface {
  review: ReviewInterface
}

export interface ReviewInterface {
  planet: string
  rating: number
  name: string
  avatar: string
  comment: string
  id?: number
}

export interface ReviewModalInterface {
  review: ReviewInterface
  setIsExpanded?: Dispatch<SetStateAction<boolean>>
  isExpanded?: boolean
}
