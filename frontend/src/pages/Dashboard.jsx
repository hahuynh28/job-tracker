import React from "react";
import ApplicationCard from "../components/ApplicationCard";
import { useEffect } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useApplication } from "../context/ApplicationContext";

const Dashboard = () => {
  const {
    applications,
    selectedStatus,
    setSelectedStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchApplications,
  } = useApplication();

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  useEffect(() => {
    fetchApplications();
  }, [selectedStatus, currentPage]);

  return (
    <div className="h-[calc(100vh-72px)] p-4 overflow-hidden flex flex-col gap-4">
      <div className="bg-surface rounded-lg p-4 flex items-center gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All</option>
          <option value="wishlist">Wishlist</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-[75%_25%] gap-4 flex-1 overflow-hidden">
        <div className="rounded-lg p-4 overflow-y-auto h-full">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
        <div className="bg-surface rounded-lg p-4 h-full">Right - Stats</div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(currentPage - 1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                onClick={() => setCurrentPage(number)}
                isActive={number === currentPage}
                className="cursor-pointer"
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Dashboard;
