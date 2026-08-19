import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LetterWordCard } from '../letter-word-card';

describe('LetterWordCard', () => {
  it('renders the letter and word correctly', () => {
    render(
      <LetterWordCard
        emoji="🍎"
        word="Apel"
        imagePath="/images/apel.jpg"
      />
    );
    
    expect(screen.getByText('APEL')).toBeInTheDocument();
  });
});
