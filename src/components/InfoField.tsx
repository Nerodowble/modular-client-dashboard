
import React from 'react';
import { cn } from "@/lib/utils";

interface InfoFieldProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const InfoField = ({ label, value, className }: InfoFieldProps) => {
  return (
    <div className={cn("mb-4", className)}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="mt-1 text-base">{value}</div>
    </div>
  );
};

export default InfoField;
