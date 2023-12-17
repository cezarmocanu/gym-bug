import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ActivityTrackingView } from "./views/ActivityTrackingView";
import { WaterTrackingView } from "./views/WaterTrackingView";
import { MenuView } from "./views/MenuView";
import { HomeView } from "./views/HomeView";
import { CaloriesView } from "./views/CaloriesView";
import { useState } from "react";

function App() {
  const [currentIntake, setCurrentIntake] = useState(0);
  const [activities, setActivities] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<MenuView />}>
          <Route path="/" element={<HomeView />} />
          <Route
            path="/water"
            element={
              <WaterTrackingView
                currentIntake={currentIntake}
                setCurrentIntake={setCurrentIntake}
              />
            }
          />
          <Route
            path="/activity"
            element={
              <ActivityTrackingView
                activities={activities}
                setActivities={setActivities}
              />
            }
          />
          <Route path="/calories" element={<CaloriesView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
