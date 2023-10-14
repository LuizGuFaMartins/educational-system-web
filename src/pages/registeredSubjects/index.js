import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisteredSubjectCard from "../../components/registeredSubjectCard";
import api from "../../services/api";
import { logout } from "../../services/auth";
import "./styles.css";

const RegisteredSubject = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = React.useState([]);
  const [filteredSubjects, setFilteredSubjects] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState(0);
  const student = useSelector(state => state.student)

  React.useEffect(() => {
    setSubjects([]);
    setFilteredSubjects([]);
    api
      .get(
        `/subjects/${student?.student_id}`
      )
      .then((res) => {
        setSubjects(res.data);
        setFilteredSubjects(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error?.response && error.response.status === 401) {
          navigate("/login");
          logout();
        }
      });

  }, []);

  React.useEffect(() => {
    if (deleteId !== 0) {
      deleteProduct();
    } else {
      setDeleteId(0);
    }
  }, [deleteId]);

  async function deleteProduct() {
    const filter = subjects.filter((product) => product.productId !== deleteId);
    setFilteredSubjects(filter);
  }

  function onSearch(value) {
    setSearch(value);
    if (value !== "") {
      const filter = subjects.filter((subject) => {
        if (subject.subject_name.toLowerCase().includes(value.toLowerCase())) {
          return subject
        }
      });
      setFilteredSubjects(filter);
    } else {
      setFilteredSubjects(subjects);
    }
  }

  return (
    <>
      <div className="product-container">
        <div className="search-bar">
          <input
            value={search}
            onChange={({ target }) => onSearch(target.value)}
            type="text"
            placeholder="Buscar por nome da disciplina..."
          />
          <div className="glass"></div>
        </div>
        <div className="product-boxcard">
          {filteredSubjects.length > 0 &&
            filteredSubjects.map((sub) => (
              <div key={sub?.subject_code} className="product-card">
                <RegisteredSubjectCard
                  subject={sub}
                  student={student}
                  setDeleteId={setDeleteId}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default RegisteredSubject;
