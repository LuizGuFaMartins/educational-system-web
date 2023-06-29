import React from "react";
import { useNavigate } from "react-router-dom";
import ActivityCard from "../../components/activityCard";
import DoughnutChart from "../../doughnut";
import api from "../../services/api";
import { logout } from "../../services/auth";
import "./styles.css";

const Activity = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = React.useState([]);
  const [filteredActivities, setFilteredSubjects] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState(0);
  const [chartData, setChartData] = React.useState(null);

  let labels = [];
  let colors = [
    "#FF0000", // Vermelho
    "#00FF00", // Verde
    "#0000FF", // Azul
    "#FFFF00", // Amarelo
    "#FF00FF", // Magenta
    "#00FFFF", // Ciano
    "#FFA500", // Laranja
    "#800080", // Roxo
    "#008000", // Verde Escuro
    "#000080", // Azul Escuro
  ];
  let values = [];
  let data = null;

  React.useEffect(() => {
    setActivities([]);
    setFilteredSubjects([]);
    api
      .get(`/students/${localStorage.getItem("loginId")}`)
      .then((res) => {
        api
          .get(`/activities/${res?.data[0]?.student_id}`)
          .then((acts) => {
            setActivities(acts.data);
            setFilteredSubjects(acts.data);
            api
              .get(`/subjects/${res?.data[0]?.student_id}`)
              .then((subjects) => {
                let itens = [];
                labels = [];
                values = [];
                data = null;

                subjects.data.forEach((subject) => {
                  if (!itens?.[subject.subject_name]) {
                    itens.push({ [subject.subject_name]: 0 });
                  }
                });

                acts.data.forEach((activity) => {
                  itens.forEach((dt) => {
                    if (Object.keys(dt)[0] === activity.subject.subject_name) {
                      dt[activity.subject.subject_name] =
                        dt[activity.subject.subject_name] + 1;
                    }
                  });
                });

                itens.forEach((dt) => {
                  labels.push(Object.keys(dt)[0]);
                  values.push(Object.values(dt)[0]);
                });

                data = {
                  labels: labels,
                  datasets: [
                    {
                      label: "Atividades por disciplina",
                      data: values,
                      backgroundColor: colors,
                      hoverOffset: 4,
                    },
                  ],
                };
                setChartData(data)
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
      {chartData && (
        <>
          <DoughnutChart data={chartData} />
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
                    <ActivityCard
                      activity={activity}
                      setDeleteId={setDeleteId}
                    />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Activity;
