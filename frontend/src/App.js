import { Routes, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen'
import BlogListScreen from './screens/BlogListScreen'
import AdminBlogListScreen from './screens/AdminBlogListScreen'
import AdminUserListScreen from './screens/AdminUserListScreen'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import BlogScreen from './screens/BlogScreen'
import AddBlogScreen from './screens/AddBlogScreen'
import ChatScreen from './screens/ChatScreen'
import ProfileScreen from './screens/ProfileScreen'

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/blogs" element={<BlogListScreen />} />
        <Route path="/blogs/name" element={<BlogListScreen />} exact></Route>
        <Route
          path="/blogs/name/:name"
          element={<BlogListScreen />}
          exact
        ></Route>

        <Route path="/blog/:id" element={<BlogScreen />} exact />
        <Route path="/admin/addblog/:id" element={<AddBlogScreen />} exact />
        <Route path="/admin/bloglist" element={<AdminBlogListScreen />} exact />
        <Route path="/admin/bloglist/pageNumber/:pageNumber" element={<AdminBlogListScreen />} exact/>
        <Route path="/admin/userlist" element={<AdminUserListScreen />} exact />
      </Routes>
    </>
  );
}

export default App;