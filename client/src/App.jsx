import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>CRUD App</h1>
      <form method="POST">
        <input type="text" name="name" placeholder="Name of Movie" />
        <input type="number" name="review" placeholder="Review" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
