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
            {items.map((item, index) => (
              <div
                key={index}
                className="relative p-4 bg-gray-50 rounded-lg space-y-3 group"
              >
                <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem("skills", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

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
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
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
              </div>
            ))}

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
