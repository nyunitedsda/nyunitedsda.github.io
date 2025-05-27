import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UserAgreements from './UserAgreements';

describe('UserAgreements', () => {  
  it('renders UserAgreements', () => {
    const { getByText } = render(<UserAgreements />);

    expect(getByText('UserAgreements Component')).toBeInTheDocument();
  });
});
