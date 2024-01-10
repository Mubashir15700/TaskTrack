import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJob } from "../../../services/api";

const JobDetails = () => {
  const [job, setJob] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const response = await getJob(id);
        if (response && response.data.status === "success") {
          setJob(response.data.job);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getJobDetails();
  }, [id]);

  return (
    <>
      <div>{job.title}</div>
    </>
  );
};

export default JobDetails;
