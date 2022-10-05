import type Issue from "@/common/interfaces/IIssue";

const ISSUES: Issue[] = [
  {
    value: null,
    label: "Please select a issue o remove an existing one",
  },
  {
    value: 1,
    label: "Wrong quantity ordered",
  },
  {
    value: 2,
    label: "Wrong container type",
  },
  {
    value: 3,
    label: "Container not accessible",
  },
  {
    value: 0,
    label: "Other",
  },
];

export default ISSUES;
