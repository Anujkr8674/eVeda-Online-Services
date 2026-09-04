"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/common/PageHero";
import Image from "next/image";
import { Camera, Calendar, Layers, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  sortOrder?: number;
}

const CATEGORIES = ["All", "Workspace", "Collaboration", "Tech Events", "Success Celebrations"];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          const sorted = [...json.data].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
          setGalleryItems(sorted);
        }
      })
      .catch((err) => console.error("Error loading gallery items:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Header */}
      <PageHero
        badge="Office & Life"
        title="Life at eVeda"
        titleHighlight="Our Gallery"
        description="Take a look inside our state-of-the-art innovation lab, collaborative culture, and team celebrations."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Gallery" }
        ]}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-[#7C3AED] text-white shadow-[0_4px_14px_rgba(124,58,237,0.3)]"
                    : "bg-white text-slate-600 hover:text-[#7C3AED] hover:bg-slate-50 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-slate-100" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.06)] hover:border-purple-200 transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/75 backdrop-blur-md text-[9px] font-extrabold uppercase text-white tracking-widest border border-white/10">
                        <Layers className="w-2.5 h-2.5 text-purple-300" />
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.date}</span>
                    </div>
                    <h3 className="text-[15px] font-bold text-slate-900 font-sora leading-snug group-hover:text-[#7C3AED] transition-colors mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
            <Camera className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">No Images Found</h3>
            <p className="text-slate-400 text-xs mt-1">No photos in this category yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Lightbox Image */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl w-full aspect-[4/3] max-h-[75vh] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />

              {/* Top overlay */}
              <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-6 text-white flex items-start justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#7C3AED] text-[9px] font-extrabold uppercase tracking-widest mb-1.5">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black font-sora tracking-tight leading-tight">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">Date</span>
                  <span className="text-xs font-semibold text-white">{filteredItems[lightboxIndex].date}</span>
                </div>
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed font-medium">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="mt-6 text-slate-400 text-xs font-semibold tracking-wider bg-white/5 border border-white/10 px-4 py-1.5 rounded-full select-none">
              Photo {lightboxIndex + 1} of {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
