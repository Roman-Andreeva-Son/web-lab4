import './App.css'
import { StartPage } from './components/StartPage'
import { MainPage } from './containers/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './containers/store'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={StartPage} />
          <Route path='/main' Component={MainPage} />
        </Routes>
      </BrowserRouter>
    </Provider> 
  )
}
