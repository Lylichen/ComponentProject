import logo from './logo.svg';
import './App.css';

function App() {
  const list = []
  return (
    <div className="App">
      <div className="gift-list">
        <Swiper list={list} perCount={3} showImg={false} />
      </div>
    </div>
  );
}

export default App;
