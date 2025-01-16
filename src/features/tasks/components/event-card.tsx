/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project } from "@/features/projects/types";

interface EventCardProps {
  title: string;
  assignee: any;
  project: Project;
  status: string;
  id: string;
}

export const EventCard = ({ title, assignee, project, status, id }: EventCardProps) => {
  return <div className='px-2'></div>;
};
