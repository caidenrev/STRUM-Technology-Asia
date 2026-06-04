import React from 'react';
import * as Icons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = '', size }: LucideIconProps) {
  // Safe lookup: match exactly or default to Zap
  const IconComponent = (Icons as Record<string, React.ComponentType<any>>)[name] || Icons.Zap;

  return <IconComponent className={className} size={size} />;
}
