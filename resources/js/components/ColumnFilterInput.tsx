import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ColumnFilterInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  divisions?: { id: number; name: string }[];
}

export function ColumnFilterInput({ placeholder, value, onChange, divisions }: ColumnFilterInputProps) {
  if (divisions) {
    return (
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All</SelectItem>
          {divisions.map((division) => (
            <SelectItem key={division.id} value={division.name}>
              {division.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input
      placeholder={placeholder}
      className="w-full"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
}
