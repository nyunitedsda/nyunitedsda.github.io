import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import ContactForm from './ContactForm';

describe('ContactForm', () => {  
  it('renders ContactForm', () => {
    const { getByText } = render(<ContactForm />);

    expect(getByText('ContactForm Component')).toBeInTheDocument();
  });
});
