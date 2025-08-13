'use client';

import '@/lib/env';
import * as React from 'react';

import Button from '@/components/buttons/Button';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [confession, setConfession] = React.useState('');

  function handlePageClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    textareaRef.current?.focus();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!confession.trim()) return;
    try {
      await fetch('/api/confessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confession }),
      });
      setConfession('');
    } catch (error) {
      console.error('Failed to submit confession', error);
    }
  }

  return (
    <main
      onClick={handlePageClick}
      className='flex min-h-screen flex-col items-center justify-center bg-white px-4'
    >
      <form
        onSubmit={handleSubmit}
        className='flex w-full max-w-2xl flex-col items-center gap-4'
      >
        <textarea
          ref={textareaRef}
          value={confession}
          onChange={(e) => setConfession(e.target.value)}
          placeholder="start typing your confession and press submit when you're done"
          className='h-64 w-full resize-none text-3xl rounded-sm bg-transparent p-4 font-mono placeholder:italic placeholder:text-neutral-300 outline-none focus:border-none focus:ring-0 text-center border-none'
        />
        {confession.trim() && (
          <Button type='submit' className='cursor-pointer !text-2xl !mx-8 !my-2' variant='gradient' size='base'>
            Submit Confession
          </Button>
        )}
      </form>
    </main>
  );
}
