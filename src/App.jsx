import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ActivityTrackingView } from "./views/ActivityTrackingView";
import { WaterTrackingView } from "./views/WaterTrackingView";
import { MenuView } from "./views/MenuView";
import { HomeView } from "./views/HomeView";
import water from "./assets/water.png";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<MenuView />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/water" element={<WaterTrackingView />} />
          <Route path="/activity" element={<ActivityTrackingView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
