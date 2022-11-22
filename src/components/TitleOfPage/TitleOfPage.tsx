import React from 'react';

export const TitleOfPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <p className="h3 title-page">
      <span>{title}</span>
    </p>
  );
};
