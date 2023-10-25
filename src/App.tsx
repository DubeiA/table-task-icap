import { LoginForm } from "./components/LoginForm";
import { selectIsLoggedIn } from "./redux/auth/selectors";
import { useSelector } from "react-redux";
import { Table } from "./components/Table";

function App() {
  const selector = useSelector(selectIsLoggedIn);
  console.log(selector);

  return (
    <div>
      <LoginForm></LoginForm>
      {/* {selector && <Table></Table>} */}
      <Table></Table>
    </div>
  );
}

export default App;
