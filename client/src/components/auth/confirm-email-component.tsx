import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ConfirmPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  console.log("asdasdas");
  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/auth/confirm/${token}`);
        console.log("response", response);
        const data = await response.json();
        console.log("data", data);
        if (response.ok) {
          alert(data.message);
          handleNavigate("/");
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error confirming email:", error);
        alert("An error occurred while confirming your email.");
      }
    };

    if (token) {
      confirmEmail();
    }
  }, [token]);

  return (
    <div>
      <h1>E-mail confirm</h1>
      <button onClick={() => handleNavigate("/")}>Home page</button>
    </div>
  );
};

export default ConfirmPage;
