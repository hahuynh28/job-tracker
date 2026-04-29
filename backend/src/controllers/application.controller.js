//application.controller.js
import prisma from "../db/prismaClient.js";

export async function createApplication(req, res) {
  try {
    const userId = req.user.userId;
    const { company, role, status, link, notes, dateApplied } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const data = await prisma.application.create({
      data: {
        company,
        role,
        status: status || "applied",
        link,
        notes,
        userId,
        dateApplied: dateApplied ? new Date(dateApplied) : new Date(),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error creating application",
    });
  }
}

export async function getApplications(req, res) {
  try {
    const userId = req.user.userId;
    const { status, page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageLimit;
    const take = pageLimit;

    const where = { userId };

    if (status) {
      where.status = status;
    }

    const total = await prisma.application.count({ where });
    const totalPages = Math.ceil(total / pageLimit);

    const applications = await prisma.application.findMany({
      where,
      orderBy: { dateApplied: "desc" },
      skip,
      take,
    });

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: {
        applications,
        pagination: {
          total,
          page: pageNumber,
          totalPages,
          limit: pageLimit,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching applications",
    });
  }
}

export async function updateApplication(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { dateApplied, company, role, status, link, notes } = req.body;

    const updateData = {};

    if (company !== undefined) updateData.company = company;
    if (role !== undefined) updateData.role = role;
    if (status !== undefined) updateData.status = status;
    if (link !== undefined) updateData.link = link;
    if (notes !== undefined) updateData.notes = notes;
    if (dateApplied !== undefined)
      updateData.dateApplied = new Date(dateApplied);

    const updatedApplication = await prisma.application.updateMany({
      where: { id, userId },
      data: updateData,
    });

    if (updatedApplication.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating application",
    });
  }
}

export async function deleteApplication(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const deleted = await prisma.application.deleteMany({
      where: { id, userId },
    });

    if (deleted.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Failed to delete application",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting application",
    });
  }
}

export async function getApplicationById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const application = await prisma.application.findFirst({
      where: { id, userId },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: {
        application,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching application",
    });
  }
}
