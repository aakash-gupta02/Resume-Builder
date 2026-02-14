"use client";

import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Languages, Plus, Trash2 } from "lucide-react";

const proficiencyLevels = [
  "Native",
  "Fluent",
  "Advanced",
  "Intermediate",
  "Basic",
];

export default function LanguagesSection({ section }) {
  const { updateItem, addItem, removeItem } = useResume();
  const items = section?.items || [];

  const handleAddLanguage = () => {
    addItem("languages", {
      language: "",
      proficiency: "Intermediate",
    });
  };

  const handleChange = (index, field, value) => {
    updateItem("languages", index, field, value);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="languages" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-primary" />
            <span className="font-semibold">{section.title}</span>
            <span className="text-xs text-muted-foreground ml-2">
              ({items.length})
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-6">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative flex items-center gap-4 p-3 bg-gray-50 rounded-lg group"
              >
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs">Language</Label>
                    <Input
                      value={item.values?.language || ""}
                      onChange={(e) =>
                        handleChange(index, "language", e.target.value)
                      }
                      placeholder="English"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Proficiency</Label>
                    <select
                      value={item.values?.proficiency || "Intermediate"}
                      onChange={(e) =>
                        handleChange(index, "proficiency", e.target.value)
                      }
                      className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm"
                    >
                      {proficiencyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeItem("languages", index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddLanguage}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
