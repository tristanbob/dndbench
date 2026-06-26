import React from 'react';
import SetupPanel from './SetupPanel';

export default function SetupSidebar(props) {
  return (
    <aside className="hidden h-full min-h-0 w-[360px] shrink-0 flex-col border-r bg-card/95 shadow-sm md:flex">
      <div className="min-h-0 flex-1 overflow-auto p-4">
        <SetupPanel {...props} />
      </div>
    </aside>
  );
}