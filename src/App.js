import Heading from './Components/Heading';
import Catalog from './Components/Catalog';
import './App.css';

function App() {
  return (
    <div className="App">
      <Heading />
      <Catalog />
      <Heading isFooter={true} />
    </div>
  );
}

export default App;
