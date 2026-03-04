"use client";

import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    ArrowLeft,
    Eye,
    FileText,
    Loader2,
    MoreVertical,
    Save,
    Share2,
} from "lucide-react";

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
        <header className="bg-white border-b px-3 sm:px-4 py-2 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <Button variant="ghost" size="sm" onClick={onBack} className="hidden sm:inline-flex">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>

                <div className="h-6 w-px bg-border hidden sm:block" />

                <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-semibold truncate">{title || "Untitled Resume"}</span>
                    {hasUnsavedChanges && (
                        <span className="text-xs text-muted-foreground shrink-0">(unsaved)</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onPreview}
                    className="hidden sm:inline-flex gap-1 sm:gap-2 px-2 sm:px-3"
                >
                    <Eye className="h-4 w-4" />
                    Preview
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onShare}
                    className="hidden sm:inline-flex gap-1 sm:gap-2 px-2 sm:px-3"
                >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="sm:hidden">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={onBack} className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onPreview} className="gap-2">
                            <Eye className="h-4 w-4" />
                            Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onShare} className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={onSave} disabled={isSaving} size="sm" className="gap-1 sm:gap-2 px-2 sm:px-3">
                    {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    Save
                </Button>
            </div>
        </header>
    );
};

export default Navbar;