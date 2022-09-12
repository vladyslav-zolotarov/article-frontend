import { Routes, Route } from 'react-router-dom';
import './App.scss';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';


function App() {
  return (
    <div className="App">
      {/* <Header />
      <Home />
      <Register />
      <Footer /> */}
      <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/posts/:id" element={<FullPost />} /> */}
          {/* <Route path="/posts/:id/edit" element={<AddPost />} /> */}
          {/* <Route path="/add-post" element={<AddPost />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Registration />} />
        </Routes>
    </div>
  );
}

export default App;
