/* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThreadCard } from "./features/thread";

import { SimpleSidebar } from "./pages/layouts/sidebar";
import { RightBar } from "./pages/layouts/rightbar";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Index from "./pages/detail/Index";

function App() {
  return (
    <>
    
      <BrowserRouter>
      <Box>
      <Grid templateColumns='repeat(12, 1fr)' gap={6}>
      <GridItem colSpan={1}>
      <SimpleSidebar /> 
      </GridItem>
      <GridItem colSpan={8}> 
        <Box>
        
        <div className="main-content">
      
          <Routes>
            <Route path="/" element={<ThreadCard />} />
            <Route path="/detail/:id" element={<Index />} />
          </Routes>
        
        </div>
        </Box>
        </GridItem>
      <GridItem colSpan={3}>
        <div><RightBar /></div> 
        </GridItem>
        </Grid>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;