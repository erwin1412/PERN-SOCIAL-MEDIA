/* eslint-disable react/react-in-jsx-scope */

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { ThreadCard } from "./features/thread";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import Index from "./pages/detail/Index";
import LayouteRight from "./pages/layouts/LayouteRight";
// import { SimpleSidebar } from "./pages/layouts/sidebar";
SimpleSidebar
// import { API, setAuthToken } from "./lib/api";
import React, { useEffect, useState } from "react";
import { API, setAuthToken } from "./lib/api";
import FormLogin from "./pages/login";
import FormRegister from "./pages/regis";
import { useSelector } from "react-redux";
import { RootState } from "./stores/types/rootState";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import { useDispatch } from "react-redux";
import SimpleSidebar from "./pages/layouts/sidebar";
// import { QueryClient } from "@tanstack/react-query";
// import { Thread } from "./features/thread/components/thread";
// import Detail from "./pages/detail/Index";
function App() {
  const dispatch = useDispatch();

  const [, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  console.log(auth);

  async function AuthCheck(simpantoken : string) {
    try {
      setAuthToken(simpantoken);
      const response = await API.get("/auth/check");
      console.log("Auth Check Berhasil", response);
      dispatch(AUTH_CHECK({token: simpantoken}))
      console.log("ini bagian dispatch auth check:  ",dispatch(AUTH_CHECK))
      setIsLoading(false);
    } catch (error) {
      dispatch(AUTH_ERROR)
      setIsLoading(false);
      navigate("/auth/login");
      console.log("Auth Error : ", error);
    }
  }

  useEffect(() => {
    console.log(["ini bagian get token" , localStorage.getItem('token')])
    if (localStorage.getItem('token')) {
      // AuthCheck(localStorage.getItem('token'));
      AuthCheck(localStorage.token);
    } else {
      setIsLoading(false);
    }
  }, []);
  const token = localStorage.getItem('token');


return (
  <>

<React.Fragment>
      {token ? (
        <div>
          <Grid templateColumns="repeat(12, 1fr)" gap={3}>
            <GridItem colSpan={2}>
              <SimpleSidebar />
            </GridItem>
            <GridItem colSpan={9}>
              <Box>
                <div className="main-content">
                  {/* Your main content */}
                  <Routes>
                    <Route path="/" element={<ThreadCard />} />
                    <Route path="/detail/:id" element={<Index />} />
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
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/detail/:id" element={<Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={<FormLogin />} />
            <Route path="/auth/register" element={<FormRegister />} />
          </Routes>
        </div>
      )}
    </React.Fragment>
  </>
);
}

export default App;
