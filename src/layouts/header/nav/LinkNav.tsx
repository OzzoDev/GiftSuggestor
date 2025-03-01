import { NavLink } from "react-router";

interface LinkNavProps {
  path: string;
  text: string;
}

export default function LinkNav({ path, text }: LinkNavProps) {
  return (
    <NavLink
      to={path}
      className="text-lg text-white font-semibold transition-all duration-300 hover:text-gray-400">
      {text}
    </NavLink>
  );
}
