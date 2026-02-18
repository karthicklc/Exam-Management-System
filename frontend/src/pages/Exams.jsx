import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function Exams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    API.get("exams/")
      .then((res) => {
        setExams(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Exam List</h2>
      {exams.map((exam) => (
        <div key={exam.id}>
          <p>{exam.exam_name} - {exam.subject_name}</p>
        </div>
      ))}
    </div>
  );
}

export default Exams;
