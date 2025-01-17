import React from "react";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";

interface TaskOverviewProps {
  task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  return (
    <div className='flex flex-col gap-y-4 col-span-1'>
      <div className='bg-muted rounded-lg p-4'>
        <p className='text-lg font-semibold'>Overview</p>
        <Button size={"sm"} variant={"secondary"}>
          <PencilIcon className='size-4 mr-1' />
          Edit
        </Button>
      </div>
      <DottedSeparator className='my-4' />
      <div className='flex flex-col gap-y-4'></div>
    </div>
  );
};
