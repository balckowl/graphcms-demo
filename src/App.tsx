import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Article from "./pages/Article"
import Header from "./components/Header"
import New from "./pages/New"

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/blog/new" element={<New />} />
        <Route path="/blog/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
