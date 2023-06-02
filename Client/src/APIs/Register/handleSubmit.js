import axios from "axios";

export const handleSubmit = async (
  name,
  surname,
  email,
  password,
  confirmPassword,
  navigate
) => {
  if (password !== confirmPassword) {
    alert("Şifreler eşleşmiyor!");
    return;
  }

  try {
    const result = await axios.post(
      "https://localhost:44343/api/users/register",
      {
        name,
        surname,
        email,
        password,
        confirmPassword,
      }
    );
    const success = result.data.succeeded;
    if (success) {
      navigate("/login");
    } else {
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};
