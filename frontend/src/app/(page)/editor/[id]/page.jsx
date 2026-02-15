"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useResume } from "@/context/ResumeContext";
import { resumeAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Save,
  Download,
  Eye,
  Palette,
  FileText,
  Settings,
  Loader2,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";
import ResumeForm from "@/components/editor/ResumeForm";
import CustomizationPanel from "@/components/editor/CustomizationPanel";
import ResumeTemplate from "@/components/resume/ResumeTemplate";

export default function EditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    resume,
    customization,
    loadResume,
    prepareForSave,
    hasUnsavedChanges,
    setHasUnsavedChanges,
  } = useResume();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch resume data if editing
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await resumeAPI.getById(id);
        loadResume(response.data.resume);
      } catch (error) {
        console.error("Failed to fetch resume:", error);
        toast.error("Failed to load resume");
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && id) {
      fetchResume();
    } else if (!isAuthenticated && !authLoading) {
      // Not authenticated and not loading - redirect will happen
      setIsLoading(false);
    }
  }, [id, isAuthenticated, authLoading, loadResume, router]);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const payload = prepareForSave();

      // Always update since we're in [id] route
      await resumeAPI.update(id, payload);
      toast.success("Resume saved!");
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (id) {
      router.push(`/preview/${id}`);
    } else {
      toast.error("Please save the resume first");
    }
  };

  const handleDownload = () => {
    if (id) {
      toast.success("Generating PDF...");
      // TODO: Implement PDF download
    } else {
      toast.error("Please save the resume first");
    }
  };

  if (authLoading || !isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white border-b px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold">
              {resume.title || "Untitled Resume"}
            </span>
            {hasUnsavedChanges && (
              <span className="text-xs text-muted-foreground">(unsaved)</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>

          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>

          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button onClick={handleSave} disabled={isSaving} size="sm">
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save
          </Button>
        </div>
      </header>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Form/Customization */}
        <div className="w-[750px] bg-white border-r flex flex-col shrink-0 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="w-full rounded-none border-b h-12 bg-transparent px-2 shrink-0">
              <TabsTrigger
                value="content"
                className="flex-1 gap-2 data-[state=active]:bg-primary/10"
              >
                <FileText className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger
                value="customize"
                className="flex-1 gap-2 data-[state=active]:bg-primary/10"
              >
                <Palette className="h-4 w-4" />
                Customize
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex-1 gap-2 data-[state=active]:bg-primary/10"
              >
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-auto">
              <TabsContent value="content" className="mt-0 p-4">
                <ResumeForm />
              </TabsContent>

              <TabsContent value="customize" className="mt-0 p-4">
                <CustomizationPanel />
              </TabsContent>

              <TabsContent value="settings" className="mt-0 p-4">
                <SettingsPanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-gray-200 overflow-auto p-8">
          <div className="max-w-[850px] mx-auto">
            <ResumeTemplate resume={resume} customization={customization} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Panel Component
function SettingsPanel() {
  const { resume, setResume, toggleSectionVisibility, updateSectionTitle } =
    useResume();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Section Visibility</h3>
        <div className="space-y-3">
          {resume.sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm font-medium">{section.title}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={section.visible}
                  onChange={() => toggleSectionVisibility(section.type)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Section Order</h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop sections to reorder them (coming soon)
        </p>
      </div>
    </div>
  );
}
