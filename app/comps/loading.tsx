import React from 'react';
import { Spinner } from './spinner';

export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <Spinner />
        <h1 className="mt-4 text-black text-lg font-semibold">Loading...</h1>
      </div>
    </div>
  );
}