import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteJob({ currentJobId, getJobs }) {
  const navigate = useNavigate();

  useEffect(() => {
    deleteJob();
    getJobs();
  }, []);

  const deleteJob = async () => {
    try {
      const deleteUrl = `${process.env.REACT_APP_API_HOST}/jobs/${currentJobId}`;
      const response = await fetch(deleteUrl, { method: "DELETE" });
      if (response.ok) {
        getJobs();
        navigate("/jobs");
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error occurred during job deletion: ", error);
    }
  };

  return null;
}
