import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import './App.scss'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {publicRoutes.map((route,index)=>{
            const Page = route.component;
            let Layout = DefaultLayout;
            return (
              <Route
                  key={index}
                  path={route.path}
                  element={
                      <Layout>
                          <Page />
                      </Layout>
                  }
              />
          );
          })}
        </Routes>
      </div>
    </Router>

  
  );
}

export default App;
