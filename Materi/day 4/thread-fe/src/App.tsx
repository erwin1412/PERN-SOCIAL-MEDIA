/* eslint-disable react/react-in-jsx-scope */

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { ThreadCard } from "./features/thread";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import Index from "./pages/detail/Index";
import LayouteRight from "./pages/layouts/LayouteRight";
import { SimpleSidebar } from "./pages/layouts/sidebar";
// import { API, setAuthToken } from "./lib/api";
import { useEffect, useState } from "react";
import { API, setAuthToken } from "./lib/api";
import FormLogin from "./pages/login";
import FormRegister from "./pages/regis";
import { useSelector } from "react-redux";
import { RootState } from "./stores/types/rootState";
function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const auth = useSelector((state : RootState) => state.auth);
  
  console.log(auth)

  async function AuthCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      console.log("Auth Check Berhasil", response);
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoading(false);
      navigate("/auth/login");
      console.log("Auth Error : ", error);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      AuthCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? null : (
        <Box>
          <Grid templateColumns="repeat(12, 1fr)" gap={3}>
            <GridItem colSpan={1}>
              <SimpleSidebar />
            </GridItem>
            <GridItem colSpan={10}>
              <Box>
                <div className="main-content">
          <Routes>
            <Route path="/" element={localStorage.token ? <ThreadCard /> : <Navigate to="/auth/login" />} />
            <Route path="/detail/:id"  element={localStorage.token ? <Index /> : <Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={!localStorage.token ? <FormLogin /> : <Navigate to="/" />} />
            <Route path="/auth/register" element={!localStorage.token ? <FormRegister /> : <Navigate to="/" />} />
          </Routes>
                </div>
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <div>
                <LayouteRight />
              </div>
            </GridItem>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default App;
