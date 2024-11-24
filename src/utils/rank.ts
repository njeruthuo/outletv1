export function AccessLevelEvaluator() {
  const arg = localStorage.getItem("accessLevel");
  if (arg == "Employee") return "Employee";
  if (arg == "Admin") return "Admin";
  if (arg == "Manager") return "Manager";
  return "";
}