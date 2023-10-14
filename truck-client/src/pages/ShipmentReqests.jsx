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

      const handleRevoke = (id) => {
        // console.log(id);
        axios
          .delete("/api/loads/"+id, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("tk"),
            },
          })
          .then((res) => {
            const newData = data.filter(res => res._id != id)
            setData(newData)
            alert("Successfully revoke the request")
          })
          .catch((err) => {
            console.log(err);
            alert(err.response.data.message || "Something went wrong!");
          });
      }

      const handlePay = (id) => {
        // handle payment
      }

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
                <div className={style.cardBtns} style={{display: "flex", alignItems:'center'}}>
                    <p className={style.reqStatus}>{req.status}</p>
                    {req.status=='ASSIGNED' ? 
                      <div>
                        <p>Assigned to: {req.truckNum}</p>
                        <button className={style.payBtn} onClick={() => handlePay(req._id)}>Pay Advance</button>
                      </div>
                    : <button onClick={() => handleRevoke(req._id)} className={style.deleteReq}>Revoke</button>}
                </div>
            </div>
        ))}
    </div>
  )
}

export default ShipmentReqests