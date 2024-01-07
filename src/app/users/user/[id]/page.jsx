import { useFetchUserDetailsQuery } from "@/redux/store";

const UserDetails = ({ params }) => {
  const userId = params;
  const { data, error, isFetching } = useFetchUserDetailsQuery(userId);
  console.log(data);

  return <div>UserDetails</div>;
};

export default UserDetails;
