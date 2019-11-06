import "./index.css";
import * as React from "react";
import { Provider } from "react-redux";

import { MainRouter } from "./mainRouter";
import store from "./shared/store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};

export default App;
