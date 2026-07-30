'use client';

import { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {
  Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon,
  AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Heading3, Type, Quote, List, ListOrdered,
  Check, Pencil
} from 'lucide-react';
import { useCallback } from 'react';

interface EditableBlockProps {
  value: string;
  onChange: (value: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  placeholder?: string;
  allowHeadings?: boolean;
  allowLists?: boolean;
  allowQuotes?: boolean;
  allowAlignment?: boolean;
  minHeight?: string;
}

export default function EditableBlock({
  value,
  onChange,
  as: Component = 'div',
  className = '',
  placeholder = 'Text eingeben...',
  allowHeadings = true,
  allowLists = true,
  allowQuotes = true,
  allowAlignment = true,
  minHeight = '60px',
}: EditableBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: allowHeadings ? { levels: [1, 2, 3] } : false,
        bulletList: allowLists ? {} : false,
        orderedList: allowLists ? {} : false,
        blockquote: allowQuotes ? {} : false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: textToHtml(value),
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-sm max-w-none',
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = htmlToText(html);
      onChange(text);
    },
  });

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && !isEditing && value !== htmlToText(editor.getHTML())) {
      editor.commands.setContent(textToHtml(value));
    }
  }, [editor, value, isEditing]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Link URL eingeben:', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsEditing(false);
    }
  }, []);

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isEditing, handleClickOutside]);

  const startEditing = () => {
    setIsEditing(true);
    setTimeout(() => editor?.commands.focus(), 50);
  };

  if (!editor) return null;

  // Display mode
  if (!isEditing) {
    return (
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={startEditing}
      >
        <Component
          className={`${className} ${isHovered ? 'outline outline-2 outline-blue-400 outline-offset-2 rounded' : ''}`}
          dangerouslySetInnerHTML={{ __html: textToDisplayHtml(value) }}
        />
        {isHovered && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center gap-1 z-50">
            <Pencil className="w-3 h-3" />
            Klicken zum Bearbeiten
          </div>
        )}
      </div>
    );
  }

  // Edit mode
  return (
    <div ref={containerRef} className="relative">
      {/* Floating Toolbar */}
      <div className="absolute -top-12 left-0 right-0 z-50">
        <div className="inline-flex flex-wrap items-center gap-0.5 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-xl">
          {/* Block Types */}
          {allowHeadings && (
            <>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="Überschrift 1"
              >
                <Heading1 className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="Überschrift 2"
              >
                <Heading2 className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
                title="Überschrift 3"
              >
                <Heading3 className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().setParagraph().run()}
                isActive={editor.isActive('paragraph') && !editor.isActive('heading')}
                title="Text"
              >
                <Type className="w-4 h-4" />
              </ToolbarButton>
              <div className="w-px h-5 bg-gray-300 mx-1" />
            </>
          )}

          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Fett"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Kursiv"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Unterstrichen"
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={setLink}
            isActive={editor.isActive('link')}
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>

          {/* Alignment */}
          {allowAlignment && (
            <>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                isActive={editor.isActive({ textAlign: 'left' })}
                title="Linksbündig"
              >
                <AlignLeft className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                isActive={editor.isActive({ textAlign: 'center' })}
                title="Zentriert"
              >
                <AlignCenter className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                isActive={editor.isActive({ textAlign: 'right' })}
                title="Rechtsbündig"
              >
                <AlignRight className="w-4 h-4" />
              </ToolbarButton>
            </>
          )}

          {/* Lists & Quote */}
          {(allowLists || allowQuotes) && (
            <>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              {allowLists && (
                <>
                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Aufzählung"
                  >
                    <List className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Nummerierte Liste"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </ToolbarButton>
                </>
              )}
              {allowQuotes && (
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  isActive={editor.isActive('blockquote')}
                  title="Zitat"
                >
                  <Quote className="w-4 h-4" />
                </ToolbarButton>
              )}
            </>
          )}

          {/* Done Button */}
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <button
            onClick={() => setIsEditing(false)}
            className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
            title="Fertig"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className={`${className} border-2 border-blue-500 rounded-lg p-3 bg-white/95`}>
        <EditorContent editor={editor} />
      </div>

      {/* Editor Styles */}
      <style jsx global>{`
        .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 { font-size: 2rem; font-weight: 700; }
        .ProseMirror h2 { font-size: 1.5rem; font-weight: 600; }
        .ProseMirror h3 { font-size: 1.25rem; font-weight: 600; }
        .ProseMirror blockquote {
          border-left: 3px solid #e5e7eb;
          padding-left: 1rem;
          margin-left: 0;
          color: #6b7280;
          font-style: italic;
        }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; }
      `}</style>
    </div>
  );
}

// Toolbar button component
interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-700'
          : disabled
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {children}
    </button>
  );
}

// HTML conversion utilities
function textToHtml(text: string): string {
  if (!text) return '<p></p>';

  const paragraphs = text.split(/\n\n+/);

  return paragraphs
    .map((para) => {
      if (para.startsWith('### ')) return `<h3>${para.slice(4)}</h3>`;
      if (para.startsWith('## ')) return `<h2>${para.slice(3)}</h2>`;
      if (para.startsWith('# ')) return `<h1>${para.slice(2)}</h1>`;
      if (para.startsWith('> ')) return `<blockquote><p>${para.slice(2)}</p></blockquote>`;

      const lines = para.split(/\n/);
      if (lines.length > 1) {
        return `<p>${lines.join('<br>')}</p>`;
      }
      return `<p>${para}</p>`;
    })
    .join('');
}

function htmlToText(html: string): string {
  if (!html || html === '<p></p>') return '';

  const text = html
    .replace(/<h1[^>]*>/g, '# ')
    .replace(/<\/h1>/g, '\n\n')
    .replace(/<h2[^>]*>/g, '## ')
    .replace(/<\/h2>/g, '\n\n')
    .replace(/<h3[^>]*>/g, '### ')
    .replace(/<\/h3>/g, '\n\n')
    .replace(/<\/p><p>/g, '\n\n')
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<ul>/g, '')
    .replace(/<\/ul>/g, '\n')
    .replace(/<ol>/g, '')
    .replace(/<\/ol>/g, '\n')
    .replace(/<li>/g, '• ')
    .replace(/<\/li>/g, '\n')
    .replace(/<blockquote>/g, '> ')
    .replace(/<\/blockquote>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();

  return text;
}

function textToDisplayHtml(text: string): string {
  if (!text) return '';

  return text
    .split(/\n\n+/)
    .map(para => {
      if (para.startsWith('### ')) return `<h3>${para.slice(4)}</h3>`;
      if (para.startsWith('## ')) return `<h2>${para.slice(3)}</h2>`;
      if (para.startsWith('# ')) return `<h1>${para.slice(2)}</h1>`;
      return para.split('\n').join('<br>');
    })
    .join('<br><br>');
}
