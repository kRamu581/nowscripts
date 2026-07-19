import React from 'react';

export const UL = ({ children, ...props }: any) => {
  return (
    <ul className="custom-ul" {...props}>
      {children}
    </ul>
  );
};

export const OL = ({ children, ...props }: any) => {
  return (
    <ol className="custom-ol" {...props}>
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
      <li className="task-list-item text-[#1e293b] leading-[1.8]" {...props}>
        {children}
      </li>
    );
  }

  return (
    <li className="leading-[1.8] pl-1 text-[#1e293b]" {...props}>
      {children}
    </li>
  );
};
