'use client';

import { useEffect, useRef, useCallback } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';

interface EditorProps {
  data?: OutputData;
  onChange?: (data: OutputData) => void;
  placeholder?: string;
}

export default function Editor({ data, onChange, placeholder = 'Schreibe hier deinen Blog-Beitrag...' }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  const initEditor = useCallback(async () => {
    if (!holderRef.current || editorRef.current) return;

    const editor = new EditorJS({
      holder: holderRef.current,
      data: data,
      placeholder: placeholder,
      tools: {
        header: {
          class: Header as unknown as EditorJS.ToolConstructable,
          config: {
            placeholder: 'Überschrift eingeben...',
            levels: [1, 2, 3, 4],
            defaultLevel: 2
          }
        },
        list: {
          class: List as unknown as EditorJS.ToolConstructable,
          inlineToolbar: true
        },
        quote: {
          class: Quote as unknown as EditorJS.ToolConstructable,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Zitat eingeben...',
            captionPlaceholder: 'Autor'
          }
        },
        delimiter: Delimiter,
        embed: {
          class: Embed as unknown as EditorJS.ToolConstructable,
          config: {
            services: {
              youtube: true,
              vimeo: true
            }
          }
        }
      },
      onChange: async () => {
        if (onChange && editorRef.current) {
          const content = await editorRef.current.save();
          onChange(content);
        }
      }
    });

    await editor.isReady;
    editorRef.current = editor;
  }, [data, onChange, placeholder]);

  useEffect(() => {
    initEditor();

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initEditor]);

  return (
    <div
      ref={holderRef}
      className="prose prose-lg max-w-none min-h-[400px] border border-gray-200 rounded-lg p-4 bg-white"
    />
  );
}
