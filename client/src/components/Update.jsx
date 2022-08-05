import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatedata } from "./ContextProvider";

const Update = () => {
  const { updata, setUPdata } = useContext(updatedata);
  let navigate = useNavigate();
  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    salary: "",
    desc: "",
  });

  const setdata = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInpval((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { id } = useParams();

  const getInput = async (e) => {
    const res = await fetch(
      `https://eployeeregister.herokuapp.com/getdata/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data.id);

    if (res.status === 400 || res.status === 404 || !data) {
      console.log("error");
    } else {
      setInpval(data);
      console.log(data.id, "get data is here");
    }
  };

  useEffect(() => {
    getInput();
  }, []);

  const updated = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, salary, desc } = inpval;
    const res2 = await fetch(
      `https://eployeeregister.herokuapp.com/update/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name,
          email,
          age,
          mobile,
          work,
          salary,
          desc,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data2 = await res2.json();
    console.log(data2, "data is here");

    if (res2.status === 400 || res2.status === 404 || !data2) {
      alert("Please fill all the fields");
    } else {
      setUPdata(data2);
      navigate("/");
    }
  };

  return (
    <div className="container">
      {/* <NavLink to="/">home</NavLink> */}
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              age
            </label>
            <input
              type="number"
              value={inpval.age}
              onChange={setdata}
              name="age"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inpval.mobile}
              onChange={setdata}
              name="mobile"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Work
            </label>
            <input
              type="text"
              value={inpval.work}
              onChange={setdata}
              name="work"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Salary
            </label>
            <input
              type="number"
              value={inpval.salary}
              onChange={setdata}
              name="salary"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-12 col-md-12 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <textarea
              name="desc"
              value={inpval.desc}
              onChange={setdata}
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>

          <button onClick={updated} type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
