"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { resumeAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
  Download,
  Eye,
  Share2,
  LogOut,
  User,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [deleteModal, setDeleteModal] = useState({ open: false, resume: null });
  const [activeMenu, setActiveMenu] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch resumes
  useEffect(() => {
    const fetchResumes = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await resumeAPI.getAll();
        setResumes(response.data.resumes || []);
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
        toast.error("Failed to load resumes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, [isAuthenticated]);

  const handleCreateResume = async () => {
    try {
      const response = await resumeAPI.create({});
      toast.success("Resume created!");
      router.push(`/editor/${response.data.resume._id}`);
    } catch (error) {
      toast.error("Failed to create resume");
    }
  };

  const handleEditResume = (id) => {
    router.push(`/editor/${id}`);
  };

  const handleUpdateTitle = async (id) => {
    if (!newTitle.trim()) return;

    try {
      await resumeAPI.updateTitle(id, newTitle);
      setResumes(
        resumes.map((r) => (r._id === id ? { ...r, title: newTitle } : r))
      );
      setEditingId(null);
      toast.success("Title updated!");
    } catch (error) {
      toast.error("Failed to update title");
    }
  };

  const handleDeleteResume = async () => {
    if (!deleteModal.resume) return;

    try {
      await resumeAPI.delete(deleteModal.resume._id);
      setResumes(resumes.filter((r) => r._id !== deleteModal.resume._id));
      setDeleteModal({ open: false, resume: null });
      toast.success("Resume deleted!");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ResumeBuilder</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{user?.name || user?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-muted-foreground mt-1">
              Create, customize, and manage your professional resumes
            </p>
          </div>

          <Button onClick={handleCreateResume} className="gap-2">
            <Plus className="h-4 w-4" />
            New Resume
          </Button>
        </div>

        {/* Resume Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first resume to get started
            </p>
            <Button onClick={handleCreateResume} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Resume
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Create New Card */}
            <Card
              className="border-2 border-dashed hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
              onClick={handleCreateResume}
            >
              <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground group-hover:text-primary">
                <Plus className="h-12 w-12 mb-4" />
                <span className="font-medium">Create New Resume</span>
              </CardContent>
            </Card>

            {/* Resume Cards */}
            {resumes.map((resume) => (
              <Card
                key={resume._id}
                className="group hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Preview Area */}
                <div
                  className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative"
                  onClick={() => handleEditResume(resume._id)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-gray-300" />
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" className="gap-1">
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button size="sm" variant="secondary" className="gap-1">
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {editingId === resume._id ? (
                        <div className="flex gap-2">
                          <Input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleUpdateTitle(resume._id)
                            }
                            className="h-8 text-sm"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => handleUpdateTitle(resume._id)}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-semibold truncate">
                            {resume.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Updated {formatDate(resume.updatedAt)}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Menu */}
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(
                            activeMenu === resume._id ? null : resume._id
                          );
                        }}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>

                      {activeMenu === resume._id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border z-10">
                          <div className="py-1">
                            <button
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingId(resume._id);
                                setNewTitle(resume.title);
                                setActiveMenu(null);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                              Rename
                            </button>
                            <button
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/preview/${resume._id}`);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                              Preview
                            </button>
                            <button
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.success("Download started...");
                                setActiveMenu(null);
                              }}
                            >
                              <Download className="h-4 w-4" />
                              Download PDF
                            </button>
                            <button
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenu(null);
                              }}
                            >
                              <Share2 className="h-4 w-4" />
                              Share
                            </button>
                            <hr className="my-1" />
                            <button
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteModal({ open: true, resume });
                                setActiveMenu(null);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal({ open, resume: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resume</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteModal.resume?.title}"?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, resume: null })}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteResume}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Click outside to close menu */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}
