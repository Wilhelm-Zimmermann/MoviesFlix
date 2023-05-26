import { Routes, Route } from 'react-router-dom';
import { MovieDetailsPage } from '../pages/MovieDetailsPage';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { RatedMovies } from '../pages/RatedMovies';
import { PrivateRoute } from './PrivateRoute';
import { Login } from '../pages/Login';
import { SearchMovies } from '../pages/SearchMovies';
import { SignUp } from '../pages/SignUp';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/login" element={<Login />} />
      <Route path="/users/create" element={<SignUp />} />
      <Route path="/movies/details/:id" element={<MovieDetailsPage />} />
      <Route path="/movies/search" element={<SearchMovies />} />

      {/* Not found page */}
      <Route path="*" element={<NotFound />} />

      {/* Private Routes */}
      <Route path="/movies/rated" element={<PrivateRoute component={RatedMovies}/>} />
    </Routes>
  );
}