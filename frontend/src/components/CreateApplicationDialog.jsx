import React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  createApplication,
  updateApplication,
} from "../services/applicationService";
import { useApplication } from "../context/ApplicationContext";

const CreateApplicationDialog = () => {
  const {
    fetchApplications,
    isDialogOpen,
    setIsDialogOpen,
    editingApplication,
  } = useApplication();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "wishlist",
    link: "",
    notes: "",
    dateApplied: "",
  });

  const updateField = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const handleSubmit = async (e) => {
    try {
      if (editingApplication) {
        await updateApplication({ id: editingApplication.id, ...formData });
      } else {
        await createApplication(formData);
      }
      setIsDialogOpen(false);
      fetchApplications();
      setFormData({
        company: "",
        role: "",
        status: "wishlist",
        link: "",
        notes: "",
        dateApplied: "",
      });
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };

  useEffect(() => {
    if (editingApplication) {
      setFormData({
        company: editingApplication.company || "",
        role: editingApplication.role || "",
        status: editingApplication.status || "wishlist",
        link: editingApplication.link || "",
        notes: editingApplication.notes || "",
        dateApplied: editingApplication.dateApplied
          ? new Date(editingApplication.dateApplied).toISOString().split("T")[0]
          : "",
      });
    }
  }, [editingApplication]);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingApplication ? "Edit Application" : "Add New Application"}
            </DialogTitle>
          </DialogHeader>
          <Input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleInputChange}
          />

          <Input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleInputChange}
          />

          <Select
            value={formData.status}
            onValueChange={(value) => updateField("status", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wishlist">Wishlist</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Input
            name="link"
            placeholder="Application Link"
            value={formData.link}
            onChange={handleInputChange}
          />

          <input
            type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleInputChange}
          />

          <Textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleInputChange}
          />

          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateApplicationDialog;
