import React from 'react';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

export default function FaqItem({ value, question, children }) {
  return (
    <AccordionItem value={value} className="rounded-2xl border bg-card px-5">
      <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}