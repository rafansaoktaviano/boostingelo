import { Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ValorantEloBoost from "../pages/ValorantEloBoost/ValorantEloBoost";
import ValorantDuoBoost from "../pages/ValorantDuoBoost/ValorantDuoBoost";
import ValorantWinBoost from "../pages/ValorantWinBoost/ValorantWinBoost";
import ValorantPlacementBoost from "../pages/ValorantPlacementBoost/ValorantPlacementBoost";
import DashboardCustomer from "../pages/DashboardCustomer/DashboardCustomer";
import Dashboard from "../components/Dashboard/Dashboard";
import OrdersCustomerPage from "../pages/OrdersCustomerPage/OrdersCustomerPage";
import OrderDetailsCustomerPage from "../pages/OrderDetailsCustomerPage/OrderDetailsCustomerPage";
import DashboardBooster from "../pages/DashboardBooster/DashboardBooster";
import OrderBoosterPage from "../pages/OrderBoosterPage/OrderBoosterPage";

const routes = [
  <Route path="/" element={<Home />} />,
  <Route path="valorant/elo-boost" element={<ValorantEloBoost />} />,
  <Route path="valorant/duo-boost" element={<ValorantDuoBoost />} />,
  <Route path="valorant/win-boost" element={<ValorantWinBoost />} />,
  <Route
    path="valorant/placement-boost"
    element={<ValorantPlacementBoost />}
  />,
  <Route
    path="/dashboard"
    element={
      <DashboardCustomer>
        <Dashboard />
      </DashboardCustomer>
    }
  />,
  <Route
    path="/order"
    element={
      <DashboardCustomer>
        <OrdersCustomerPage />
      </DashboardCustomer>
    }
  />,
  <Route
    path="/order/:id"
    element={
      <DashboardCustomer>
        <OrderDetailsCustomerPage />
      </DashboardCustomer>
    }
  />,
  <Route
    path="/booster/orders"
    element={
      <DashboardBooster>
        <OrderBoosterPage />
      </DashboardBooster>
    }
  />,
];

export default routes;
