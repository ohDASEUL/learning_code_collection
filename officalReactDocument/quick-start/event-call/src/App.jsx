function handleClick() {
  alert("You clicked me!");
}

function App() {
  return <button onClick={handleClick}>Click me</button>;
}

export default App;
