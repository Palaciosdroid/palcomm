'use client';

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
  Check, X, GripVertical, Plus
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';

interface NotionEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export default function NotionEditor({
  value,
  onChange,
  placeholder = 'Tippe "/" für Befehle...',
  className = '',
  minHeight = '120px',
}: NotionEditorProps) {
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [slashFilter, setSlashFilter] = useState('');
  const [selectedSlashIndex, setSelectedSlashIndex] = useState(0);
  const slashMenuRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
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
        class: `prose prose-sm max-w-none focus:outline-none px-4 py-3`,
        style: `min-height: ${minHeight}`,
      },
      handleKeyDown: (view, event) => {
        // Handle slash menu navigation
        if (showSlashMenu) {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedSlashIndex(prev =>
              prev < filteredSlashCommands.length - 1 ? prev + 1 : 0
            );
            return true;
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedSlashIndex(prev =>
              prev > 0 ? prev - 1 : filteredSlashCommands.length - 1
            );
            return true;
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            executeSlashCommand(filteredSlashCommands[selectedSlashIndex]);
            return true;
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            closeSlashMenu();
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = htmlToText(html);
      onChange(text);

      // Check for slash command trigger
      const { from } = editor.state.selection;
      const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from);

      const slashMatch = textBefore.match(/\/([a-zA-Z0-9äöüß]*)$/);
      if (slashMatch) {
        setSlashFilter(slashMatch[1].toLowerCase());
        setSelectedSlashIndex(0);

        // Get cursor position for menu
        const coords = editor.view.coordsAtPos(from);
        setSlashMenuPosition({ x: coords.left, y: coords.bottom + 5 });
        setShowSlashMenu(true);
      } else {
        setShowSlashMenu(false);
      }
    },
  });

  // Slash commands configuration
  const slashCommands = [
    { id: 'h1', label: 'Überschrift 1', icon: Heading1, keywords: ['heading', 'h1', 'überschrift', 'titel'] },
    { id: 'h2', label: 'Überschrift 2', icon: Heading2, keywords: ['heading', 'h2', 'überschrift'] },
    { id: 'h3', label: 'Überschrift 3', icon: Heading3, keywords: ['heading', 'h3', 'überschrift'] },
    { id: 'p', label: 'Text', icon: Type, keywords: ['paragraph', 'text', 'normal'] },
    { id: 'quote', label: 'Zitat', icon: Quote, keywords: ['quote', 'zitat', 'blockquote'] },
    { id: 'ul', label: 'Aufzählung', icon: List, keywords: ['list', 'bullet', 'aufzählung', 'liste'] },
    { id: 'ol', label: 'Nummerierte Liste', icon: ListOrdered, keywords: ['list', 'ordered', 'nummeriert', 'nummer'] },
  ];

  const filteredSlashCommands = slashCommands.filter(cmd =>
    cmd.label.toLowerCase().includes(slashFilter) ||
    cmd.keywords.some(k => k.includes(slashFilter))
  );

  const closeSlashMenu = () => {
    setShowSlashMenu(false);
    setSlashFilter('');
    setSelectedSlashIndex(0);
  };

  const executeSlashCommand = (command: typeof slashCommands[0]) => {
    if (!editor) return;

    // Remove the slash and filter text
    const { from } = editor.state.selection;
    const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from);
    const slashMatch = textBefore.match(/\/([a-zA-Z0-9äöüß]*)$/);

    if (slashMatch) {
      const deleteFrom = from - slashMatch[0].length;
      editor.chain()
        .focus()
        .deleteRange({ from: deleteFrom, to: from })
        .run();
    }

    // Execute the command
    switch (command.id) {
      case 'h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'h3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'p':
        editor.chain().focus().setParagraph().run();
        break;
      case 'quote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'ul':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'ol':
        editor.chain().focus().toggleOrderedList().run();
        break;
    }

    closeSlashMenu();
  };

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

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && value !== htmlToText(editor.getHTML())) {
      editor.commands.setContent(textToHtml(value));
    }
  }, [editor, value]);

  // Close slash menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (slashMenuRef.current && !slashMenuRef.current.contains(e.target as Node)) {
        closeSlashMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className={`relative border border-gray-300 rounded-lg overflow-hidden bg-white ${className}`}>
      {/* Fixed Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-gray-50">
        {/* Block Type Dropdown */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-gray-300 mr-2">
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
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-gray-300 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Fett (Strg+B)"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Kursiv (Strg+I)"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Unterstrichen (Strg+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={setLink}
            isActive={editor.isActive('link')}
            title="Link einfügen"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-gray-300 mr-2">
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
        </div>

        {/* Lists & Quote */}
        <div className="flex items-center gap-0.5">
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
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Zitat"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Slash Command Hint */}
        <div className="flex-1 text-right">
          <span className="text-xs text-gray-400">Tippe "/" für Befehle</span>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Slash Command Menu */}
      {showSlashMenu && filteredSlashCommands.length > 0 && (
        <div
          ref={slashMenuRef}
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl py-1 min-w-[200px]"
          style={{ left: slashMenuPosition.x, top: slashMenuPosition.y }}
        >
          <div className="px-3 py-1.5 text-xs font-medium text-gray-400 uppercase">
            Blöcke
          </div>
          {filteredSlashCommands.map((cmd, index) => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.id}
                onClick={() => executeSlashCommand(cmd)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                  index === selectedSlashIndex
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{cmd.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Styles for placeholder */}
      <style jsx global>{`
        .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .ProseMirror blockquote {
          border-left: 3px solid #e5e7eb;
          padding-left: 1rem;
          margin-left: 0;
          color: #6b7280;
          font-style: italic;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .ProseMirror p[style*="text-align: center"] {
          text-align: center;
        }
        .ProseMirror p[style*="text-align: right"] {
          text-align: right;
        }
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

// Convert HTML to plain text with line breaks
function htmlToText(html: string): string {
  if (!html || html === '<p></p>') return '';

  let text = html
    // Headings
    .replace(/<h1[^>]*>/g, '# ')
    .replace(/<\/h1>/g, '\n')
    .replace(/<h2[^>]*>/g, '## ')
    .replace(/<\/h2>/g, '\n')
    .replace(/<h3[^>]*>/g, '### ')
    .replace(/<\/h3>/g, '\n')
    // Paragraphs and line breaks
    .replace(/<\/p><p>/g, '\n\n')
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    // Lists
    .replace(/<ul>/g, '')
    .replace(/<\/ul>/g, '')
    .replace(/<ol>/g, '')
    .replace(/<\/ol>/g, '')
    .replace(/<li>/g, '• ')
    .replace(/<\/li>/g, '\n')
    // Blockquotes
    .replace(/<blockquote>/g, '> ')
    .replace(/<\/blockquote>/g, '\n')
    // Remove other tags but keep content
    .replace(/<[^>]+>/g, '')
    // Decode entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();

  return text;
}

// Convert plain text to HTML for editor
function textToHtml(text: string): string {
  if (!text) return '<p></p>';

  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n\n+/);

  return paragraphs
    .map((para) => {
      // Handle headings
      if (para.startsWith('### ')) {
        return `<h3>${para.slice(4)}</h3>`;
      }
      if (para.startsWith('## ')) {
        return `<h2>${para.slice(3)}</h2>`;
      }
      if (para.startsWith('# ')) {
        return `<h1>${para.slice(2)}</h1>`;
      }
      // Handle single newlines within paragraphs
      const lines = para.split(/\n/);
      if (lines.length > 1) {
        return `<p>${lines.join('<br>')}</p>`;
      }
      return `<p>${para}</p>`;
    })
    .join('');
}
