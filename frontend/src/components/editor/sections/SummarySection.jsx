"use client";

import { useResume } from "@/context/ResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";

export default function SummarySection({ section }) {
  const { updateSectionContent } = useResume();
  const content = section?.content || {};

  const handleChange = (value) => {
    updateSectionContent("summary", "text", value);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="summary" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-semibold">{section.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-6">
          <div className="space-y-2">
            <Label htmlFor="summary">
              Write a brief professional summary highlighting your key
              achievements and goals
            </Label>
            <Textarea
              id="summary"
              value={content.text || ""}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="A results-driven professional with X years of experience in..."
              className="min-h-30"
            />
            <p className="text-xs text-muted-foreground">
              {(content.text?.length || 0)}/500 characters
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
