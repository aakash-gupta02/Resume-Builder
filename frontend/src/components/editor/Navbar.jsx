"use client";

import { Button } from "../ui/button";
import { ArrowLeft, Eye, FileText, Loader2, Save, Share2 } from "lucide-react";

const Navbar = ({
    title,
    hasUnsavedChanges,
    isSaving,
    onBack,
    onPreview,
    onShare,
    onSave,
}) => {
    return (
        <header className="bg-white border-b px-4 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>

                <div className="h-6 w-px bg-border" />

                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{title || "Untitled Resume"}</span>
                    {hasUnsavedChanges && (
                        <span className="text-xs text-muted-foreground">(unsaved)</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onPreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                </Button>

                <Button variant="outline" size="sm" onClick={onShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                </Button>

                <Button onClick={onSave} disabled={isSaving} size="sm">
                    {isSaving ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4 mr-2" />
                    )}
                    Save
                </Button>
            </div>
        </header>
    );
};

export default Navbar;