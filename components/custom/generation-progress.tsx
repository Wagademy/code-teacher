import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GenerationProgressProps {
  text: string;
}

export function GenerationProgress({ text }: GenerationProgressProps) {

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <div className="animate-spin">
          <LoaderIcon size={16} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground"
        >
          {text}
        </motion.div>
      </div>
    </div>
  );
}
