import './App.css';
import React from "react";
import TestContainer from "./components/TestApp/TestContainer";
import store from "./redux/store";

function App() {
  return (
      <div className={'app-wrapper'}>
          <TestContainer store={store}/>
      </div>
  );
}

export default App;
