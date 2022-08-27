import { BrowserRouter , Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import First from './pages/first/first';
import Login from './pages/login/login';
import Diary from './pages/diary/diary';
import Poll from './pages/poll/poll';
import Result from './pages/result/result';
import ChooseTemplates from './pages/templates/templates';
import Paint from './pages/paint/paint';
import Profile from './pages/profile/profile';
import Colrapy from './pages/colrapy/colrapy';
import Loading from './pages/loding/loding';

function App() {
  return (
    <div className={styles.app}>
        <div className={styles.flexwrap}>
          <BrowserRouter>
              <Routes>
                <Route exact path='/' element={ <First /> } />
                <Route path='/users/login' element={ <Login/> } />
                <Route path='/colrapy' element={ <Colrapy/> } />
                <Route path='/diary' element={ <Diary /> } />
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/diary/loading' element={ <Loading /> } />
                <Route path='/diary/result' element={ <Result /> } />
                <Route path='/canvas/templates' element={ <ChooseTemplates /> } />
                <Route path='/canvas/painting' element={ <Paint/> } />
                <Route path='/canvas/poll' element={ <Poll /> } />
                {/* <Route path='/canvas' element={ <Canvas /> } /> */}
              </Routes>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
