import React from 'react';
import { render } from '@testing-library/react';
import { RepoItem } from '../RepoItem';

const renderRepoItem = (props: Parameters<typeof RepoItem>[number]) =>
  render(<RepoItem {...props} />);

describe('<RepoItem />', () => {
  it('should match the snapshot', () => {
    const repoItem = renderRepoItem({
      name: 'test',
      starCount: 1,
      url: 'testUrl',
    });
    expect(repoItem.container.firstChild).toMatchSnapshot();
  });

  it('should have url in <a> child', () => {
    const url = 'url1';
    const repoItem = renderRepoItem({
      name: 'test',
      starCount: 1,
      url: url,
    });
    expect(repoItem.container.querySelector('a')).toHaveAttribute('href', url);
  });

  it('should have props displayed', () => {
    const url = 'url1';
    const starCount = 1;
    const name = 'test';
    const repoItem = renderRepoItem({
      name: name,
      starCount: starCount,
      url: url,
    });
    expect(repoItem.queryByText(name)).toBeInTheDocument();
    expect(repoItem.queryByText(starCount.toString())).toBeInTheDocument();
  });
});
