import axios from "axios";
import {
  InvitationForm,
  InvitationFormSubmission,
  ApiResponse,
  PaginatedResponse,
  InvitationFormData,
} from "@/types/index";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export class InvitationsAPI {
  // Get all invitation forms for a job
  static async getInvitationForms(
    orgId: string,
    jobId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<InvitationForm[]>> {
    try {
      const response = await api.get(
        `/orgs/${orgId}/jobs/${jobId}/invitations?page=${page}&limit=${limit}`
      );
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to fetch invitation forms",
      };
    }
  }

  // Get a specific invitation form
  static async getInvitationForm(
    orgId: string,
    jobId: string,
    formId: string
  ): Promise<ApiResponse<InvitationForm>> {
    try {
      const response = await api.get(`/orgs/${orgId}/jobs/${jobId}/invitations/${formId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch invitation form");
    }
  }

  // Create a new invitation form
  static async createInvitationForm(
    orgId: string,
    jobId: string,
    formData: Omit<
      InvitationForm,
      "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "responseCount"
    >
  ): Promise<ApiResponse<InvitationForm>> {
    try {
      const response = await api.post(`/orgs/${orgId}/jobs/${jobId}/invitations`, formData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to create invitation form");
    }
  }

  // Update an invitation form
  static async updateInvitationForm(
    orgId: string,
    jobId: string,
    formId: string,
    formData: Partial<InvitationForm>
  ): Promise<ApiResponse<InvitationForm>> {
    try {
      const response = await api.put(
        `/orgs/${orgId}/jobs/${jobId}/invitations/${formId}`,
        formData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to update invitation form");
    }
  }

  // Delete an invitation form
  static async deleteInvitationForm(
    orgId: string,
    jobId: string,
    formId: string
  ): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete(`/orgs/${orgId}/jobs/${jobId}/invitations/${formId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to delete invitation form");
    }
  }

  // Publish/unpublish an invitation form
  static async toggleFormStatus(
    orgId: string,
    jobId: string,
    formId: string,
    status: "published" | "draft" | "closed"
  ): Promise<ApiResponse<InvitationForm>> {
    try {
      const response = await api.patch(
        `/orgs/${orgId}/jobs/${jobId}/invitations/${formId}/status`,
        { status }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to update form status");
    }
  }

  // Get form submissions/responses
  static async getFormSubmissions(
    orgId: string,
    jobId: string,
    formId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<InvitationFormSubmission>> {
    try {
      const response = await api.get(
        `/orgs/${orgId}/jobs/${jobId}/invitations/${formId}/submissions?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch form submissions");
    }
  }

  // Get a specific form submission
  static async getFormSubmission(
    orgId: string,
    jobId: string,
    formId: string,
    submissionId: string
  ): Promise<ApiResponse<InvitationFormSubmission>> {
    try {
      const response = await api.get(
        `/orgs/${orgId}/jobs/${jobId}/invitations/${formId}/submissions/${submissionId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch form submission");
    }
  }

  // Update submission status (review, shortlist, reject)
  static async updateSubmissionStatus(
    orgId: string,
    jobId: string,
    formId: string,
    submissionId: string,
    status: InvitationFormSubmission["status"],
    score?: number
  ): Promise<ApiResponse<InvitationFormSubmission>> {
    try {
      const response = await api.patch(
        `/orgs/${orgId}/jobs/${jobId}/invitations/${formId}/submissions/${submissionId}`,
        { status, score }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to update submission status");
    }
  }

  // Submit a form (public endpoint for candidates)
  static async submitForm(
    formId: string,
    submissionData: {
      candidateEmail: string;
      candidateName?: string;
      responses: Array<{
        elementId: string;
        answer: string | string[] | File;
      }>;
    }
  ): Promise<ApiResponse<InvitationFormSubmission>> {
    try {
      // Handle file uploads with FormData if needed
      const hasFiles = submissionData.responses.some((r) => r.answer instanceof File);

      if (hasFiles) {
        const formData = new FormData();
        formData.append("candidateEmail", submissionData.candidateEmail);
        if (submissionData.candidateName) {
          formData.append("candidateName", submissionData.candidateName);
        }

        submissionData.responses.forEach((response, index) => {
          if (response.answer instanceof File) {
            formData.append(`responses[${index}].file`, response.answer);
            formData.append(`responses[${index}].elementId`, response.elementId);
          } else {
            formData.append(`responses[${index}].elementId`, response.elementId);
            formData.append(
              `responses[${index}].answer`,
              Array.isArray(response.answer)
                ? JSON.stringify(response.answer)
                : String(response.answer)
            );
          }
        });

        const response = await api.post(`/forms/${formId}/submit`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      } else {
        const response = await api.post(`/forms/${formId}/submit`, submissionData);
        return response.data;
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to submit form");
    }
  }

  // Get public form data (for candidates to fill)
  static async getPublicForm(formId: string): Promise<ApiResponse<InvitationForm>> {
    try {
      const response = await api.get(`/forms/${formId}/public`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch form");
    }
  }

  // Duplicate an invitation form
  static async duplicateForm(
    orgId: string,
    jobId: string,
    formId: string
  ): Promise<ApiResponse<InvitationForm>> {
    try {
      const response = await api.post(
        `/orgs/${orgId}/jobs/${jobId}/invitations/${formId}/duplicate`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to duplicate form");
    }
  }

  // Get form analytics/statistics
  static async getFormAnalytics(
    orgId: string,
    jobId: string,
    formId: string
  ): Promise<
    ApiResponse<{
      totalSubmissions: number;
      submissionsByStatus: Record<string, number>;
      averageScore: number;
      submissionTrend: Array<{ date: string; count: number }>;
    }>
  > {
    try {
      const response = await api.get(
        `/orgs/${orgId}/jobs/${jobId}/invitations/${formId}/analytics`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch form analytics");
    }
  }
}
