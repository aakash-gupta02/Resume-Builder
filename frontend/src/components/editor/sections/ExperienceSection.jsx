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
import { Briefcase, Plus, Trash2, GripVertical } from "lucide-react";

export default function ExperienceSection({ section }) {
  const { updateItem, addItem, removeItem } = useResume();
  const items = section?.items || [];

  const handleAddExperience = () => {
    addItem("experience", {
      company: "",
      role: "",
      location: "",
      employmentType: "Full-time",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [],
    });
  };

  const handleChange = (index, field, value) => {
    updateItem("experience", index, field, value);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="experience" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
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
                    onClick={() => removeItem("experience", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      value={item.values?.role || ""}
                      onChange={(e) =>
                        handleChange(index, "role", e.target.value)
                      }
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={item.values?.company || ""}
                      onChange={(e) =>
                        handleChange(index, "company", e.target.value)
                      }
                      placeholder="Google"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={item.values?.location || ""}
                      onChange={(e) =>
                        handleChange(index, "location", e.target.value)
                      }
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Employment Type</Label>
                    <select
                      value={item.values?.employmentType || "Full-time"}
                      onChange={(e) =>
                        handleChange(index, "employmentType", e.target.value)
                      }
                      className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={item.values?.startDate || ""}
                      onChange={(e) =>
                        handleChange(index, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={item.values?.endDate || ""}
                      onChange={(e) =>
                        handleChange(index, "endDate", e.target.value)
                      }
                      disabled={item.values?.current}
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={item.values?.current || false}
                        onChange={(e) =>
                          handleChange(index, "current", e.target.checked)
                        }
                        className="rounded"
                      />
                      Currently working here
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description / Responsibilities</Label>
                  <Textarea
                    value={item.values?.description || ""}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="Describe your role and key responsibilities..."
                    className="min-h-25"
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Use bullet points by starting lines with •
                  </p>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddExperience}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
