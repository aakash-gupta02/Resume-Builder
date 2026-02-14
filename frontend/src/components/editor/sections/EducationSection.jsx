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
import { GraduationCap, Plus, Trash2 } from "lucide-react";

export default function EducationSection({ section }) {
  const { updateItem, addItem, removeItem } = useResume();
  const items = section?.items || [];

  const handleAddEducation = () => {
    addItem("education", {
      institution: "",
      degree: "",
      field: "",
      location: "",
      startYear: "",
      endYear: "",
      gpa: "",
      description: "",
    });
  };

  const handleChange = (index, field, value) => {
    updateItem("education", index, field, value);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="education" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="font-semibold">{section.title}</span>
            <span className="text-xs text-muted-foreground ml-2">
              ({items.length})
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-6">
          <div className="space-y-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative p-4 bg-gray-50 rounded-lg space-y-4 group"
              >
                <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem("education", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={item.values?.degree || ""}
                      onChange={(e) =>
                        handleChange(index, "degree", e.target.value)
                      }
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      value={item.values?.field || ""}
                      onChange={(e) =>
                        handleChange(index, "field", e.target.value)
                      }
                      placeholder="Computer Science"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={item.values?.institution || ""}
                    onChange={(e) =>
                      handleChange(index, "institution", e.target.value)
                    }
                    placeholder="Stanford University"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Year</Label>
                    <Input
                      value={item.values?.startYear || ""}
                      onChange={(e) =>
                        handleChange(index, "startYear", e.target.value)
                      }
                      placeholder="2018"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Year</Label>
                    <Input
                      value={item.values?.endYear || ""}
                      onChange={(e) =>
                        handleChange(index, "endYear", e.target.value)
                      }
                      placeholder="2022"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA (optional)</Label>
                    <Input
                      value={item.values?.gpa || ""}
                      onChange={(e) =>
                        handleChange(index, "gpa", e.target.value)
                      }
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddEducation}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
