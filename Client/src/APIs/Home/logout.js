import axios from "axios";

const logout = async (token, navigate) => {
  await axios
    .post(
      "https://localhost:44343/api/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      navigate("/login");
    })
    .catch((error) => {
      console.error(error);
    });
};
export default logout;
