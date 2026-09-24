import { createContext, useState, useContext } from "react";
import { getApplications } from "../services/applicationService";

const ApplicationContext = createContext(null);

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [deletingApplication, setDeletingApplication] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      const result = await getApplications({
        status: selectedStatus,
        page: currentPage,
        limit: 10,
      });
      setApplications(result.data.applications);
      setTotalPages(result.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const openCreateDialog = () => {
    setEditingApplication(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (application) => {
    setEditingApplication(application);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (application) => {
    setDeletingApplication(application);
    setIsDeleteDialogOpen(true);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        setApplications,
        selectedStatus,
        setSelectedStatus,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        fetchApplications,
        isDialogOpen,
        setIsDialogOpen,
        editingApplication,
        setEditingApplication,
        openCreateDialog,
        openEditDialog,
        deletingApplication,
        setDeletingApplication,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        openDeleteDialog,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  return useContext(ApplicationContext);
};
