import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { token } from "../../config";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL

const Profile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      password: doctorData?.password,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQualifications = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "PHD",
      university: "Mercy Hospital",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };

  const deleteQualifications = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const addExperiences = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "Senior Surgeon",
      hospital: "Mercy Hospital",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const deleteExperiences = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const addTimeSlots = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "Sunday",
      startingTime: "10:00",
      endingTime: "04:30",
    });
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };

  const deleteTimeSlots = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <div>
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
          Profile Information
        </h2>
        <form onSubmit={updateProfileHandler}>
          <div className="mb-5">
            <p className="form_label">Name*</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="form_input"
            />
          </div>
          <div className="mb-5">
            <p className="form_label">Email*</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="form_input"
              readOnly
              aria-readonly
              disabled={true}
            />
          </div>
          <div className="mb-5">
            <p className="form_label">Phone*</p>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="form_input"
            />
          </div>
          <div className="mb-5">
            <p className="form_label">Bio*</p>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Bio"
              className="form_input"
              maxLength={100}
            />
          </div>

          <div className="mb-5">
            <div className="grid grid-cols-3 gap-5 mb-[30px]">
              <div>
                <p className="form_label">Gender*</p>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form_input py-3.5"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <p className="form_label">Specialization*</p>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="form_input py-3.5"
                >
                  <option value="">Select</option>
                  <option value="surgeon">Surgeon</option>
                  <option value="neurologist">Neurologist</option>
                  <option value="dermatologist">Dermatologist</option>
                </select>
              </div>

              <div>
                <p className="form_label">Ticket Price</p>
                <input
                  type="number"
                  placeholder="100"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  className="form_input"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <p className="form_label">Qualifications*</p>
            {formData.qualifications?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form_label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form_input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form_label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form_input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <p className="form_label">Degree*</p>
                      <input
                        type="text"
                        name="degree"
                        value={item.degree}
                        className="form_input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form_label">University*</p>
                      <input
                        type="text"
                        name="university"
                        value={item.university}
                        className="form_input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteQualifications(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addQualifications}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Qualification
            </button>
          </div>

          <div className="mb-5">
            <p className="form_label">Experiences*</p>
            {formData.experiences?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form_label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form_input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form_label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form_input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <p className="form_label">Position*</p>
                      <input
                        type="text"
                        name="position"
                        value={item.position}
                        className="form_input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form_label">Hospital*</p>
                      <input
                        type="text"
                        name="hospital"
                        value={item.hospital}
                        className="form_input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteExperiences(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addExperiences}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Experience
            </button>
          </div>

          <div className="mb-5">
            <p className="form_label">Time Slots*</p>
            {formData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                    <div>
                      <p className="form_label">Day*</p>
                      <select
                        name="day"
                        value={item.day}
                        className="form_input py-3.5"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      >
                        <option value="">Select</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                      </select>
                    </div>
                    <div>
                      <p className="form_label">Starting Time*</p>
                      <input
                        type="time"
                        name="startingTime"
                        value={item.startingTime}
                        className="form_input"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form_label">Ending Time*</p>
                      <input
                        type="time"
                        name="endingTime"
                        value={item.endingTime}
                        className="form_input"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      />
                    </div>
                    <div className="flex items-center">
                      <button
                        className="bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6"
                        onClick={(e) => deleteTimeSlots(e, index)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
              onClick={addTimeSlots}
            >
              Add Time Slots
            </button>
          </div>

          <div className="mb-5">
            <p className="form_label">About*</p>
            <textarea
              name="about"
              rows={5}
              value={formData.about}
              placeholder="Write about you"
              onChange={handleInputChange}
              className="form_input"
            ></textarea>
          </div>

          <div className="mb-5 flex items-center gap-3">
            {formData.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img
                  src={formData.photo}
                  alt="avatar"
                  className="w-full rounded-full"
                />
              </figure>
            )}

            <div className="relative w-[160px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              >
                Upload Photo
              </label>
            </div>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
