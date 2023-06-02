import axios from "axios";

export const handleSubmit = async (email, password, navigate) => {
  try {
    const result = await axios.post("https://localhost:44343/api/users/login", {
      email,
      password,
    });
    if (result.data.token) {
      const token = result.data.token.accessToken;
      const id = result.data.id;

      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      navigate("/");
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};
