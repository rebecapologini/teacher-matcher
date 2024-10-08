import React from "react";
import "./header-component.css";
import { useNavigate } from "react-router-dom";
interface FooterProps {
  showProfile?: Boolean;
  showBack?: Boolean;
}

const Header: React.FC<FooterProps> = ({ showProfile, showBack }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="main-container">
        <div className="header">
          <div>
            <h1>Teacher Matcher</h1>
          </div>
          {showProfile && (
            <div className="profile" onClick={handleClick}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.58 16.71L19.82 17.85C20.0474 18.8356 19.8228 19.8713 19.2076 20.6742C18.5924 21.4771 17.6508 21.9633 16.64 22H7.35997C6.34915 21.9633 5.40754 21.4771 4.79232 20.6742C4.1771 19.8713 3.95254 18.8356 4.17997 17.85L4.41997 16.71C4.69601 15.1668 6.02259 14.0327 7.58997 14H16.41C17.9774 14.0327 19.3039 15.1668 19.58 16.71ZM16.64 20.49C17.1478 20.4841 17.6256 20.2489 17.94 19.85V19.86C18.3257 19.3762 18.4759 18.7458 18.35 18.14L18.11 17C17.9768 16.1552 17.2646 15.5226 16.41 15.49H7.58998C6.73534 15.5226 6.02314 16.1552 5.88998 17L5.64998 18.14C5.52713 18.7426 5.67724 19.3687 6.05998 19.85C6.37431 20.2489 6.85219 20.4841 7.35998 20.49H16.64Z"
                  fill="#8B5D5D"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.5 12H11.5C9.29082 12 7.49996 10.2092 7.49996 8.00001V5.36001C7.49729 4.46807 7.85043 3.61189 8.48113 2.98119C9.11184 2.35049 9.96802 1.99735 10.86 2.00001H13.14C14.0319 1.99735 14.8881 2.35049 15.5188 2.98119C16.1495 3.61189 16.5026 4.46807 16.5 5.36001V8.00001C16.5 10.2092 14.7091 12 12.5 12ZM10.86 3.50002C9.83271 3.50002 8.99996 4.33277 8.99996 5.36001V8.00001C8.99996 9.38073 10.1192 10.5 11.5 10.5H12.5C13.8807 10.5 15 9.38073 15 8.00001V5.36001C15 4.86671 14.804 4.39361 14.4552 4.0448C14.1064 3.69598 13.6333 3.50002 13.14 3.50002H10.86Z"
                  fill="#8B5D5D"
                />
              </svg>
            </div>
          )}
          {showBack && (
            <div className="profile" onClick={handleBack}>
              <svg
                enable-background="new 0 0 15 26"
                height="13px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 15 26"
                width="9px"
              >
                <polygon
                  fill="#8B5D5D"
                  points="12.885,0.58 14.969,2.664 4.133,13.5 14.969,24.336 12.885,26.42 2.049,15.584 -0.035,13.5 "
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
