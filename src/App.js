import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout Components
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import TabContent from "./components/common/TabContent";
import ConfigWarning from "./components/common/ConfigWarning";
import ErrorBoundary from "./components/common/ErrorBoundary";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Page Components
import DocumentationRedirect from "./components/DocumentationRedirect";
import LoginPage from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Custom Hooks
import { useConfigValidation } from "./hooks/useConfigValidation";

// Documentation routes configuration
const DOC_ROUTES = [
  { path: "/README.md", redirectPath: "README.md" },
  { path: "/QUICK_SETUP.md", redirectPath: "docs/setup/QUICK_SETUP.md" },
  {
    path: "/PROJECT_SUMMARY.md",
    redirectPath: "docs/project/PROJECT_SUMMARY.md",
  },
  {
    path: "/PROJECT_COMPLETE.md",
    redirectPath: "docs/project/PROJECT_COMPLETE.md",
  },
  { path: "/DEPLOYMENT.md", redirectPath: "docs/guides/DEPLOYMENT.md" },
  { path: "/docs/README.md", redirectPath: "docs/README.md" },
  { path: "/docs/setup/*", redirectPath: "docs/setup/QUICK_SETUP.md" },
  { path: "/docs/guides/*", redirectPath: "docs/guides/DEPLOYMENT.md" },
  { path: "/docs/project/*", redirectPath: "docs/project/PROJECT_SUMMARY.md" },
];

// Main App Component (Tab-based interface)
const MainApp = () => {
  const [activeTab, setActiveTab] = useState("sheets");
  const { configValid, isLoading } = useConfigValidation();

  if (isLoading) {
    return <LoadingSpinner message="Checking configuration..." />;
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <Header />

        {!configValid && <ConfigWarning />}

        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <TabContent activeTab={activeTab} />

        <Footer configValid={configValid} />
      </div>
    </ErrorBoundary>
  );
};

// Main App Component with Router
const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Documentation routes - redirect to GitHub */}
          {DOC_ROUTES.map(({ path, redirectPath }) => (
            <Route
              key={path}
              path={path}
              element={<DocumentationRedirect path={redirectPath} />}
            />
          ))}

          {/* Authentication routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Legacy main app route (redirects to dashboard if authenticated) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback for old routes */}
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
