import "./App.css";
import data from "./utils/data";

function App() {
  return (
    <div className="App">
      <h1>CRUD App</h1>
      <form method="POST">
        <input type="text" name="name" placeholder="Name of Movie" />
        <input type="number" name="review" placeholder="Review" />
        <button type="submit">Submit</button>
      </form>
      { // sample import of fake data
        data.map((item, key) => (
          <>{item.category1}</>
        ))
      }
    </div>
  );
}

export default App;
