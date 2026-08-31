'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import { BOOKING_SERVICES, ADDONS, POLICIES, SERVICE_AREAS } from '@/lib/constants';
import { ChevronDown, AlertCircle } from 'lucide-react';

const SERVICE_AREA_TOWNS = SERVICE_AREAS.map((a) => a.toLowerCase());

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').or(z.literal('')),
  service_type: z.string().min(1, 'Please select a service'),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  address: z.string().min(3, 'Please enter your address or town'),
  preferred_date: z.string().optional(),
  addons: z.array(z.string()).optional(),
  notes: z.string().optional(),
  agreed_to_policy: z.boolean().refine((v) => v === true, { message: 'You must agree to the service policies' }),
});

type FormData = z.infer<typeof schema>;

function isInServiceArea(address: string): boolean {
  const lower = address.toLowerCase();
  return SERVICE_AREA_TOWNS.some((town) => lower.includes(town));
}

export default function BookingForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [areaWarning, setAreaWarning] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { addons: [], agreed_to_policy: false },
  });

  const address = watch('address', '');

  const handleAddressBlur = () => {
    if (address.length > 2) {
      setAreaWarning(!isInServiceArea(address));
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      router.push('/thank-you');
    } catch {
      toast.error('Something went wrong. Please try calling us directly.');
      setSubmitting(false);
    }
  };

  const inputClass = (error?: { message?: string }) =>
    `w-full bg-white border rounded-xl px-4 py-3 text-body text-sm font-sans outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-body/30 ${
      error ? 'border-red-400' : 'border-body/15'
    }`;

  const labelClass = 'block text-forest text-sm font-semibold font-sans mb-1.5';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      {/* Personal Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input id="name" type="text" placeholder="Jane Smith" {...register('name')} className={inputClass(errors.name)} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number *</label>
          <input id="phone" type="tel" placeholder="(936) 555-0000" {...register('phone')} className={inputClass(errors.phone)} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email Address <span className="text-body/40 font-normal">(optional)</span></label>
        <input id="email" type="email" placeholder="jane@example.com" {...register('email')} className={inputClass(errors.email)} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service_type" className={labelClass}>Service Type *</label>
        <div className="relative">
          <select id="service_type" {...register('service_type')} className={`${inputClass(errors.service_type)} appearance-none pr-10 cursor-pointer`}>
            <option value="">Select a service...</option>
            {BOOKING_SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-body/40 pointer-events-none" />
        </div>
        {errors.service_type && <p className="text-red-500 text-xs mt-1">{errors.service_type.message}</p>}
      </div>

      {/* Home size */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="bedrooms" className={labelClass}>Bedrooms</label>
          <div className="relative">
            <select id="bedrooms" {...register('bedrooms')} className={`${inputClass()} appearance-none pr-10 cursor-pointer`}>
              <option value="">—</option>
              {['1', '2', '3', '4', '5+'].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-body/40 pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="bathrooms" className={labelClass}>Bathrooms</label>
          <div className="relative">
            <select id="bathrooms" {...register('bathrooms')} className={`${inputClass()} appearance-none pr-10 cursor-pointer`}>
              <option value="">—</option>
              {['1', '1.5', '2', '2.5', '3+'].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-body/40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className={labelClass}>Property Address or Town *</label>
        <input
          id="address"
          type="text"
          placeholder="City, TX or street address"
          {...register('address')}
          onBlur={handleAddressBlur}
          className={inputClass(errors.address)}
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        {areaWarning && !errors.address && (
          <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <AlertCircle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-amber-700 text-xs">
              We may not currently serve your area, but reach out and we&apos;ll see what we can do!
            </p>
          </div>
        )}
      </div>

      {/* Date */}
      <div>
        <label htmlFor="preferred_date" className={labelClass}>Preferred Date / Timeframe <span className="text-body/40 font-normal">(optional)</span></label>
        <input
          id="preferred_date"
          type="text"
          placeholder="e.g., Next week, Aug 15, or ASAP"
          {...register('preferred_date')}
          className={inputClass()}
        />
      </div>

      {/* Add-ons */}
      <div>
        <p className={labelClass}>Add-Ons <span className="text-body/40 font-normal">(optional)</span></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ADDONS.map((addon) => (
            <label key={addon.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value={addon.label}
                {...register('addons')}
                className="w-4 h-4 accent-gold rounded cursor-pointer"
              />
              <span className="text-body/70 text-sm font-sans group-hover:text-forest transition-colors">
                {addon.label}
                <span className="text-gold ml-1 text-xs">{addon.price}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelClass}>Additional Notes <span className="text-body/40 font-normal">(optional)</span></label>
        <textarea
          id="notes"
          rows={4}
          placeholder="Any details we should know — special access instructions, areas of concern, pets, etc."
          {...register('notes')}
          className={`${inputClass()} resize-none`}
        />
      </div>

      {/* Policy agree */}
      <div className="bg-cream rounded-xl p-4 border border-gold/15">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            id="agreed_to_policy"
            {...register('agreed_to_policy')}
            className="w-4 h-4 accent-gold rounded mt-0.5 cursor-pointer flex-shrink-0"
          />
          <span className="text-body/70 text-sm leading-relaxed">
            I have read and agree to the{' '}
            <a href="#policies" className="text-gold hover:underline font-medium">service policies</a>{' '}
            listed below.{' '}
            <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.agreed_to_policy && (
          <p className="text-red-500 text-xs mt-2 ml-7">{errors.agreed_to_policy.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        id="booking-submit-btn"
        disabled={submitting}
        className="w-full btn-gold justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting...
          </span>
        ) : (
          'Send My Quote Request →'
        )}
      </button>

      <p className="text-body/40 text-xs text-center">
        No payment required at this step. We&apos;ll contact you to confirm details.
      </p>
    </form>
  );
}
