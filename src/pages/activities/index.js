import React from "react";
import { useNavigate } from "react-router-dom";
import ActivityCard from "../../components/activityCard";
import api from "../../services/api";
import { getLoginObject, logout } from "../../services/auth";
import "./styles.css";

const Activity = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = React.useState([]);
  const [filteredActivities, setFilteredSubjects] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState(0);

  React.useEffect(() => {
    setActivities([]);
    setFilteredSubjects([]);
    api
      .get(`/students?where={\"login_id\":${getLoginObject().login_id}}`)
      .then((res) => {
        api
          .get(`/activities/${res?.data[0]?.student_id}`)
          .then((acts) => {
            setActivities(acts.data);
            setFilteredSubjects(acts.data);
          })
          .catch((error) => {
            console.log(error);
            if (error?.response && error.response.status === 401) {
              navigate("/login");
              logout();
            }
          });
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
    const filter = activities.filter(
      (product) => product.productId !== deleteId
    );
    setFilteredSubjects(filter);
  }

  function onSearch(value) {
    setSearch(value);
    if (value !== "") {
      const filter = activities.filter((activity) => {
        activity.activity_name.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredSubjects(filter);
    } else {
      setFilteredSubjects(activities);
    }
  }

  return (
    <>
      <>
        <div style={{ marginTop: 30 }} className="product-container">
          <div className="search-bar">
            <input
              value={search}
              onChange={({ target }) => onSearch(target.value)}
              type="text"
              placeholder="Buscar por nome da atividade..."
            />
            <div className="glass"></div>
          </div>
          <div className="product-boxcard">
            {filteredActivities.length > 0 &&
              filteredActivities.map((activity) => (
                <div
                  key={activity?.activity_id}
                  className="product-card activity-card"
                >
                  <ActivityCard activity={activity} setDeleteId={setDeleteId} />
                </div>
              ))}
          </div>
        </div>
      </>
    </>
  );
};

export default Activity;
