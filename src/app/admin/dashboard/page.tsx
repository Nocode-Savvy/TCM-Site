'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Images,
  LogOut,
  Upload,
  Trash2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  X,
  Check,
  KeyRound,
  ExternalLink,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

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

type Tab = 'bookings' | 'gallery' | 'settings';
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

  // Gallery Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCategory, setUploadCategory] = useState('cleaning');
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      if (res.status === 401 || res.status === 403) {
        router.replace('/admin/login');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch {
      // ignore
    }
  }, [router]);

  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setGallery(data.items || []);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    (async () => {
      await Promise.all([fetchBookings(), fetchGallery()]);
      setLoading(false);
    })();
  }, [fetchBookings, fetchGallery]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
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
    onDrop,
    accept: { 'image/*': [], 'video/*': [] },
    maxFiles: 1,
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
        toast.success('Photo uploaded to gallery!');
        setPendingFile(null);
        setUploadCaption('');
        await fetchGallery();
      } else {
        toast.error('Upload failed. Please check file and try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Are you sure you want to delete "${item.caption || 'this image'}"?`)) return;
    const res = await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, blob_pathname: item.blob_url }),
    });
    if (res.ok) {
      toast.success('Item deleted');
      setGallery(gallery.filter((g) => g.id !== item.id));
    } else {
      toast.error('Delete failed');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }

    setChangingPass(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(data.error || 'Failed to update password.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setChangingPass(false);
    }
  };

  const SortIcon = ({ field }: { field: SortField }) =>
    sortField === field ? (
      sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
    ) : (
      <ChevronDown size={12} className="opacity-30" />
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-9 h-9 border-3 border-forest/20 border-t-forest rounded-full animate-spin mx-auto mb-3" />
          <p className="text-body/60 text-sm font-sans">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* ── DEDICATED ADMIN HEADER ── */}
      <header className="bg-forest text-cream border-b border-cream/10 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="TCM Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-cream text-lg font-semibold leading-tight">
                  TCM Home Solutions
                </span>
                <span className="bg-gold/20 text-gold text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-gold/30">
                  Admin
                </span>
              </div>
              <p className="text-cream/50 text-xs hidden sm:block">
                Management Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-cream/70 hover:text-gold transition-colors duration-200"
            >
              <ExternalLink size={13} />
              View Live Website
            </Link>

            <div className="h-4 w-px bg-cream/15 hidden md:block" />

            <button
              onClick={handleLogout}
              id="admin-logout-button"
              className="inline-flex items-center gap-1.5 bg-cream/10 hover:bg-red-600/90 text-cream px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 border border-cream/20 hover:border-transparent"
            >
              <LogOut size={13} />
              Log Out
            </button>
          </div>
        </div>

        {/* ── ADMIN TABS ── */}
        <div className="bg-forest-dark border-t border-cream/10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-200 ${
                activeTab === 'bookings'
                  ? 'border-gold text-gold font-semibold'
                  : 'border-transparent text-cream/60 hover:text-cream'
              }`}
            >
              <Calendar size={15} />
              Booking Submissions
              <span
                className={`text-[11px] rounded-full px-2 py-0.2 ${
                  activeTab === 'bookings'
                    ? 'bg-gold text-forest font-bold'
                    : 'bg-cream/10 text-cream/70'
                }`}
              >
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-200 ${
                activeTab === 'gallery'
                  ? 'border-gold text-gold font-semibold'
                  : 'border-transparent text-cream/60 hover:text-cream'
              }`}
            >
              <Images size={15} />
              Gallery Manager
              <span
                className={`text-[11px] rounded-full px-2 py-0.2 ${
                  activeTab === 'gallery'
                    ? 'bg-gold text-forest font-bold'
                    : 'bg-cream/10 text-cream/70'
                }`}
              >
                {gallery.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'border-gold text-gold font-semibold'
                  : 'border-transparent text-cream/60 hover:text-cream'
              }`}
            >
              <KeyRound size={15} />
              Change Password
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* ── TAB 1: BOOKING SUBMISSIONS ── */}
        {activeTab === 'bookings' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-serif text-forest text-2xl font-semibold">
                  Quote Requests &amp; Inquiries
                </h1>
                <p className="text-body/60 text-xs mt-1">
                  Manage incoming requests from the public website booking form.
                </p>
              </div>
              <button
                onClick={fetchBookings}
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-forest text-xs font-semibold px-4 py-2 rounded-xl hover:border-gold hover:text-gold transition-colors shadow-sm self-start sm:self-auto"
              >
                <RefreshCw size={13} />
                Refresh List
              </button>
            </div>

            {sortedBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
                <Calendar size={36} className="text-gray-300 mx-auto mb-3" />
                <h3 className="font-serif text-forest text-lg font-semibold mb-1">
                  No Quote Requests Yet
                </h3>
                <p className="text-body/60 text-sm max-w-sm mx-auto">
                  New submissions submitted through the website booking form will appear here in real-time.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-200 text-body/60 uppercase tracking-wider font-semibold">
                        {[
                          ['created_at', 'Date'],
                          ['name', 'Client Name'],
                          ['service_type', 'Service Type'],
                          [null, 'Phone'],
                          [null, 'Town / Address'],
                          [null, 'Details'],
                        ].map(([field, label]) => (
                          <th
                            key={label as string}
                            onClick={field ? () => toggleSort(field as SortField) : undefined}
                            className={`px-4 py-3.5 ${field ? 'cursor-pointer hover:text-forest select-none' : ''}`}
                          >
                            <span className="flex items-center gap-1">
                              {label}
                              {field && <SortIcon field={field as SortField} />}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sortedBookings.map((b) => (
                        <tr
                          key={b.id}
                          className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                          onClick={() => setExpandedBooking(expandedBooking === b.id ? null : b.id)}
                        >
                          <td className="px-4 py-3.5 text-body/60 whitespace-nowrap">
                            {format(new Date(b.created_at), 'MM/dd/yy h:mm a')}
                          </td>
                          <td className="px-4 py-3.5 font-semibold text-forest whitespace-nowrap">
                            {b.name}
                          </td>
                          <td className="px-4 py-3.5 text-body font-medium">
                            <span className="bg-forest/5 text-forest px-2 py-0.5 rounded-md border border-forest/10">
                              {b.service_type}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <a
                              href={`tel:${b.phone}`}
                              className="text-gold font-semibold hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {b.phone}
                            </a>
                          </td>
                          <td className="px-4 py-3.5 text-body/70 max-w-[180px] truncate">
                            {b.address}
                          </td>
                          <td className="px-4 py-3.5 text-body/40">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest bg-gray-100 hover:bg-gold/15 hover:text-gold px-2 py-1 rounded-md transition-colors">
                              {expandedBooking === b.id ? 'Hide' : 'View'}
                              {expandedBooking === b.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Expanded Details Panel */}
                {expandedBooking && (
                  <div className="bg-cream/40 border-t border-gold/20 p-6">
                    {(() => {
                      const b = bookings.find((x) => x.id === expandedBooking);
                      if (!b) return null;
                      return (
                        <div>
                          <h4 className="font-serif text-forest text-sm font-semibold mb-4 flex items-center gap-2">
                            <User size={14} className="text-gold" />
                            Full Lead Details for {b.name}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                              <span className="text-body/40 font-semibold uppercase tracking-wider block mb-1">
                                Email
                              </span>
                              <span className="text-body font-medium break-all">
                                {b.email || 'None provided'}
                              </span>
                            </div>

                            <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                              <span className="text-body/40 font-semibold uppercase tracking-wider block mb-1">
                                Home Size
                              </span>
                              <span className="text-body font-medium">
                                {b.bedrooms ? `${b.bedrooms} Bed` : '—'} / {b.bathrooms ? `${b.bathrooms} Bath` : '—'}
                              </span>
                            </div>

                            <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                              <span className="text-body/40 font-semibold uppercase tracking-wider block mb-1">
                                Preferred Date
                              </span>
                              <span className="text-body font-medium">
                                {b.preferred_date || 'Flexible / ASAP'}
                              </span>
                            </div>

                            <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                              <span className="text-body/40 font-semibold uppercase tracking-wider block mb-1">
                                Add-Ons
                              </span>
                              <span className="text-body font-medium">
                                {b.addons && b.addons.length > 0 ? b.addons.join(', ') : 'None'}
                              </span>
                            </div>

                            {b.notes && (
                              <div className="sm:col-span-2 md:col-span-4 bg-white p-3.5 rounded-xl border border-gray-200">
                                <span className="text-body/40 font-semibold uppercase tracking-wider block mb-1">
                                  Client Notes &amp; Special Instructions
                                </span>
                                <p className="text-body text-xs leading-relaxed whitespace-pre-wrap">
                                  {b.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: GALLERY MANAGER ── */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-serif text-forest text-2xl font-semibold">
                  Gallery &amp; Media Manager
                </h1>
                <p className="text-body/60 text-xs mt-1">
                  Upload project photos and videos that appear live on the public /gallery page.
                </p>
              </div>
              <button
                onClick={fetchGallery}
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-forest text-xs font-semibold px-4 py-2 rounded-xl hover:border-gold hover:text-gold transition-colors shadow-sm self-start sm:self-auto"
              >
                <RefreshCw size={13} />
                Refresh Media
              </button>
            </div>

            {/* Upload form card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
              <h3 className="font-serif text-forest text-base font-semibold mb-3 flex items-center gap-2">
                <Upload size={16} className="text-gold" />
                Upload New Image or Video
              </h3>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragActive
                    ? 'border-gold bg-gold/5'
                    : pendingFile
                    ? 'border-green-500 bg-green-50/50'
                    : 'border-gray-300 hover:border-gold bg-gray-50/50'
                }`}
              >
                <input {...getInputProps()} id="gallery-dropzone-input" />
                {pendingFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <Check size={20} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-800">
                      {pendingFile.name} ({(pendingFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPendingFile(null);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={28} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-body font-semibold text-sm">
                      {isDragActive ? 'Drop file here!' : 'Click or drag & drop image/video here'}
                    </p>
                    <p className="text-body/40 text-xs mt-1">PNG, JPG, WEBP, or MP4</p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-body/60 uppercase tracking-wider mb-1.5">
                    Caption / Title
                  </label>
                  <input
                    type="text"
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    placeholder="e.g. Kitchen deep clean in Nacogdoches"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-body outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-body/60 uppercase tracking-wider mb-1.5">
                    Category Tag
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-body outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 cursor-pointer"
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
                id="gallery-submit-button"
                className="mt-5 btn-gold text-xs py-2.5 px-6 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading to Blob Storage...
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    Publish to Gallery
                  </>
                )}
              </button>
            </div>

            {/* Existing images */}
            {gallery.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <Images size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="text-body/60 text-sm">
                  No images uploaded yet. Use the upload box above to add your first photo.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200"
                  >
                    <Image
                      src={item.blob_url}
                      alt={item.caption || 'Gallery item'}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                    <div className="absolute inset-0 bg-forest/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center gap-2">
                      {item.caption && (
                        <p className="text-cream text-xs font-semibold leading-tight line-clamp-2">
                          {item.caption}
                        </p>
                      )}
                      <span className="text-gold text-[10px] uppercase font-bold tracking-wider">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleDelete(item)}
                        className="mt-1 flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 text-[11px] font-semibold transition-colors"
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

        {/* ── TAB 3: CHANGE PASSWORD & SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h2 className="font-serif text-forest text-xl font-semibold">
                    Change Admin Password
                  </h2>
                  <p className="text-body/60 text-xs">
                    Update the master credentials used to access this dashboard.
                  </p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-body/60 uppercase tracking-wider mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      placeholder="Enter current password"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-xs text-body outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-forest"
                    >
                      {showCurrentPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-body/60 uppercase tracking-wider mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="Enter new password (min. 6 chars)"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-xs text-body outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-forest"
                    >
                      {showNewPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-body/60 uppercase tracking-wider mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Repeat new password"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-body outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={changingPass}
                    id="save-password-button"
                    className="btn-gold w-full justify-center text-xs py-3 font-semibold disabled:opacity-50"
                  >
                    {changingPass ? 'Updating Password...' : 'Save New Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
