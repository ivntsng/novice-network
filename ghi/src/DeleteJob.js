import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteJob({ currentJobId, getJobs }) {
  const { jobs_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    deleteJob();
    getJobs();
  }, []);

  const deleteJob = async () => {
    try {
      const deleteUrl = `http://localhost:8000/jobs/${currentJobId}`;
      const response = await fetch(deleteUrl, { method: "DELETE" });
      if (response.ok) {
        // Job deleted successfully
        getJobs();
        navigate("/jobs");
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error occurred during job deletion: ", error);
    }
  };

  return null; // or any UI you want to render during the deletion process
}
