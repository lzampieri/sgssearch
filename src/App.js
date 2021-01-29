import './App.css';
import Grid from './components/Grid';

function App() {
  var items = ["pippo", "paolo", "giacomo", "francesco francesco francesco francesco francesco francesco francesco", "pippo", "paolo", "giacomo", "francesco","pippo", "paolo", "giacomo", "francesco"];
  return (
    <div className="App container-fluid">
      <Grid items={items} />
    </div>
  );
}

export default App;
