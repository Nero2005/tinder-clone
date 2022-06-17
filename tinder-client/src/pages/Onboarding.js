import { useState } from "react";
import { Nav } from "../components/Nav";

export const Onboarding = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "Man",
    gender_interest: "Man",
    email: "",
    url: "",
    about: "",
    matches: [],
  });

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = (e) => {
    console.log("submitted");
  };

  const handleChange = async (e) => {
    const name = e.target.name;
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    // console.log("Name: " + name + ", value: " + value);
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImage = async (e) => {
    let value;
    const img = document.getElementById("url").files[0];
    try {
      // toBase64(img).then((data) => {
      //   value = data;
      // });
      value = await toBase64(img);
      // const img_container =
      //   document.getElementsByClassName("photo-container")[0];
      let reader = new FileReader();
      let image = document.getElementById("preview_pic");
      image.title = img.name;
      // image.id = "preview_pic";
      // image.setAttribute("width", "100px");
      // image.alt = "Profile Picture Preview";
      // image.setAttribute("height", "100px");
      // image.height = 30;
      // image.width = 30;
      reader.onload = (event) => {
        image.src = event.target.result;
      };
      reader.readAsDataURL(img);
      // image.src = base64toBlob(value, "image/jpg");
      // img_container.appendChild(image);
      setFormData((prev) => ({
        ...prev,
        url: value,
      }));
    } catch (err) {
      console.error(err);
      return;
    }
  };

  console.log(formData);

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
              onChange={handleImage}
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
