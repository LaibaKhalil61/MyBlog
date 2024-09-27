import './App.css';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Login from "./pages/login.js"
import Signup from "./pages/signup.js"
import BlogForm from "./pages/blogform.js"
import EditForm from "./pages/editform.js"
import Home from './pages/home';
import Navbar from './components/Navbar.js';
import {AuthProvider} from "./context.js"
import Blog from "./pages/blog.js"
function App() {
  return (
    <div className="App">
    <AuthProvider>
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/newblog' element={<BlogForm/>}/>
        <Route path='/editblog/:id' element={<EditForm/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
      </Routes>
    </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
