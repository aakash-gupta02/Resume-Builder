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
import { Award, Plus, Trash2, ExternalLink } from "lucide-react";

export default function CertificationsSection({ section }) {
  const { updateItem, addItem, removeItem } = useResume();
  const items = section?.items || [];

  const handleAddCertification = () => {
    addItem("certifications", {
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    });
  };

  const handleChange = (index, field, value) => {
    updateItem("certifications", index, field, value);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="certifications" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
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
                className="relative p-4 bg-gray-50 rounded-lg space-y-4 group"
              >
                <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem("certifications", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input
                      value={item.values?.name || ""}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      placeholder="AWS Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuing Organization</Label>
                    <Input
                      value={item.values?.issuer || ""}
                      onChange={(e) =>
                        handleChange(index, "issuer", e.target.value)
                      }
                      placeholder="Amazon Web Services"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issue Date</Label>
                    <Input
                      type="month"
                      value={item.values?.date || ""}
                      onChange={(e) =>
                        handleChange(index, "date", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date (optional)</Label>
                    <Input
                      type="month"
                      value={item.values?.expiryDate || ""}
                      onChange={(e) =>
                        handleChange(index, "expiryDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Credential URL
                  </Label>
                  <Input
                    value={item.values?.url || ""}
                    onChange={(e) =>
                      handleChange(index, "url", e.target.value)
                    }
                    placeholder="https://www.credly.com/badges/..."
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddCertification}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
