import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const ApplicationCard = () => {
  const application = {
    company: "Google",
    role: "Frontend Developer",
    status: "interview",
    dateApplied: "2026-04-10",
    link: "careers.google.com",
    notes: "Referred by a friend",
  };

  return (
    <div>
      <div className="bg-surface rounded-lg px-6 py-4 mt-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg mt-3">
            {application.company[0].toUpperCase()}
          </div>
          <div className="flex flex-1 flex-col gap-1 mx-4 mt-2">
            <div className="flex items-center gap-2">
              <h1 className="text-text-primary text-lg font-medium">
                {application.role}
              </h1>
              <Badge variant={application.status}>{application.status}</Badge>
            </div>
            <p className="text-text-secondary text-sm">{application.company}</p>

            <hr className="border-gray-100 my-1" />
            <div className="flex items-center gap-2">
              <small className="text-text-secondary">Applied:</small>
              <small className="text-text-secondary">
                {application.dateApplied}
              </small>
            </div>
            <div className="flex items-center gap-2">
              <small className="text-text-secondary">Link:</small>
              <small className="text-text-secondary">{application.link}</small>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <small className="text-text-secondary">Notes:</small>
              <small className="text-text-secondary">{application.notes}</small>
            </div>
          </div>

          <div className="self-start mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-[#a32d2d]">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
