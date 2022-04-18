export interface SearchItem {
  type: string;
  id: string;
  name: {
    type: string;
    value: string;
  };
  yearpublished: {
    value: string;
  };
}

interface Value {
  value: string;
}

interface GameName {
  type: "primary" | "alternate";
  sortindex: string;
  value: string;
}

export interface GameItem {
  type: string;
  id: string;
  thumbnail: string;
  image: string;
  name: GameName | GameName[];
  description: string;
  statistics: {
    page: string;
    ratings: {
      usersrated: Value;
      average: Value;
      bayesaverage: Value;
    };
  };
}
