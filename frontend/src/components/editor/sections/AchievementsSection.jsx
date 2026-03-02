"use client";

import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trophy, Plus, Trash2 } from "lucide-react";

export default function AchievementsSection({ section }) {
  const { updateItem, addItem, removeItem } = useResume();
  const items = section?.items || [];
  const sectionType = section.type;

  const handleAddItem = () => {
    addItem(sectionType, {
      title: "",
      description: "",
      date: "",
    });
  };

  const handleChange = (index, field, value) => {
    updateItem(sectionType, index, field, value);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={sectionType} className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="font-semibold">{section.title}</span>
            <span className="text-xs text-muted-foreground ml-2">
              ({items.length})
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-6">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-2">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`achievement-${index}`}
                  className="border rounded-lg bg-gray-50"
                >
                  <AccordionTrigger className="hover:no-underline px-4 py-3">
                    <div className="flex items-center justify-between w-full pr-2">
                      <span className="font-medium">
                        {item.values?.title || `Achievement ${index + 1}`}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {item.values?.date || "No date"}
                        </span>
                        <div
                          role="button"
                          tabIndex={0}
                          className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-accent"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(sectionType, index);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              removeItem(sectionType, index);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={item.values?.title || ""}
                          onChange={(e) =>
                            handleChange(index, "title", e.target.value)
                          }
                          placeholder="Best Employee Award"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input
                          value={item.values?.date || ""}
                          onChange={(e) =>
                            handleChange(index, "date", e.target.value)
                          }
                          placeholder="2023"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description (optional)</Label>
                      <Textarea
                        value={item.values?.description || ""}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                        placeholder="Brief description of the achievement..."
                        className="min-h-[60px]"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddItem}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {section.title.replace(/s$/, "")}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
