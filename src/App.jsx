import './App.css'
import Header from './components/Header'
import Contacts from './components/Contacts'
import { useContacts } from './hooks/ContactHooks'

function App() {
  const { toggleTooltip } = useContacts();
  return (
    <div className='App' onClick={() => toggleTooltip(false)}>
      <Header />
      <div className='container mx-auto p-1 lg:p-2'>
        <Contacts />
      </div>
    </div>
  )
}

export default App
