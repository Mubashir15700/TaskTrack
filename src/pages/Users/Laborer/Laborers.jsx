import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLaborers } from "../../../services/api";

const Laborers = () => {
  const [laborers, setLaborers] = useState([]);

  useEffect(() => {
    const getAllLaborers = async () => {
      try {
        const response = await getLaborers();
        if (response && response.data.status === "success") {
          setLaborers(response.data.laborers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllLaborers();
  }, []);

  console.log(laborers);

  return <div>Laborers</div>;
};

export default Laborers;
