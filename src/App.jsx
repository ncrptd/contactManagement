import './App.css'
import Header from './components/Header'
import Contacts from './components/contacts'

function App() {

  return (
    <div className='App'>
      <Header />
      <div className='container mx-auto p-1 lg:p-2'>
        <Contacts />
      </div>
    </div>
  )
}

export default App
