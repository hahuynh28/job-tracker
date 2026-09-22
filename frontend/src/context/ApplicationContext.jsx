import { createContext, useState, useContext } from "react";
import { getApplications } from "../services/applicationService";

const ApplicationContext = createContext(null);

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  return useContext(ApplicationContext);
};
