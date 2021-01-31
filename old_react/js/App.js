import Grid from './components/Grid.js';

function App() {
  var items = [{ id: 1, name: "pippo" }, { id: 2, name: "pippofe" }, { id: 3, name: "pippfsdo" }, { id: 4, name: "pippefso" }, { id: 5, name: "pipvdpo" }, { id: 6, name: "pippeo" }, { id: 7, name: "pippdso" }, { id: 8, name: "pipeasdspo" }];
  return React.createElement(
    "div",
    { className: "App container-fluid text-center" },
    React.createElement(Grid, { items: items })
  );
}

export default App;