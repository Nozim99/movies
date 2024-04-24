import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../views/Home";
import MainLayout from "../layout/MainLayout";
import MoviePage from "../views/Movie";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

export default Router;