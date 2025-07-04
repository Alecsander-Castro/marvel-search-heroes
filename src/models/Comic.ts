export interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  dates: {
    type: string;
    date: string;
  }[];
}
