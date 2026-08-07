import React from 'react';
import { generateSlug } from '../../utils/markdownParser';
import { Link2 } from 'lucide-react';
import toast from 'react-hot-toast';

const copyToClipboard = (id: string) => {
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(url);
  toast.success('Heading link copied!');
};

const extractText = (node: any): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node) && (node.props as any).children) {
    return extractText((node.props as any).children);
  }
  return '';
};

export const H1 = ({ children, ...props }: any) => (
  <h1 className="text-[32px] sm:text-[32px] font-semibold mb-1 mt-2 text-[#0f2c4c] leading-tight font-sans" {...props}>
    {children}
  </h1>
);

export const H2 = ({ children, ...props }: any) => {
  const text = extractText(children);
  const id = generateSlug(text);

  return (
    <section id={id} className="scroll-mt-24 group relative mt-6 mb-3">
      <div className="flex items-center -ml-8">
        <button
          onClick={() => copyToClipboard(id)}
          className="w-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity text-now-primary rounded-md outline-none"
          title="Copy link to heading"
        >
          <Link2 className="w-6 h-6" />
        </button>
        <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#0f2c4c] leading-tight w-full" style={{ fontWeight: 800 }} {...props}>
          {children}
        </h2>
      </div>
    </section>
  );
};

export const H3 = ({ children, ...props }: any) => {
  const text = extractText(children);
  const id = generateSlug(text);

  return (
    <div id={id} className="scroll-mt-24 group relative mt-5 mb-3">
      <div className="flex items-center -ml-8">
        <button
          onClick={() => copyToClipboard(id)}
          className="w-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity text-now-primary outline-none"
          title="Copy link to heading"
        >
          <Link2 className="w-5 h-5" />
        </button>
        <h3 className="text-[22px] sm:text-[24px] font-extrabold text-[#0f2c4c] leading-tight w-full" style={{ fontWeight: 800 }} {...props}>
          {children}
        </h3>
      </div>
    </div>
  );
};
