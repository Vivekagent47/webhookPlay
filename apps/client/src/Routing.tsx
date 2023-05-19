import React from "react";
import { Route, Routes } from "react-router-dom";
import Sources from "./pages/Sources/Sources";
import Requests from "./pages/Requests/Requests";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Onboarding from "./pages/Onboarding/Onboarding";
import AccountSettings from "./pages/Settings/AccountSettings";
import Destinations from "./pages/Destinations/Destinations";
import Events from "./pages/Events/Events";
import EventDetails from "./pages/Events/EventDetails";

const Routing = () => (
  <Routes>
    <Route path="/" element={<Sources />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/requests" element={<Requests />} />
    <Route path="/request/all" element={<Requests />} />
    <Route path="/events" element={<Events />} />
    <Route path="/event/all" element={<Events />} />
    <Route path="/event/:id" element={<EventDetails />} />
    <Route path="/destinations" element={<Destinations />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/settings" element={<AccountSettings />} />
  </Routes>
);

export default Routing;
