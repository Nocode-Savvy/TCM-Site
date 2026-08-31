'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Filter } from 'lucide-react';
import { AnimatedGroup, AnimatedItem } from '@/components/ui/AnimatedSection';

type GalleryItem = {
  id: number;
  blob_url: string;
  caption: string | null;
  category: string;
};

type Category = 'all' | 'cleaning' | 'handyman' | 'general';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  cleaning: 'Cleaning',
  handyman: 'Handyman',
  general: 'General',
};

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'all' ? items : items.filter((i) => i.category === activeFilter);
  const categories = ['all', ...Array.from(new Set(items.map((i) => i.category)))] as Category[];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-card bg-cream-dark animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
          <Camera size={32} className="text-gold" />
        </div>
        <h2 className="font-serif text-forest text-2xl mb-3">Gallery Coming Soon</h2>
        <p className="text-body/60 text-sm max-w-sm mx-auto leading-relaxed">
          We&apos;re busy doing great work across East Texas. Photos and videos will be added here soon — check back after your service!
        </p>
        <div className="mt-8">
          <a href="/booking" className="btn-gold text-sm">Book a Service</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Category filter */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <Filter size={14} className="text-body/40" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-forest text-cream'
                  : 'bg-white text-body/60 border border-body/10 hover:border-gold hover:text-gold'
              }`}
            >
              {CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>
      )}

      <AnimatedGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <AnimatedItem key={item.id}>
            <div className="group relative aspect-square rounded-card overflow-hidden shadow-card cursor-pointer">
              <Image
                src={item.blob_url}
                alt={item.caption || `TCM Home Solutions — ${item.category} work`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-cream text-xs font-sans">{item.caption}</p>
                </div>
              )}
            </div>
          </AnimatedItem>
        ))}
      </AnimatedGroup>
    </div>
  );
}
