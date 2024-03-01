import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Home } from "./pages/Home";
// import { Amplify } from "aws-amplify"
// import { awsconfig } from "./aws-exports";
// import { Account } from "./Accounts";

// Amplify.configure(awsconfig);

function App() {
  const text = "Start your flowchart"
  return (
    <div>
      <Router>
        {/* <Account> */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/schedule-appointment" element={<ProjectFormCompleted />} /> */}
          </Routes>
        {/* </Account> */}
      </Router>
    </div>
  );
}

export default App;
