"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useResume } from "@/context/ResumeContext";
import { resumeAPI } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/editor/Navbar";
import {
  Palette,
  FileText,
  Settings,
  Loader2,
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

  const handleShare = () => {
    toast.success("Share coming soon");
  };

  if (authLoading || !isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar
        title={resume.title}
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        onBack={() => router.push("/dashboard")}
        onPreview={handlePreview}
        onShare={handleShare}
        onSave={handleSave}
      />

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-3 sm:p-4 gap-3 lg:gap-4">
        {/* Left Panel - Form/Customization */}
        <div className="w-full lg:w-[520px] xl:w-[560px] bg-white border lg:border-r flex flex-col rounded-xl shrink-0 overflow-hidden min-h-[55vh] lg:min-h-0 lg:h-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="w-full rounded-none border-b h-auto min-h-12 bg-transparent px-2 py-1 shrink-0 grid grid-cols-3">
              <TabsTrigger
                value="content"
                className="gap-1 sm:gap-2 data-[state=active]:bg-primary/10 text-xs sm:text-sm"
              >
                <FileText className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger
                value="customize"
                className="gap-1 sm:gap-2 data-[state=active]:bg-primary/10 text-xs sm:text-sm"
              >
                <Palette className="h-4 w-4" />
                Customize
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="gap-1 sm:gap-2 data-[state=active]:bg-primary/10 text-xs sm:text-sm"
              >
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-auto">
              <TabsContent value="content" className="mt-0 p-3 sm:p-4">
                <ResumeForm />
              </TabsContent>

              <TabsContent value="customize" className="mt-0 p-3 sm:p-4">
                <CustomizationPanel />
              </TabsContent>

              <TabsContent value="settings" className="mt-0 p-3 sm:p-4">
                <SettingsPanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 overflow-auto bg-white rounded-xl border px-2 sm:px-4 py-4 sm:py-6 lg:py-8 min-h-[55vh] lg:min-h-0">
          <div className="max-w-[850px] mx-auto scale-[0.94] sm:scale-100 origin-top">
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
          {resume.sections.map((section, index) => (
            <div
              key={index}
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
