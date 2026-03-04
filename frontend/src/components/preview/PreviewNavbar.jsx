"use client";

import Link from "next/link";
import { ArrowLeft, Download, Loader2 } from "lucide-react";

export default function PreviewNavbar({
  title,
  showBackButton,
  onBack,
  onDownload,
  pdfGenerating,
}) {
  return (
    <div className="print:hidden bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {showBackButton ? (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <Link href="/" className="text-lg font-bold text-blue-700 shrink-0">
              JobFolio
            </Link>
          )}

          <span className="text-gray-300 hidden sm:inline">|</span>
          <h1 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
            {title || "Resume Preview"}
          </h1>
        </div>

        <button
          onClick={onDownload}
          disabled={pdfGenerating}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shrink-0"
        >
          {pdfGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">
            {pdfGenerating ? "Generating..." : "Download PDF"}
          </span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>
    </div>
  );
}
