import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JobDetail() {
  const { jobs_id } = useParams();
  const [id, setJob] = useState();
  useEffect(() => {
    console.log("testing");
    const url = "http://localhost:8000/jobs/" + jobs_id;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJob(data.id);
      });
  }, []);
  return <>{id ? <p>{jobs_id}</p> : null}</>;
}
