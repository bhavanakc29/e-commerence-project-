//import {useAuth, useFetch} from "../hooks/fetchUser";
import { useAuth } from "../hooks/fetchUser";

const HomePage = () => {
const {user} = useAuth();
console.log(user)

  return (
    <div>
      <h1>{user?.name}</h1>
    </div>
  )
}

export default HomePage;