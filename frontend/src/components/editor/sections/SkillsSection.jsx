"use client";

import { useState } from "react";
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
import { Code, Plus, Trash2, X } from "lucide-react";

export default function SkillsSection({ section }) {
  const { updateItem, addItem, removeItem } = useResume();
  const items = section?.items || [];
  const [newSkill, setNewSkill] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const handleAddCategory = () => {
    addItem("skills", {
      category: "",
      skills: [],
    });
  };

  const handleChange = (index, field, value) => {
    updateItem("skills", index, field, value);
  };

  const addSkillToCategory = (index) => {
    if (!newSkill.trim()) return;

    const currentSkills = items[index]?.values?.skills || [];
    handleChange(index, "skills", [...currentSkills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkillFromCategory = (categoryIndex, skillIndex) => {
    const currentSkills = items[categoryIndex]?.values?.skills || [];
    handleChange(
      categoryIndex,
      "skills",
      currentSkills.filter((_, i) => i !== skillIndex)
    );
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="skills" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-primary" />
            <span className="font-semibold">{section.title}</span>
            <span className="text-xs text-muted-foreground ml-2">
              ({items.length} categories)
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-6">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-2">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`category-${index}`}
                  className="border rounded-lg bg-gray-50"
                >
                  <AccordionTrigger className="hover:no-underline px-4 py-3">
                    <div className="flex items-center justify-between w-full pr-2">
                      <span className="font-medium">
                        {item.values?.category || `Category ${index + 1}`}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {(item.values?.skills || []).length} skills
                        </span>
                        <div
                          role="button"
                          tabIndex={0}
                          className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-accent"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem("skills", index);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              removeItem("skills", index);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-3">
                    <div className="space-y-2">
                      <Label>Category Name</Label>
                      <Input
                        value={item.values?.category || ""}
                        onChange={(e) =>
                          handleChange(index, "category", e.target.value)
                        }
                        placeholder="Programming Languages"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2 min-h-8">
                        {(item.values?.skills || []).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md"
                          >
                            {skill}
                            <button
                              onClick={() =>
                                removeSkillFromCategory(index, skillIndex)
                              }
                              className="hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          value={activeCategory === index ? newSkill : ""}
                          onChange={(e) => {
                            setActiveCategory(index);
                            setNewSkill(e.target.value);
                          }}
                          onFocus={() => setActiveCategory(index)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSkillToCategory(index);
                            }
                          }}
                          placeholder="Type a skill and press Enter"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => addSkillToCategory(index)}
                          disabled={!newSkill.trim() || activeCategory !== index}
                        >
                          Add
                        </Button>
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
              onClick={handleAddCategory}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skill Category
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
