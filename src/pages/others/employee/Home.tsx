import { useSelector } from "react-redux";

const Home = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    console.log(isLoggedIn);
  return (
    <div>Home</div>
  )
}
export default Home