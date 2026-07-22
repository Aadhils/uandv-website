'use client';

import { DemoCard, DemoPageHeader } from '@/components/demo/mlm/ui';
import { BinaryTreeView } from '@/components/demo/mlm/trees';
import { demoBinaryTree, demoCurrentUser } from '@/lib/demo/mlm/mock-data';

export default function MlmBinaryPage() {
  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Binary Tree"
        description="Visual binary placement with left/right legs, volumes, and open slots."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <DemoCard title="Left volume">
          <p className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
            {demoCurrentUser.leftVolume.toLocaleString('en-IN')}
          </p>
        </DemoCard>
        <DemoCard title="Right volume">
          <p className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
            {demoCurrentUser.rightVolume.toLocaleString('en-IN')}
          </p>
        </DemoCard>
      </div>
      <DemoCard
        title="Binary placement map"
        description="Scroll horizontally on smaller screens to explore the full tree."
      >
        <BinaryTreeView root={demoBinaryTree} />
      </DemoCard>
    </div>
  );
}
