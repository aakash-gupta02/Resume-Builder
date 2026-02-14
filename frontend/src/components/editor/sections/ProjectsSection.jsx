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
      description: "",
      technologies: [],
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
    <Accordion type="single" collapsible defaultValue="projects">
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
                    onClick={() => removeItem("projects", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    value={item.values?.name || ""}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
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
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Technologies (comma separated)</Label>
                  <Input
                    value={
                      Array.isArray(item.values?.technologies)
                        ? item.values.technologies.join(", ")
                        : item.values?.technologies || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        index,
                        "technologies",
                        e.target.value.split(",").map((t) => t.trim())
                      )
                    }
                    placeholder="React, Node.js, MongoDB, Stripe"
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
              </div>
            ))}

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
