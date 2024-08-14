import { Suspense, useEffect } from "react";
import { Routes, useNavigate } from "react-router-dom";
import { ConfigProvider } from "antd";

import { generateRoutes, routes } from "./routes/routes";
import { ProfileProvider } from "./components/context/profileContext";
import { useFetchUserQuery } from "./features/auth/auth-api-slice";

const App = () => {
  const navigate = useNavigate();
  const { data, isSuccess } = useFetchUserQuery();
  useEffect(() => {
    if (isSuccess && data?.student_profile_id) {
      navigate("/matching");
    } else if (isSuccess && data?.teacher_profile_id) {
      navigate("/requests");
    } else if (isSuccess && data?.id) {
      navigate("/profile-setup");
    } else {
      navigate("/");
    }
  }, [isSuccess]);
  return (
    <ProfileProvider>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorPrimary: "#A76F6E",
              boxShadow: "#A76F6E",
              optionSelectedBg: "rgba(167, 111, 110, 0.209)",
              optionActiveBg: "rgba(167, 111, 110, 0.209)",
              colorPrimaryHover: "rgba(167, 111, 110, 0.209)",
              controlOutline: "rgba(167, 111, 110, 0.209)",
            },
            Input: {
              colorPrimary: "#A76F6E",
              controlOutline: "rgba(167, 111, 110, 0.209)",
              colorPrimaryHover: "rgba(167, 111, 110, 0.209)",
            },
            Button: {
              defaultActiveBorderColor: "rgba(167, 111, 110, 0.209)",
              defaultActiveColor: "rgba(167, 111, 110, 0.209)",
            },
            Slider: {
              dotActiveBorderColor: "rgba(167, 111, 110)",
              handleActiveColor: "rgba(167, 111, 110)",
              handleActiveOutlineColor: "rgba(167, 111, 110, 0.209)",
              handleColor: "rgba(167, 111, 110)",
              trackHoverBg: "rgba(167, 111, 110, 0.209)",
              trackBg: "rgba(167, 111, 110)",
              colorPrimaryBorderHover: "rgba(167, 111, 110)",
            },
            Tabs: {
              inkBarColor: "#A76F6E",
              itemActiveColor: "#A76F6E",
              itemSelectedColor: "#A76F6E",
              itemHoverColor: "rgba(167, 111, 110)",
            },
          },
        }}
      >
        <div>
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>{generateRoutes(routes)}</Routes>
            </Suspense>
          </main>
        </div>
      </ConfigProvider>
    </ProfileProvider>
  );
};

export default App;
