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
import { FolderKanban, Plus, Trash2, ExternalLink, Github } from "lucide-react";

export default function ProjectsSection({ section }) {
  const { updateItem, addItem, removeItem } = useResume();
  const items = section?.items || [];

  const handleAddProject = () => {
    addItem("projects", {
      name: "",
      subHeading: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleChange = (index, field, value) => {
    updateItem("projects", index, field, value);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="projects" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <FolderKanban className="h-4 w-4 text-primary" />
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
                  value={`project-${index}`}
                  className="border rounded-lg bg-gray-50"
                >
                  <AccordionTrigger className="hover:no-underline px-4 py-3">
                    <div className="flex items-center justify-between w-full pr-2">
                      <span className="font-medium">
                        {item.values?.name || `Project ${index + 1}`}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {item.values?.subHeading || "No subheading"}
                        </span>
                        <div
                          role="button"
                          tabIndex={0}
                          className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-accent"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem("projects", index);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              removeItem("projects", index);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Project Name</Label>
                      <Input
                        value={item.values?.name || ""}
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                        placeholder="Cartify"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Project Sub-heading</Label>
                      <Input
                        value={item.values?.subHeading || ""}
                        onChange={(e) =>
                          handleChange(index, "subHeading", e.target.value)
                        }
                        placeholder="E-commerce Platform"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={item.values?.description || ""}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                        placeholder="A full-stack e-commerce platform with..."
                        className="min-h-20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <ExternalLink className="h-3 w-3" />
                          Live URL
                        </Label>
                        <Input
                          value={item.values?.liveUrl || ""}
                          onChange={(e) =>
                            handleChange(index, "liveUrl", e.target.value)
                          }
                          placeholder="https://myproject.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Github className="h-3 w-3" />
                          GitHub URL
                        </Label>
                        <Input
                          value={item.values?.githubUrl || ""}
                          onChange={(e) =>
                            handleChange(index, "githubUrl", e.target.value)
                          }
                          placeholder="https://github.com/user/project"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddProject}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
