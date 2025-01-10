"use client";
import React from "react";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { RiAddCircleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import path from "path";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Projects = () => {
  const projectId = null; // TODO: use the useProjectId hook
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex items-center justify-between'>
        <p className='text-xs uppercase text-neutral-500'>Projects</p>
        <RiAddCircleFill onClick={() => {}} className='size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition' />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${projectId}`;
        const isActive = pathname === href;

        return (
          <Link href={`/workspaces/`} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}>
              <span className='truncate'>{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
