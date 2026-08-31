import Link from 'next/link';
import {
  Sparkles,
  Sparkle,
  Truck,
  Building2,
  Armchair,
  Droplets,
  Paintbrush,
  Wrench,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Sparkle,
  Truck,
  Building2,
  Armchair,
  Droplets,
  Paintbrush,
  Wrench,
};

interface ServiceCardProps {
  iconName?: string;
  name: string;
  description: string;
  href?: string;
  className?: string;
}

export default function ServiceCard({ iconName = 'Sparkles', name, description, href, className = '' }: ServiceCardProps) {
  const IconComponent = ICON_MAP[iconName] || Sparkles;

  const content = (
    <div className={`card p-6 flex flex-col gap-3 group cursor-pointer border border-transparent hover:border-gold/30 ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors duration-200 text-forest group-hover:text-gold-dark">
        <IconComponent size={22} strokeWidth={2} />
      </div>
      <h3 className="font-serif text-lg text-forest font-semibold leading-snug">{name}</h3>
      <p className="text-body/70 text-sm leading-relaxed">{description}</p>
      {href && (
        <span className="text-gold text-sm font-semibold font-sans mt-auto flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
          Learn more <span>→</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
