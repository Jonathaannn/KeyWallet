import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesContent from "./Routes/Index";

function App() {
  return (
    <Router>
      <AuthProvider>
        <RoutesContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
