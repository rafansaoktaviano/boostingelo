import { Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ValorantEloBoost from "../pages/ValorantEloBoost/ValorantEloBoost";
import ValorantDuoBoost from "../pages/ValorantDuoBoost/ValorantDuoBoost";
import ValorantWinBoost from "../pages/ValorantWinBoost/ValorantWinBoost";
import ValorantPlacementBoost from "../pages/ValorantPlacementBoost/ValorantPlacementBoost";

const routes = [
  <Route path="/" element={<Home />} />,
  <Route path="valorant/elo-boost" element={<ValorantEloBoost />} />,
  <Route path="valorant/duo-boost" element={<ValorantDuoBoost />} />,
  <Route path="valorant/win-boost" element={<ValorantWinBoost />} />,
  <Route
    path="valorant/placement-boost"
    element={<ValorantPlacementBoost />}
  />,
];

export default routes;
