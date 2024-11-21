'use client';

import { CgSpinner } from 'react-icons/cg';

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center">
        <CgSpinner className="animate-spin text-white h-12 w-12" />
        <p className="mt-4 text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}
