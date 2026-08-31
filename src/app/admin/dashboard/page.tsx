'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Calendar, Images, LogOut,
  Upload, Trash2, ChevronDown, ChevronUp, RefreshCw,
  X, Check,
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

type Booking = {
  id: number;
  name: string;
  phone: string;
  email: string;
  service_type: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  preferred_date: string;
  addons: string[];
  notes: string;
  created_at: string;
};

type GalleryItem = {
  id: number;
  blob_url: string;
  caption: string;
  category: string;
  created_at: string;
};

type Tab = 'bookings' | 'gallery';
type SortField = 'created_at' | 'name' | 'service_type';
type SortDir = 'asc' | 'desc';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCategory, setUploadCategory] = useState('cleaning');
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const fetchBookings = async () => {
    const res = await fetch('/api/admin/bookings');
    if (res.status === 401 || res.status === 403) {
      router.replace('/admin/login');
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setBookings(data.bookings || []);
    }
  };

  const fetchGallery = async () => {
    const res = await fetch('/api/gallery');
    if (res.ok) {
      const data = await res.json();
      setGallery(data.items || []);
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([fetchBookings(), fetchGallery()]);
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Sorting
  const sortedBookings = [...bookings].sort((a, b) => {
    const aVal = a[sortField] ?? '';
    const bVal = b[sortField] ?? '';
    const cmp = String(aVal).localeCompare(String(bVal));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  // Dropzone
  const onDrop = useCallback((files: File[]) => {
    if (files[0]) setPendingFile(files[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [], 'video/*': [] }, maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!pendingFile) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', pendingFile);
      fd.append('caption', uploadCaption);
      fd.append('category', uploadCategory);
      const res = await fetch('/api/gallery', { method: 'POST', body: fd });
      if (res.ok) {
        toast.success('Image uploaded!');
        setPendingFile(null);
        setUploadCaption('');
        await fetchGallery();
      } else {
        toast.error('Upload failed');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Delete "${item.caption || 'this image'}"?`)) return;
    const res = await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, blob_pathname: item.blob_url }),
    });
    if (res.ok) {
      toast.success('Deleted');
      setGallery(gallery.filter((g) => g.id !== item.id));
    } else {
      toast.error('Delete failed');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) =>
    sortField === field ? (
      sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
    ) : <ChevronDown size={12} className="opacity-30" />;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin mx-auto mb-3" />
          <p className="text-body/50 text-sm font-sans">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />

      {/* Admin Nav */}
      <header className="bg-forest border-b border-cream/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={18} className="text-gold" />
          <span className="font-serif text-cream text-lg">TCM Admin</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-cream/40 text-xs font-sans hidden sm:block">
            {bookings.length} bookings · {gallery.length} photos
          </span>
          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            className="flex items-center gap-1.5 text-cream/60 hover:text-cream text-sm font-sans transition-colors"
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-0 max-w-6xl mx-auto">
          {([['bookings', 'Booking Submissions', Calendar], ['gallery', 'Gallery Manager', Images]] as const).map(
            ([tab, label, Icon]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-sans font-medium border-b-2 transition-all duration-200 ${
                  activeTab === tab
                    ? 'border-forest text-forest'
                    : 'border-transparent text-body/50 hover:text-body'
                }`}
              >
                <Icon size={15} />
                {label}
                {tab === 'bookings' && (
                  <span className="bg-forest text-cream text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                    {bookings.length}
                  </span>
                )}
              </button>
            )
          )}
        </div>
      </div>

      <main className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        {/* ── BOOKINGS TAB ── */}
        {activeTab === 'bookings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-forest text-xl">Quote Requests</h2>
              <button onClick={fetchBookings} className="flex items-center gap-1.5 text-body/50 hover:text-forest text-sm font-sans transition-colors">
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>

            {sortedBookings.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <Calendar size={32} className="text-body/20 mx-auto mb-3" />
                <p className="text-body/50 text-sm font-sans">No bookings yet. They&apos;ll appear here when submitted.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-sans">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-left">
                        {[
                          ['created_at', 'Date'],
                          ['name', 'Name'],
                          ['service_type', 'Service'],
                          [null, 'Phone'],
                          [null, 'Address'],
                          [null, ''],
                        ].map(([field, label]) => (
                          <th
                            key={label as string}
                            onClick={field ? () => toggleSort(field as SortField) : undefined}
                            className={`px-4 py-3 text-xs uppercase tracking-wider text-body/50 font-semibold ${field ? 'cursor-pointer hover:text-forest select-none' : ''}`}
                          >
                            <span className="flex items-center gap-1">
                              {label}
                              {field && <SortIcon field={field as SortField} />}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedBookings.map((b) => (
                        <>
                          <tr
                            key={b.id}
                            className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => setExpandedBooking(expandedBooking === b.id ? null : b.id)}
                          >
                            <td className="px-4 py-3 text-body/50 whitespace-nowrap">
                              {format(new Date(b.created_at), 'MM/dd/yy h:mm a')}
                            </td>
                            <td className="px-4 py-3 font-medium text-forest whitespace-nowrap">{b.name}</td>
                            <td className="px-4 py-3 text-body/70">{b.service_type}</td>
                            <td className="px-4 py-3">
                              <a href={`tel:${b.phone}`} className="text-gold hover:underline" onClick={(e) => e.stopPropagation()}>
                                {b.phone}
                              </a>
                            </td>
                            <td className="px-4 py-3 text-body/60 max-w-[160px] truncate">{b.address}</td>
                            <td className="px-4 py-3 text-body/30">
                              {expandedBooking === b.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </td>
                          </tr>
                          {expandedBooking === b.id && (
                            <tr key={`${b.id}-detail`} className="bg-cream/30">
                              <td colSpan={6} className="px-6 py-5">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                  <div>
                                    <p className="text-body/40 uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-body">{b.email || '—'}</p>
                                  </div>
                                  <div>
                                    <p className="text-body/40 uppercase tracking-wider mb-1">Size</p>
                                    <p className="text-body">{b.bedrooms || '?'} bed / {b.bathrooms || '?'} bath</p>
                                  </div>
                                  <div>
                                    <p className="text-body/40 uppercase tracking-wider mb-1">Preferred Date</p>
                                    <p className="text-body">{b.preferred_date || '—'}</p>
                                  </div>
                                  <div>
                                    <p className="text-body/40 uppercase tracking-wider mb-1">Add-Ons</p>
                                    <p className="text-body">{b.addons?.join(', ') || '—'}</p>
                                  </div>
                                  {b.notes && (
                                    <div className="col-span-full">
                                      <p className="text-body/40 uppercase tracking-wider mb-1">Notes</p>
                                      <p className="text-body">{b.notes}</p>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── GALLERY TAB ── */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-forest text-xl">Gallery Manager</h2>
              <button onClick={fetchGallery} className="flex items-center gap-1.5 text-body/50 hover:text-forest text-sm font-sans transition-colors">
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>

            {/* Upload area */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
              <h3 className="font-sans font-semibold text-forest text-sm mb-4 flex items-center gap-2">
                <Upload size={14} />
                Upload New Photo / Video
              </h3>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
                  isDragActive
                    ? 'border-gold bg-gold/5'
                    : pendingFile
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 hover:border-gold'
                }`}
              >
                <input {...getInputProps()} id="gallery-upload-input" />
                {pendingFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <Check size={20} className="text-green-500" />
                    <span className="text-sm font-sans text-green-700">{pendingFile.name}</span>
                    <button onClick={(e) => { e.stopPropagation(); setPendingFile(null); }} className="text-body/40 hover:text-red-500">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="text-body/30 mx-auto mb-2" />
                    <p className="text-body/50 text-sm">{isDragActive ? 'Drop it!' : 'Drag & drop or click to select'}</p>
                    <p className="text-body/30 text-xs mt-1">Images and videos supported</p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-body/50 uppercase tracking-wider mb-1.5">Caption</label>
                  <input
                    type="text"
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    placeholder="e.g., Kitchen deep clean — Nacogdoches"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-body text-sm font-sans outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    id="gallery-caption-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-body/50 uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-body text-sm font-sans outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 cursor-pointer"
                    id="gallery-category-select"
                  >
                    <option value="cleaning">Cleaning</option>
                    <option value="handyman">Handyman</option>
                    <option value="general">General</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={!pendingFile || uploading}
                id="gallery-upload-submit"
                className="mt-4 flex items-center gap-2 bg-forest text-cream rounded-full px-6 py-2.5 text-sm font-semibold font-sans hover:bg-forest-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    Upload to Gallery
                  </>
                )}
              </button>
            </div>

            {/* Gallery grid */}
            {gallery.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <Images size={32} className="text-body/20 mx-auto mb-3" />
                <p className="text-body/50 text-sm font-sans">No gallery items yet. Upload your first photo above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {gallery.map((item) => (
                  <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={item.blob_url}
                      alt={item.caption || 'Gallery image'}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <div className="absolute inset-0 bg-forest/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
                      {item.caption && (
                        <p className="text-cream text-xs text-center leading-tight">{item.caption}</p>
                      )}
                      <span className="text-gold text-xs capitalize">{item.category}</span>
                      <button
                        onClick={() => handleDelete(item)}
                        className="flex items-center gap-1 bg-red-500 text-white rounded-full px-3 py-1 text-xs font-sans mt-1 hover:bg-red-600 transition-colors"
                        aria-label="Delete image"
                      >
                        <Trash2 size={11} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
