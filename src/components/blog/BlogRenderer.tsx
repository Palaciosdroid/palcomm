'use client';

import { OutputData } from '@editorjs/editorjs';
import { createElement } from 'react';

interface BlogRendererProps {
  data: OutputData;
}

function renderHeader(block: { data: { level: number; text: string } }, index: number) {
  const tag = `h${block.data.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return createElement(tag, {
    key: index,
    className: 'font-bold text-gray-900',
    dangerouslySetInnerHTML: { __html: block.data.text }
  });
}

export default function BlogRenderer({ data }: BlogRendererProps) {
  if (!data || !data.blocks) {
    return <p className="text-gray-500">Kein Inhalt verfügbar.</p>;
  }

  return (
    <div className="prose prose-lg max-w-none">
      {data.blocks.map((block, index) => {
        switch (block.type) {
          case 'header':
            return renderHeader(block, index);

          case 'paragraph':
            return (
              <p
                key={index}
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case 'list':
            return block.data.style === 'ordered' ? (
              <ol key={index} className="list-decimal pl-6">
                {block.data.items.map((item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ol>
            ) : (
              <ul key={index} className="list-disc pl-6">
                {block.data.items.map((item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            );

          case 'quote':
            return (
              <blockquote key={index} className="border-l-4 border-primary pl-4 italic">
                <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
                {block.data.caption && (
                  <cite className="text-sm text-gray-500">— {block.data.caption}</cite>
                )}
              </blockquote>
            );

          case 'delimiter':
            return <hr key={index} className="my-8 border-gray-300" />;

          case 'embed':
            return (
              <div key={index} className="my-6">
                <iframe
                  src={block.data.embed}
                  width={block.data.width || '100%'}
                  height={block.data.height || 320}
                  className="w-full rounded-lg"
                  allowFullScreen
                />
                {block.data.caption && (
                  <p className="text-sm text-gray-500 text-center mt-2">{block.data.caption}</p>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
