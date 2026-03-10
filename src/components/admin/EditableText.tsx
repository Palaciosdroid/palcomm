'use client';

import { useState, useRef, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export default function EditableText({
  value,
  onChange,
  as: Component = 'p',
  className = '',
  multiline = false,
  placeholder = 'Text eingeben...',
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full bg-white/90 border-2 border-blue-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y min-h-[100px] ${className}`}
            placeholder={placeholder}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full bg-white/90 border-2 border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
            placeholder={placeholder}
          />
        )}
        <div className="absolute -top-10 right-0 flex gap-1">
          <button
            onClick={handleSave}
            className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-lg"
            title="Speichern"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 shadow-lg"
            title="Abbrechen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative inline-block group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsEditing(true)}
    >
      <Component className={`${className} ${isHovered ? 'outline outline-2 outline-blue-400 outline-offset-2 rounded' : ''}`}>
        {value || <span className="text-gray-400 italic">{placeholder}</span>}
      </Component>
      {isHovered && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center gap-1 z-50">
          <Pencil className="w-3 h-3" />
          Klicken zum Bearbeiten
        </div>
      )}
    </div>
  );
}
