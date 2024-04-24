import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { QueryClientProvider, useQuery } from "react-query";
import queryClient from "./services/queryClient";
import "./main.css";
import { useEffect } from "react";


const App = () => {

  useEffect(() => {
    document.getElementById("main-loading").style = "display: none;"
  }, [])

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App;