import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import LoginForm from './components/login';
import RegisterForm from './components/register';
import Quiz from './components/question'

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
