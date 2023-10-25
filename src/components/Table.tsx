import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/users/userOperation";
import { useSelector } from "react-redux";
import { getUser } from "../redux/users/selectors";
import { User } from "../redux/users/user-slice";
import { useState } from "react";

export const Table = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const user: User[] = useSelector(getUser);
  console.log("table USerr", user);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredUsers = activeFilter
    ? user.filter((user) => user.name === activeFilter)
    : user;

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortDirection === "asc") {
      const nameComparison = a.name!.localeCompare(b.name!);
      if (nameComparison !== 0) {
        return nameComparison;
      }
      // Сортування за іменем не вирішується, переходьте до статі
      return a.gender!.localeCompare(b.gender!);
    } else {
      const nameComparison = b.name!.localeCompare(a.name!);
      if (nameComparison !== 0) {
        return nameComparison;
      }
      // Сортування за іменем не вирішується, переходьте до статі
      return b.gender!.localeCompare(a.gender!);
    }
  });

  // Функція для зміни напрямку сортування
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
  };

  const click = () => {
    dispatch(fetchUsers());
  };

  return (
    <div>
      <div>
        {/* Кнопка для зміни напрямку сортування */}
        <button onClick={toggleSortDirection}>
          Sort: {sortDirection === "asc" ? "А-Z" : "Z-А"}
        </button>
      </div>
      <div>
        {/* Додайте кнопки або розкривний список для вибору фільтра */}
        <button onClick={() => handleFilterChange(null)}>All</button>
        <button onClick={() => handleFilterChange("male")}>Male</button>
        <button onClick={() => handleFilterChange("female")}>Female</button>
      </div>
      {sortedUsers && (
        <ul>
          {sortedUsers.map((user) => {
            return (
              <li key={user.id}>
                <p>{user.name}</p>
                <p>{user.gender}</p>
                <p>{user.email}</p>
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={click}>hi</button>
    </div>
  );
};
