import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from '../styles/HomeStyle.module.css'

const ShipmentReqests = () => {
    const [data, setData] = useState([])
    const getAllReqs = () => {
        axios
          .get("/api/loads", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("tk"),
            },
          })
          .then((res) => {
            console.log(res.data.loads)
            setData(res.data.loads)
          })
          .catch((err) => {
            console.log(err);
            alert(err.response.data.message || "Something went wrong!");
          });
      };
      useEffect(() => {
        getAllReqs()
      }, [])
  return (
    <div className={style.cardContainer}>
        {data.length>0 && data.map((req, ind) => (
            <div className={style.card} key={ind}>
                <p>Request raised on: {req.created_date}</p>
                <p>Company Name: {req.companyName}</p>
                <p>Pickup Location: {req.pickup}</p>
                <p>Deliever to: {req.destination}</p>
                <p>Type of load: {req.loadType}</p>
                <div className={style.cardBtns}>
                    <p className={style.reqStatus}>{req.status}</p>
                    <button className={style.deleteReq}>Revoke</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ShipmentReqests