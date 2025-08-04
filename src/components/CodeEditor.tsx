import React from 'react';
import { Code2 } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  placeholder?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  placeholder = "Enter your code here...",
  readOnly = false
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg border-b border-gray-700">
        <Code2 size={16} />
        <span className="text-sm font-medium">{language}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full h-64 p-4 bg-gray-900 text-gray-100 font-mono text-sm border-0 rounded-b-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ 
          lineHeight: '1.5',
          tabSize: 2
        }}
      />
    </div>
  );
};