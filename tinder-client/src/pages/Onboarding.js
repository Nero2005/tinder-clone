import { useState } from "react";
import { Nav } from "../components/Nav";

export const Onboarding = () => {
  const handleSubmit = (e) => {};

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value=""
              onChange={handleChange}
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Last Name"
              required={true}
              value=""
              onChange={handleChange}
            />
            <label>Birthday</label>
            <input
              id="dob_day"
              type="number"
              name="dob_day"
              placeholder="DD"
              required={true}
              value=""
              onChange={handleChange}
            />
            <input
              id="dob_month"
              type="number"
              name="dob_month"
              placeholder="MM"
              required={true}
              value=""
              onChange={handleChange}
            />
            <input
              id="dob_year"
              type="number"
              name="dob_year"
              placeholder="YY"
              required={true}
              value=""
              onChange={handleChange}
            />
          </section>
        </form>
      </div>
    </>
  );
};
