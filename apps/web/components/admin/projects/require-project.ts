import { notFound } from 'next/navigation';

import { getProjectById, type Project } from '@/lib/projects';

export function requireProject(projectId: string): Project {
  const project = getProjectById(projectId);
  if (!project) notFound();
  return project;
}
