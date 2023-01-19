import './App.css'
import PersonList from './components/PersonList'
import { useState, useEffect } from 'react'
const API_URL =
  'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
function App() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL)
        const posts = await res.json()
        setPosts(posts)
      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      <PersonList
        posts={posts}
        setPosts={setPosts}
        error={error}
        setError={setError}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  )
}

export default App
