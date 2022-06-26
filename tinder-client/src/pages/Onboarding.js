import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Nav } from "../components/Nav";

export const Onboarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    last_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "Man",
    gender_interest: "Man",
    url: "",
    about: "",
    matches: [],
  });

  const previewImage = () => {
    const img = document.getElementById("url").files[0];
    let reader = new FileReader();
    let image = document.getElementById("preview_pic");
    // console.log(formData.url);
    image.title = img.name;

    reader.onload = (event) => {
      image.src = event.target.result;
    };
    reader.readAsDataURL(img);
  };

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      const fd = new FormData();
      const img = document.getElementById("url").files[0];
      fd.append("formData", JSON.stringify(formData));
      fd.append("imageData", img);

      const response = await axios.put(`http://localhost:8000/user`, fd);
      console.log(response.data);
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (e) => {
    const name = e.target.name;
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    // console.log("Name: " + name + ", value: " + value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "url") {
      // setFormData((prev) => ({
      //   ...prev,
      //   url: true,
      // }));
      previewImage();
    }

    // console.log(value);
  };

  // console.log(formData);

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
              value={formData.first_name}
              onChange={handleChange}
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Last Name"
              required={true}
              value={formData.last_name}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man_gender_identity"
                type="radio"
                name="gender_identity"
                value="Man"
                onChange={handleChange}
                checked={formData.gender_identity === "Man"}
              />
              <label htmlFor="man_gender_identity">Man</label>
              <input
                id="woman_gender_identity"
                type="radio"
                name="gender_identity"
                value="Woman"
                onChange={handleChange}
                checked={formData.gender_identity === "Woman"}
              />
              <label htmlFor="woman_gender_identity">Woman</label>
              <input
                id="more_gender_identity"
                type="radio"
                name="gender_identity"
                value="More"
                onChange={handleChange}
                checked={formData.gender_identity === "More"}
              />
              <label htmlFor="more_gender_identity">More</label>
            </div>
            <label htmlFor="show_gender">Show gender on my profile</label>
            <input
              id="show_gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                id="man_gender_interest"
                type="radio"
                name="gender_interest"
                value="Man"
                onChange={handleChange}
                checked={formData.gender_interest === "Man"}
              />
              <label htmlFor="man_gender_interest">Man</label>
              <input
                id="woman_gender_interest"
                type="radio"
                name="gender_interest"
                value="Woman"
                onChange={handleChange}
                checked={formData.gender_interest === "Woman"}
              />
              <label htmlFor="woman_gender_interest">Woman</label>
              <input
                id="everyone_gender_interest"
                type="radio"
                name="gender_interest"
                value="Everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "Everyone"}
              />
              <label htmlFor="everyone_gender_interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>
          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="file"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              <img id="preview_pic" alt="Profile Picture Preview" />
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
