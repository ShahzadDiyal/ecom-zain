"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Star, 
  CheckCircle2, 
  XCircle, 
  X,
  Save,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon
} from "lucide-react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/services/productService";
import { getCategories } from "@/lib/services/categoryService";
import { Product, Category } from "@/types/ecommerce";

const ALL_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("Hoodies");
  const [image, setImage] = useState("");
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");
  const [material, setMaterial] = useState("80% Cotton / 20% Polyester");
  const [weight, setWeight] = useState("450 GSM");
  const [care, setCare] = useState("Machine wash cold.\nDo not bleach.\nTumble dry low.");
  const [availableSizes, setAvailableSizes] = useState<string[]>(["S", "M", "L", "XL"]);
  const [features, setFeatures] = useState("");
  const [inStock, setInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prods);
      setCategories(cats);
    } catch (e) {
      console.error("Failed to load products:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSize = (size: string) => {
    if (availableSizes.includes(size)) {
      setAvailableSizes(availableSizes.filter((s) => s !== size));
    } else {
      setAvailableSizes([...availableSizes, size]);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setName("");
    setPrice("");
    setOriginalPrice("");
    setCategory(categories[0]?.name || "Hoodies");
    setImage("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop");
    setImageMode("url");
    setDescription("Heavyweight winter essential crafted for everyday comfort and effortless layering.");
    setTagline("THE MOUNTAIN + MOON EMBROIDERY MAKES 'ALPINE' A STRONG FIT.");
    setMaterial("80% Cotton\n20% Polyester");
    setWeight("450 GSM");
    setCare("Machine wash cold.\nDo not bleach.\nTumble dry low.");
    setAvailableSizes(["S", "M", "L", "XL"]);
    setFeatures("Brushed interior\nStructured hood\nRelaxed silhouette");
    setInStock(true);
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setPrice(prod.price.toString());
    setOriginalPrice(prod.originalPrice ? prod.originalPrice.toString() : "");
    setCategory(prod.category);
    setImage(prod.image);
    setImageMode("url");
    setDescription(prod.description || "");
    setTagline(prod.tagline || "");
    setMaterial(prod.material || "80% Cotton\n20% Polyester");
    setWeight(prod.weight || "450 GSM");
    setCare(prod.care || "Machine wash cold.\nDo not bleach.\nTumble dry low.");
    setAvailableSizes(prod.availableSizes || ["S", "M", "L", "XL"]);
    setFeatures(prod.features ? prod.features.join("\n") : "");
    setInStock(prod.inStock);
    setIsFeatured(prod.isFeatured || false);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const numericPrice = parseFloat(price) || 0;
    const numericOrigPrice = originalPrice ? parseFloat(originalPrice) : undefined;
    const featuresList = features.split("\n").filter((f) => f.trim().length > 0);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          name,
          slug,
          price: numericPrice,
          originalPrice: numericOrigPrice,
          category,
          image,
          images: [image],
          description,
          tagline,
          material,
          weight,
          care,
          availableSizes,
          features: featuresList,
          inStock,
          isFeatured,
        });
      } else {
        await addProduct({
          name,
          slug,
          price: numericPrice,
          originalPrice: numericOrigPrice,
          rating: 5.0,
          reviewsCount: 1,
          category,
          image,
          images: [image],
          description,
          tagline,
          material,
          weight,
          care,
          availableSizes,
          features: featuresList,
          inStock,
          isFeatured,
        });
      }
      setIsModalOpen(false);
      await fetchCatalog();
    } catch (err) {
      console.error("Save product error:", err);
      alert("Failed to save product.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await fetchCatalog();
      } catch (err) {
        console.error("Delete product error:", err);
        alert("Failed to delete product.");
      }
    }
  };

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "all" || prod.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="font-serif-display text-3xl text-white tracking-wide uppercase">
            PRODUCT MANAGEMENT
          </h1>
          <p className="font-inter text-xs text-neutral-400 tracking-widest uppercase mt-1">
            MANAGE TARZ APPAREL CATALOG, SIZES, PRICES & INVENTORY
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-white text-black font-semibold hover:bg-neutral-200 text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-neutral-950 border border-neutral-800 p-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="SEARCH PRODUCTS BY NAME..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-neutral-800 px-4 py-2.5 pl-10 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-black border border-neutral-800 px-4 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-neutral-500"
        >
          <option value="all">ALL CATEGORIES</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-neutral-950 border border-neutral-800 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-neutral-500 text-xs uppercase tracking-widest">
            Loading products catalog...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 text-xs uppercase tracking-widest">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs uppercase tracking-wider">
              <thead className="border-b border-neutral-800 text-neutral-400 text-[10px] bg-neutral-900/50">
                <tr>
                  <th className="py-3.5 px-4">Item</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Sizes</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-12 h-14 relative bg-neutral-900 shrink-0 border border-neutral-800 overflow-hidden">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{prod.name}</p>
                        <p className="text-[10px] text-neutral-500 font-mono">ID: {prod.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-neutral-400">{prod.category}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        {(prod.availableSizes || ["S", "M", "L", "XL"]).map((sz) => (
                          <span key={sz} className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[9px] text-neutral-300">
                            {sz}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-white">
                      PKR {prod.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      {prod.inStock ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-900">
                          <CheckCircle2 className="w-3 h-3" /> IN STOCK
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-red-400 bg-red-950/40 px-2 py-0.5 border border-red-900">
                          <XCircle className="w-3 h-3" /> OUT OF STOCK
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {prod.isFeatured && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950/40 px-2 py-0.5 border border-amber-900 font-semibold">
                          <Star className="w-3 h-3 fill-amber-300" /> FEATURED
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-2 bg-neutral-900 border border-neutral-800 hover:border-white text-neutral-300 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-2 bg-red-950/40 border border-red-900 hover:bg-red-900 text-red-400 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif-display text-2xl uppercase text-white">
              {editingProduct ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Product Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="TARZ Alpine Hoodie"
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                    Price (PKR)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="6490"
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                    Original Price (Optional PKR)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="7990"
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Tagline / Subtitle */}
              <div>
                <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="THE MOUNTAIN + MOON EMBROIDERY MAKES 'ALPINE' A STRONG FIT."
                  className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white uppercase"
                />
              </div>

              {/* Dual Image Upload Selector */}
              <div className="space-y-3 bg-black border border-neutral-800 p-4">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase">
                    Product Main Image
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setImageMode("url")}
                      className={`px-3 py-1 text-[10px] uppercase tracking-wider border flex items-center gap-1 transition-colors ${
                        imageMode === "url"
                          ? "bg-white text-black border-white font-semibold"
                          : "bg-neutral-900 text-neutral-400 border-neutral-800"
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" /> Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode("upload")}
                      className={`px-3 py-1 text-[10px] uppercase tracking-wider border flex items-center gap-1 transition-colors ${
                        imageMode === "upload"
                          ? "bg-white text-black border-white font-semibold"
                          : "bg-neutral-900 text-neutral-400 border-neutral-800"
                      }`}
                    >
                      <Upload className="w-3 h-3" /> Device Upload
                    </button>
                  </div>
                </div>

                {imageMode === "url" ? (
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-neutral-950 border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                ) : (
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="block w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-neutral-200 cursor-pointer"
                    />
                  </div>
                )}

                {image && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-16 h-20 relative bg-neutral-900 border border-neutral-700 overflow-hidden">
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest">
                      ✓ Image Ready for Save
                    </span>
                  </div>
                )}
              </div>

              {/* Sizes Selector */}
              <div>
                <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-2">
                  Available Sizes
                </label>
                <div className="flex items-center gap-3">
                  {ALL_SIZES.map((sz) => {
                    const isSelected = availableSizes.includes(sz);
                    return (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`w-9 h-9 border text-xs font-semibold uppercase transition-all ${
                          isSelected
                            ? "bg-white text-black border-white font-bold"
                            : "bg-black text-neutral-500 border-neutral-800 hover:border-neutral-600"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed product story..."
                  className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              {/* Specs: Material, Weight, Care */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                    Material
                  </label>
                  <textarea
                    rows={2}
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="80% Cotton&#10;20% Polyester"
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="450 GSM"
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                    Care Guide
                  </label>
                  <textarea
                    rows={2}
                    value={care}
                    onChange={(e) => setCare(e.target.value)}
                    placeholder="Machine wash cold..."
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Features List */}
              <div>
                <label className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase mb-1.5">
                  Key Features (One per line)
                </label>
                <textarea
                  rows={2}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Brushed interior&#10;Structured hood"
                  className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs uppercase text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 rounded-none accent-white"
                  />
                  In Stock
                </label>

                <label className="flex items-center gap-2 text-xs uppercase text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded-none accent-white"
                  />
                  Featured Item
                </label>
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
                  disabled={formLoading}
                  className="px-6 py-2.5 bg-white text-black font-semibold uppercase text-xs tracking-wider flex items-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {formLoading ? "SAVING..." : "SAVE PRODUCT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
