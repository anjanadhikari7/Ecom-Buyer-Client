import { useSelector } from "react-redux";

const UserPage = () => {
  const { user } = useSelector((state) => state.user);
  return <p>User</p>;
};

export default UserPage;
