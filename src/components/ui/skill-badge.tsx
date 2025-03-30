import React from 'react';
import { Badge } from './badge';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, Lock } from 'lucide-react';

export type SkillData = {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  status: 'verified' | 'pending' | 'unverified';
  date?: string;
};

type SkillBadgeProps = {
  skill: SkillData;
  className?: string;
  onClick?: () => void;
};

export type SkillVerificationStatus = 'verified' | 'pending' | 'unverified';

export function SkillBadge({ skill, className, onClick }: SkillBadgeProps) {
  const getStatusIcon = (status: SkillVerificationStatus) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-3.5 w-3.5 mr-1 text-emerald-500" />;
      case 'pending':
        return <Clock className="h-3.5 w-3.5 mr-1 text-amber-500" />;
      case 'unverified':
        return <Lock className="h-3.5 w-3.5 mr-1 text-gray-500" />;
    }
  };

  const getBackgroundColor = (status: SkillVerificationStatus) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200';
      case 'unverified':
        return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-purple-100 text-purple-800';
      case 'advanced':
        return 'bg-indigo-100 text-indigo-800';
      case 'expert':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        'flex items-center py-1 px-2 text-xs font-medium mr-2 mb-2 cursor-pointer transition-colors',
        getBackgroundColor(skill.status),
        className,
      )}
      onClick={onClick}
    >
      {getStatusIcon(skill.status)}
      <span>{skill.name}</span>
      <span className={cn('ml-1.5 px-1.5 py-0.5 rounded-sm text-[0.65rem] leading-none', getLevelColor(skill.level))}>
        {skill.level}
      </span>
    </Badge>
  );
}

export function SkillBadgeGroup({ skills, className, onClick }: { skills: SkillData[]; className?: string; onClick?: (skill: SkillData) => void }) {
  return (
    <div className={cn('flex flex-wrap', className)}>
      {skills.map((skill, index) => (
        <SkillBadge 
          key={`${skill.name}-${index}`} 
          skill={skill} 
          onClick={onClick ? () => onClick(skill) : undefined}
        />
      ))}
    </div>
  );
} 