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
import { Textarea } from "@/components/ui/textarea";

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
      description: "",
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
            <Accordion type="single" collapsible className="space-y-2">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`certification-${index}`}
                  className="border rounded-lg bg-gray-50"
                >
                  <AccordionTrigger className="hover:no-underline px-4 py-3">
                    <div className="flex items-center justify-between w-full pr-2">
                      <span className="font-medium">
                        {item.values?.name || `Certification ${index + 1}`}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {item.values?.issuer || "No issuer"}
                        </span>
                        <div
                          role="button"
                          tabIndex={0}
                          className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-accent"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem("certifications", index);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              removeItem("certifications", index);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-4">
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

                    <div className="space-y-2">
                      <Label>Description / Responsibilities</Label>
                      <Textarea
                        value={item.values?.description || ""}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                        placeholder="Describe what this certification covers."
                        className="min-h-25"
                      />
                      <p className="text-xs text-muted-foreground">
                        Tip: Use bullet points by starting lines with •
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

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
