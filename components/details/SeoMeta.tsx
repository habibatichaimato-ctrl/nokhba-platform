import React, { useEffect } from 'react';

interface SeoMetaProps {
  title: string;
  description: string;
}

export const SeoMeta: React.FC<SeoMetaProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    } else {
      const createdMeta = document.createElement('meta');
      createdMeta.name = 'description';
      createdMeta.content = description;
      document.head.appendChild(createdMeta);
    }

    return () => {
      document.title = 'منصة النخبة | فرص العمل، الخدمات والمنتجات الرقمية';
    };
  }, [title, description]);

  return null;
};
