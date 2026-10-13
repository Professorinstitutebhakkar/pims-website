import React, { useRef, useEffect } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface EditableTextProps {
  fieldPath: string;
  defaultValue: string;
  className?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  fieldPath,
  defaultValue,
  className = '',
  as: Component = 'span',
  multiline = false
}) => {
  const { isInlineEditActive, updateField } = useSiteConfig();
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (elementRef.current && elementRef.current.innerText !== defaultValue) {
      elementRef.current.innerText = defaultValue;
    }
  }, [defaultValue]);

  const handleBlur = () => {
    if (elementRef.current) {
      const newText = elementRef.current.innerText.trim();
      if (newText && newText !== defaultValue) {
        updateField(fieldPath, newText);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  if (!isInlineEditActive) {
    return <Component className={className}>{defaultValue}</Component>;
  }

  return (
    <Component
      ref={elementRef as any}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      title="Click directly to edit this text"
      className={`${className} outline-none cursor-text transition-all relative border-b border-dashed border-amber-400 bg-amber-50/40 hover:bg-amber-100/60 focus:bg-white focus:ring-2 focus:ring-amber-500 rounded-xs px-0.5`}
    >
      {defaultValue}
    </Component>
  );
};
