import React from 'react';
import ReactDOM from 'react-dom';
import ExampleImage from './components/user/schedule/ExampleImages';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExampleImage />, div); 
  console.log(div.querySelectorAll("input"))
  let length = div.querySelectorAll("input").length;
  expect(length).toBe(3);
  ReactDOM.unmountComponentAtNode(div);
});

