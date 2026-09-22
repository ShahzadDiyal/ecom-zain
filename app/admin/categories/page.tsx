"use client";

import React, { useEffect, useState } from "react";
import { 
  Tag, 
  Plus, 
  Trash2, 
  X, 
  Save, 
  FolderCheck,
  RefreshCw
} from "lucide-react";
import { getCategories, addCategory, deleteCategory } from "@/lib/services/categoryService";
import { Category } from "@/types/ecommerce";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (e) {
      console.error("Failed to load categories:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      await addCategory({
        name,
        slug,
        description,
      });
      setName("");
      setDescription("");
      setIsModalOpen(false);
      await fetchCategories();
    } catch (err) {
      console.error("Add category error:", err);
      alert("Failed to add category.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        await fetchCategories();
      } catch (err) {
        console.error("Delete category error:", err);
        alert("Failed to delete category.");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="font-serif-display text-3xl text-white tracking-wide uppercase">
            CATEGORIES MANAGEMENT
          </h1>
          <p className="font-inter text-xs text-neutral-400 tracking-widest uppercase mt-1">
            ORGANIZE STORE SECTIONS, COLLECTIONS & APPAREL CATEGORIES
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 bg-white text-black font-semibold hover:bg-neutral-200 text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-neutral-500 text-xs uppercase tracking-widest">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="col-span-full py-16 text-center text-neutral-500 text-xs uppercase tracking-widest">
            No categories defined yet.
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="bg-neutral-950 border border-neutral-800 p-6 space-y-4 relative group">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-neutral-900 border border-neutral-800 text-white">
                  <Tag className="w-5 h-5" />
                </div>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-2 text-neutral-500 hover:text-red-400 hover:bg-neutral-900 transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="font-serif-display text-xl text-white uppercase tracking-wide">
                  {cat.name}
                </h3>
                <p className="font-mono text-[10px] text-neutral-500 mt-1 uppercase">
                  SLUG: /{cat.slug}
                </p>
              </div>

              {cat.description && (
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 w-full max-w-md p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif-display text-2xl uppercase text-white">
              ADD CATEGORY
            </h2>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Hoodies, Jackets"
                  className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Category overview..."
                  className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white uppercase text-xs tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-white text-black font-semibold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {submitting ? "SAVING..." : "CREATE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
