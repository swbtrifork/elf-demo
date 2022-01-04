export default interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const intialState = [
  { completed: false, id: Math.random() * 100, text: "Welcome" },
  { completed: false, id: Math.random() * 100, text: "To" },
  { completed: false, id: Math.random() * 100, text: "Redux" },
];

export interface TodosFilterProps {
  filter: "ALL" | "ACTIVE" | "COMPLETED";
}
