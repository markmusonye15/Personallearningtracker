import { useState } from "react";
import { useSkills } from "../context/SkillContext";
import { useNavigate } from "react-router-dom";

 function AddSkill() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    status: "Not Started",
    notes: "",
  });
  const { addSkill } = useSkills();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    addSkill(form);
    navigate("/skills");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        required
      />
      <select name="status" onChange={handleChange}>
        <option>Not Started</option>
        <option>Learning</option>
        <option>Mastered</option>
      </select>
      <textarea name="notes" placeholder="Notes" onChange={handleChange} />
      <button type="submit">Add Skill</button>
    </form>
  );
}
export default AddSkill;