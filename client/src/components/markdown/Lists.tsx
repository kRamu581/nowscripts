import React from 'react';

export const UL = ({ children, ...props }: any) => {
  // We add 'task-list' class if it contains task list items, but CSS handles it globally mostly.
  return (
    <ul className="list-disc pl-8 space-y-2 mb-6 text-[#374151] dark:text-slate-300 text-[15.5px] sm:text-[16px] marker:text-slate-400 dark:marker:text-slate-500" {...props}>
      {children}
    </ul>
  );
};

export const OL = ({ children, ...props }: any) => {
  return (
    <ol className="list-decimal pl-8 space-y-2 mb-6 text-[#374151] dark:text-slate-300 text-[15.5px] sm:text-[16px] marker:text-slate-500 dark:marker:text-slate-400 marker:font-semibold" {...props}>
      {children}
    </ol>
  );
};

export const LI = ({ children, ...props }: any) => {
  // markdown-to-jsx handles task list by rendering a checkbox input inside the LI.
  // The input will have type="checkbox".
  
  let isTaskListItem = false;
  
  // React.Children.toArray allows us to inspect children safely
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === 'input' && (child as any).props.type === 'checkbox') {
      isTaskListItem = true;
    }
  });

  if (isTaskListItem) {
    return (
      <li className="task-list-item text-slate-800 dark:text-slate-200 leading-[1.8]" {...props}>
        {children}
      </li>
    );
  }

  return (
    <li className="leading-[1.7] pl-1 text-[#374151] dark:text-slate-300" {...props}>
      {children}
    </li>
  );
};
