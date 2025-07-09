import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import ConfirmResetPassword from "./pages/ConfirmResetPassword";
import CreatePostPage from "./pages/CreatePostPage";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import ViewingPost from "./pages/ViewingPost";
import { ResetPassword } from "./pages/ResetPassword";
import CreatePostWriting from "./pages/CreatePostWriting";
import CreatePostPreview from "./pages/CreatePostPreview";
import AuthorViewing from "./pages/AuthorViewing";
import ProfilePage from "./pages/ProfilePage";
import HomePageLoggedIn from "./pages/HomePageLoggedIn";
import VerifyEmail from "./pages/VerifyEmail";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot-Password" element={<ForgotPassword />} />
          <Route path="/confirm-reset" element={<ConfirmResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route element={<PrivateRoute />}>
            <Route path="/loggedin" element={<HomePageLoggedIn />} />
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/writing" element={<CreatePostWriting />} />
            <Route path="/preview" element={<CreatePostPreview />} />
            <Route path="/blog/:blogId" element={<ViewingPost />} />
            <Route path="/blogauthor" element={<AuthorViewing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
