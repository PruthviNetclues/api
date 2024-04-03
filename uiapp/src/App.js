import './App.css';
import Insert from './Insert_Books';
import Library from './Search_Books';
import Update from './Update_Books';
import { Routes, Route, BrowserRouter as Router  } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Library />} />
      
      <Route path="insert" element={<Insert />} />
      <Route path="update/:id" element={<Update/>}/>
      {/* <Route path="delete/:id" element={<Delete/>}/> */}
      {/* <Route path="insert" element={<Insert />} /> */}
      {/* <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} /> */}
    </Routes>
    </Router>
  );
}

export default App;
