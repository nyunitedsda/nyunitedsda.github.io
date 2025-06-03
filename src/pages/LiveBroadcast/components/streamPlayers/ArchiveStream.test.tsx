import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ArchieveStream from './ArchiveStream';

describe('ArchieveStream', () => {
  it('renders ArchieveStream', () => {
    const { getByText } = render(<ArchieveStream />);

    expect(getByText('ArchieveStream Component')).toBeInTheDocument();
  });
});
