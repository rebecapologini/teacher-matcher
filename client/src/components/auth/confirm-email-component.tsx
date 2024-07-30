import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ConfirmPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        console.log(`http://localhost:5173/api/auth/confirm/${token}`);

        const response = await fetch(
          `http://localhost:4000/api/auth/confirm/${token}`
        );
        const data = await response.json();
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
  }, [token, navigate]);

  return (
    <div>
      <h1>E-mail confirm</h1>
      <button onClick={() => handleNavigate("/")}>Home page</button>
    </div>
  );
};

export default ConfirmPage;
