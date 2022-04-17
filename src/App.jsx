import "./App.css";
import "./assets/css/styles.css";
import DragFile from "./components/DragFile";

function App() {
  const onFileChange = (files) => {
    console.log(files);
  };
  return (
    <div className="box">
      <div className="header">React drop files input</div>
      <DragFile onFileChange={(files) => onFileChange(files)} />
    </div>
  );
}

export default App;
