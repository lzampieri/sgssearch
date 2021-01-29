import Grid from './components/Grid.js';

function App() {
  var items = [
    {id: 1, name: "pippo"},
    {id: 2, name: "pippofe"},
    {id: 3, name: "pippfsdo"},
    {id: 4, name: "pippefso"},
    {id: 5, name: "pipvdpo"},
    {id: 6, name: "pippeo"},
    {id: 7, name: "pippdso"},
    {id: 8, name: "pipeasdspo"},
  ];
  return (
    <div className="App container-fluid text-center">
      <Grid items={items} />
    </div>
  );
}

export default App;
