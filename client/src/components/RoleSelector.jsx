import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles } from "lucide-react";

const ROLES = [
  { value: "SDE", label: "Software Development Engineer (SDE)" },
  { value: "AIML", label: "AI/ML Engineer" },
  { value: "DEVOPS", label: "DevOps Engineer" },
  { value: "DATASCIENCE", label: "Data Scientist" },
];

export function RoleSelector({ value, onChange }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        Target Role
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12 rounded-xl bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 text-sm px-4 text-slate-200">
          <SelectValue placeholder="Select your dream role" />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-white/10 bg-[#0F172A]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          {ROLES.map((role) => (
            <SelectItem 
              key={role.value} 
              value={role.value}
              className="rounded-lg hover:bg-white/10 cursor-pointer py-2.5 text-sm text-slate-200 focus:bg-indigo-500/20 focus:text-indigo-200"
            >
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
