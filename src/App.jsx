import { useState } from 'react';
import './App.css';
import TreeView from './components/tree-view';
import menus from './components/tree-view/data';
import ImageSlider from './components/image-slider';
import LoadMoreData from './components/load-more-data';
import Accordian from './components/accordian';
import RandomColor from './components/random-color';
import StarRating from './components/star-rating';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'accordion':
        return <Accordian />;
      case 'randomColor':
        return <RandomColor />;
      case 'starRating':
        return <StarRating />;
      case 'imageSlider':
        return <ImageSlider />;
      case 'loadMoreData':
        return <LoadMoreData />;
      case 'treeView':
        return <TreeView menus={menus} />;
      default:
        return <p>Please select a component to view.</p>;
    }
  };

  return (
    <div className="App">
      <h1> Click the component you want to run </h1>
      <div class="Buttons">
        <button onClick={() => setActiveComponent('accordion')}>Accordion</button>
        <button onClick={() => setActiveComponent('randomColor')}>Random Color</button>
        <button onClick={() => setActiveComponent('starRating')}>Star Rating</button>
        <button onClick={() => setActiveComponent('imageSlider')}>Image Slider</button>
        <button onClick={() => setActiveComponent('loadMoreData')}>Load More Data</button>
        <button onClick={() => setActiveComponent('treeView')}>Tree View</button>
      </div>
      <div>
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
