'use client';

/* eslint-disable simple-import-sort/imports */

import * as React from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/buttons/Button';

import '@/lib/env';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [confession, setConfession] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  function handlePageClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    textareaRef.current?.focus();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!confession.trim()) return;
    try {
      setIsLoading(true);
      await fetch('/api/confessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confession }),
      });
      setConfession('');
      toast.success('Confession is submitted');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to submit confession', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      onClick={handlePageClick}
      className='flex min-h-screen flex-col items-center justify-center dark:bg-neutral-900 px-4'
    >
      <form
        onSubmit={handleSubmit}
        className='flex w-full max-w-2xl flex-col items-center gap-4'
      >
        <textarea
          ref={textareaRef}
          value={confession}
          onChange={(e) => setConfession(e.target.value)}
          placeholder="you really think you can keep that secret??? click anywhere to type."
          className='h-64 w-full resize-none text-3xl rounded-sm bg-transparent p-4 font-mono placeholder:italic placeholder:text-neutral-600 outline-none focus:border-none focus:ring-0 text-center border-none'
        />
        {confession.trim() && (
          <Button
            type='submit'
            className='cursor-pointer'
            variant='gradient'
            isLoading={isLoading}
            disabled={isLoading}
          >
            Submit Confession
          </Button>
        )}
      </form>
    </main>
  );
}
