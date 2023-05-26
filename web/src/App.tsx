import { BrowserRouter } from "react-router-dom";
import Font from "react-font";
import { AppRoutes } from './routes/Routes';
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <Font family="Roboto">
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </Font>
    </div>
  );
}

export default App;
