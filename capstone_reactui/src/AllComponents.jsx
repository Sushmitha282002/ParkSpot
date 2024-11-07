import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "./Components/Auth/Login";

import Dashboard from "./Components/Dashboards/Dashboard.jsx";

import AdminDashBoard from "./Components/Dashboards/AdminDashBoard.jsx";

import ResetPassword from "./Components/Auth/ResetPassword";

import ResetPasswordForm from "./Components/Auth/ResetPasswordForm";

import Registration from "./Components/Auth/Registration.jsx";

import ForgotPassword from "./Components/Auth/ForgotPassword.jsx";

import HomePage from "./Components/pages/HomePage.jsx";

import ProviderDashboard from "./Components/Dashboards/ProviderDashboard.jsx";

import AboutUs from "./Components/pages/AboutUs.jsx";

import ContactUs from "./Components/pages/ContactUs.jsx";

import Faq from "./Components/pages/Faq.jsx";

import NotificationComponent from "./Components/Admin_Dashboard_components/NotificationComponent.jsx";

import ProviderDetails from "./Components/Admin_Dashboard_components/ProviderDetails.jsx";

import UserDetails from "./Components/Admin_Dashboard_components/UserDetails.jsx";

import ParkAreaCard from "./Components/Dashboards/ParkAreaCard.jsx";

import Vehicle from "./Components/Dashboards/Vehicle.jsx";

import BookingDetails from "./Components/Dashboards/BookingDetails.jsx";

import PaymentSuccessfull from "./Components/Dashboards/PaymentSuccessfull.jsx";

import PaymentDetails from "./Components/Dashboards/PaymentDetails.jsx";

import Search from "./Components/Dashboards/Search.jsx";

import WeeklyDataTable from "./Components/Admin_Dashboard_components/WeeklyDataTable.jsx";

import ProtectedRoute from "./ProtectedRoute";

import NotFound from "./Components/pages/NotFound.jsx";

function AllComponents() {
  const user = useSelector((state) => state.user.user);

  const isAuth = user?.token;

  const userRole = user?.role;

  const isGoogleAuth = user?.loginType === "google";

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            isAuth ? (
              // If authenticated through Google, redirect to the dashboard without role checking

              isGoogleAuth ? (
                <Navigate to="/dashboard" />
              ) : userRole === "admin" ? (
                <Navigate to="/dashboard1" /> // Redirect to admin dashboard
              ) : userRole === "provider" ? (
                <Navigate to="/dashboard2" /> // Redirect to provider dashboard
              ) : (
                <Navigate to="/dashboard" /> // Redirect to user dashboard
              )
            ) : (
              <Login /> // Render the Login component
            )
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route
          path="/resetPasswordForm/:token"
          element={<ResetPasswordForm />}
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/faq" element={<Faq />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isGoogleAuth ? ( // Check if the user logged in through Google
              <Dashboard /> // Directly render the Dashboard for Google auth users
            ) : (
              <ProtectedRoute
                isAuth={isAuth} // Only normal auth needs to be checked
                userRole={userRole}
                allowedRoles={["user", "provider"]}
              >
                <Dashboard />
              </ProtectedRoute>
            )
          }
        />
        <Route
          path="/dashboard1"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              userRole={userRole}
              allowedRoles={["admin"]}
            >
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard2"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              userRole={userRole}
              allowedRoles={["provider"]}
            >
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              userRole={userRole}
              allowedRoles={["admin"]}
            >
              <NotificationComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/providers"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              userRole={userRole}
              allowedRoles={["admin"]}
            >
              <ProviderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              userRole={userRole}
              allowedRoles={["admin"]}
            >
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parkarea"
          element={
            <ProtectedRoute
              isAuth={isAuth || isGoogleAuth}
              userRole={userRole}
              allowedRoles={["user", "provider"]}
            >
              <ParkAreaCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicle"
          element={
            isGoogleAuth ? ( // Check if the user logged in through Google
              <Vehicle /> // Directly render the Dashboard for Google auth users
            ) : (
              <ProtectedRoute
                isAuth={isAuth || isGoogleAuth}
                userRole={userRole}
                allowedRoles={["user", "provider"]}
              >
                <Vehicle />
              </ProtectedRoute>
            )
          }
        />
        <Route
          path="/booking-details"
          element={
            <ProtectedRoute
              isAuth={isAuth || isGoogleAuth}
              userRole={userRole}
              allowedRoles={["user", "provider"]}
            >
              <BookingDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paymentsuccess"
          element={
            <ProtectedRoute
              isAuth={isAuth || isGoogleAuth}
              userRole={userRole}
              allowedRoles={["user", "provider"]}
            >
              <PaymentSuccessfull />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-details"
          element={
            <ProtectedRoute
              isAuth={isAuth || isGoogleAuth}
              userRole={userRole}
              allowedRoles={["user", "provider"]}
            >
              <PaymentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute
              isAuth={isAuth || isGoogleAuth}
              userRole={userRole}
              allowedRoles={["user", "provider"]}
            >
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weeklydata"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              userRole={userRole}
              allowedRoles={["admin"]}
            >
              <WeeklyDataTable />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AllComponents;
