// Import necessary libraries and components
import './App.css';
import {Fragment} from "react";
import { Provider } from "react-redux";
import NavBar from './components/Navbar/navbar';
import ContactList from './components/ContactList/contactlist';
import { store } from './Redux/store';
import {BrowserRouter,Routes,Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/"
              element={
              <Fragment>
                <NavBar />
                <ContactList />
              </Fragment>
            }>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
