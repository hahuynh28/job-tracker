import React from "react";
import { deleteApplication } from "../services/applicationService";
import { useApplication } from "../context/ApplicationContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteConfirmDialog = ({}) => {
  const {
    fetchApplications,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deletingApplication,
  } = useApplication();

  const handleDelete = async (e) => {
    try {
      await deleteApplication({ id: deletingApplication.id });
      setIsDeleteDialogOpen(false);
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the application for{" "}
            {deletingApplication?.role} at {deletingApplication?.company}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmDialog;
