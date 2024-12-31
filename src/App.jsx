import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Calendar from "./pages/Calendar";
import Chart from "./pages/Chart";
import Home from "./pages/Dashboard/Home";
import FormElements from "./pages/Form/FormElements";
import FormLayout from "./pages/Form/FormLayout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Tables from "./pages/Tables";
import Alerts from "./pages/UiElements/Alerts";
import Buttons from "./pages/UiElements/Buttons";
import DefaultLayout from "./layout/DefaultLayout";
import Kanban from "./pages/Kanban";
import { selectIsAuthenticated } from "./features/authentication/slice/authSlice";
import { useSelector } from "react-redux";
import Resources from "./pages/Resources";

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Check if the route is for authentication pages
  const isAuthRoute =
    pathname === "/auth/signin" || pathname === "/auth/signup";

  return loading ? (
    <Loader />
  ) : isAuthRoute ? (
    <Routes>
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
    </Routes>
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Home" />
                <Home />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/calendar"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Calendar" />
                <Calendar />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/manage-resources"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Resources" />
                <Resources />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Profile" />
                <Profile />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons" />
              <Buttons />
            </>
          }
        />
        <Route
          path="new"
          element={
            <>
              <PageTitle title="new" />
              <Kanban />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
};

export default App;
