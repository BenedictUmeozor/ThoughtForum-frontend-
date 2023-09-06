export interface AnswerInterface {
  _id: string;
  text: string;
  user: {
    _id: string;
    name: string;
  };
  likes: string[];
  question: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthState {
  _id: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface User {
  _id: string;
  name: string;
  followers: string[];
}

interface Category {
  _id: string;
  title: string;
  questions: string[];
}

export interface QuestionInterface {
  _id: string;
  title: string;
  body: string;
  user: User;
  answers: any[];
  likes: any[];
  category: Category;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserProfileInterface {
  _id: string;
  name: string;
  email: string;
  gender: string;
  bio: string;
  questions: string[];
  following: string[];
  followers: string[];
  likedQuestions: string[];
  likedAnswers: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FollowUser {
  _id: string;
  name: string;
  questions: string[];
  followers: string[];
  following: string[];
}

export interface CategoryInterface {
  _id: string;
  title: string;
  question: string[];
}

export interface SnackbarInterface {
  success: boolean;
  successMessage: string;
  error: boolean;
  errorMessage: string;
  info: boolean;
  infoMessage: string;
  warning: boolean;
  warningMessage: string;
}
