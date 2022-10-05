import type IStatus from "@/common/interfaces/IStatus";

const STATUS: IStatus[] = [
  { value: 0, label: "new" },
  { value: 1, label: "pending" },
  { value: 2, label: "scheduled" },
  { value: 3, label: "in progress" },
  { value: 4, label: "completed" },
];

export default STATUS;
