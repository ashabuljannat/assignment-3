import { Types } from 'mongoose';

export type TTags = {
  name: string;
  isDeleted: boolean;
};

export type TDetails = {
  level: string;
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTags[];
  startDate: Date;
  endDate: Date;
  language: string;
  provider: string;
  // durationInWeeks: number;
  details: TDetails;
};
