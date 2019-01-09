// import React from 'react';
// import { shallow, mount, render } from 'enzyme';
 import App from '../client/src/index';
// import ReactDOM from 'react-dom';

describe('A suite', function() {
  it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });
  it('should render without throwing an error', function() {
    expect(shallow(<App />).contains(<div style={styles.app} id="app">Welcome to React!</div>)).toBe(true);
  });

  /// it('should be selectable by class "header"', function() {
  //   expect(shallow(<App />).is('.header')).toBe(true);
  // });

  // it('should mount in a full DOM', function() {
  //   expect(mount(<App />).find('.header').length).toBe(1);
  // });

  // it('should render to static HTML', function() {
  //   expect(render(<App />).text()).toEqual('Welcome to React!');
  // });
});