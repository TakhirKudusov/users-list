import './App.css';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import DataTable from './components/DataTable';
import {InstanceProvider} from './context/InstanceContext.js'

function App() {
  return <>
    <InstanceProvider>
      <Navbar />
      <hr id="menu-hr" />
      <Menu />
      <DataTable />
    </InstanceProvider>
  </>
}

export default App;
