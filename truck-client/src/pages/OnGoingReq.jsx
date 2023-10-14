import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../styles/HomeStyle.module.css";

const OnGoingRequests = () => {
  const [data, setData] = useState([]);
  const getAllReqs = () => {
    axios
      .get("/api/loads/fortruck",  {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("tk"),
        },
      })
      .then((res) => {
        console.log(res.data.loads);
        setData(res.data.loads);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message || "Something went wrong!");
      });
  };

  const handleTakeTruck = (id) => {
    // console.log('truck', id);
    let truckNum = prompt("Please enter truck number:", "");
    if (truckNum == null || truckNum == "") {
      return;
    } else {
      // console.log({
      //         userId: localStorage.getItem("uid"),
      //         loadId: id,
      //         truckNum,
      //       })
      axios
        .post(
          "/api/loads/fortruck",
          {
            userId: localStorage.getItem("uid"),
            loadId: id,
            truckNum,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("tk"),
            },
          }
        )
        .then((res) => {
          const newData = data.filter(res => res._id != id)
          setData(newData)
          alert('success')
        })
        .catch((err) => {
          alert("Something went wrong!");
          console.log(err)
        });
    }
  };

  useEffect(() => {
    getAllReqs();
  }, []);
  return (
    <div className={style.cardContainer}>
      {data.length > 0 &&
        data.map((req, ind) => (
          <div className={style.card} key={ind}>
            <p>Request raised on: {req.created_date}</p>
            <p>Company Name: {req.companyName}</p>
            <p>Pickup Location: {req.pickup}</p>
            <p>Deliever to: {req.destination}</p>
            <p>Type of load: {req.loadType}</p>
            <div className={style.cardBtns}>
              <p className={style.reqStatus}>{req.status}</p>
              <button
                onClick={() => handleTakeTruck(req._id)}
                className={style.greenBtn}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
        {data.length == 0 && <div style={{marginBlock: '2.4rem', textAlign: 'center'}}>No requests available</div>}
    </div>
  );
};

export default OnGoingRequests;
