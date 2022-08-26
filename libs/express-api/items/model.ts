export interface Item {
  id: string;
  value: string;
}

export const itemStorage = (): Item[] => [
  {
    id: "1",
    value: "A",
  },
  {
    id: "2",
    value: "B",
  },
  {
    id: "3",
    value: "C",
  },
];
