import React from 'react';
import InputAutoComplete from '../../src/web/private/js/presentational/InputAutoComplete.js'
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<InputAutoComplete></InputAutoComplete>)
  expect(tree).toMatchSnapshot();
});