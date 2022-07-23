import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

function ErelegoTask() {
  let [data, setData] = useState([]);
  let [copyData, setCopyData] = useState([]);
  let name = useRef();
  let email = useRef();
  let designation = useRef();

  // Function For Getting New Employee Details
  let getNewEmp = (e) => {
    e.preventDefault();
    name = name.current.value;
    email = email.current.value;
    designation = designation.current.value;
    let active_inactive = "Active";
    let newData = [...data]
    newData.unshift({name,email,designation,active_inactive})
    setData(newData)
    console.log(JSON.stringify(data));
  };

  // Getting Raw Data From API Using Axios
  useEffect(() => {
    let URLdata = `https://gist.githubusercontent.com/Dineshkr23/3fa57effabc3d944e82cb67198876a04/raw/49db7a882d2fac008aa69f2b955d78482ac313b4/erelegoData`;
    axios
      .get(URLdata)
      .then((response) => {
        setData(response.data);
        setCopyData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let searchEmp = (e) => {
    if(!e.target.value){
      setData(copyData)
    }else{
      let s = data.filter((d) => {
        if(d.name.toLowerCase().includes(e.target.value.toLowerCase())){
         return d;
        }
      });
      console.log(s);
      setData(s);
    }
    
    
  };

  return (
    <>
      <div className="p-3 bg-dark text-warning row">
        <h1>Employee Details</h1>
      </div>
      <div className="p-2 bg-light bg-gradient">
        <form onSubmit={getNewEmp}>
          <input
            ref={name}
            className="p-2 mx-3 border rounded bg-light border border-info"
            type="text"
            name="name"
            id="name"
            placeholder="Enter Employee Name..."
          />
          <input
            ref={email}
            className="p-2 mx-3 border rounded bg-light border border-info"
            type="text"
            name="email"
            id="email"
            placeholder="Enter Employee Email..."
          />
          <input
            ref={designation}
            className="p-2 mx-3 border rounded bg-light border border-info"
            type="text"
            name="designation"
            id="designation"
            placeholder="Enter Employee Designation..."
          />
          <input
            className="btn btn-warning"
            type="submit"
            value="Add Employee"
          />
        </form>
        <input
          onInput={searchEmp}
          type="text"
          className="form-control w-25 m-auto bg-light border border-info"
          placeholder="Search For Employee Details Here..."
        />
      </div>
      <div>
        <table className="table table-striped table-bordered">
          <thead className="table-dark text-warning">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Active/Inactive</th>
            </tr>
          </thead>
          <tbody className="table-success border-success">
            {data.map((value) => {
              return (
                <tr>
                  <td>{value.name}</td>
                  <td>{value.email}</td>
                  <td>{value.designation}</td>
                  <td>{value.active_inactive}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ErelegoTask;
