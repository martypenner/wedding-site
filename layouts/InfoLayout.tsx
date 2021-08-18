import React from 'react';
import BaseLayout from './BaseLayout';

export default function InfoLayout({ title, children }) {
  return (
    <BaseLayout title={title}>
      <div className="border-t border-black" />

      {children}
    </BaseLayout>
  );
}
