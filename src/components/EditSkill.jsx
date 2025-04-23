import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSkills } from "../context/SkillContext";

 function EditSkill() {
  const { id } = useParams();
  const { skills, updateSkill } = useSkills();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const skill = skills.find((s) => s.id === parseInt(id));
    if (skill) setForm(skill);
  }, [id, skills]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSkill(form);
    navigate("/skills");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} required />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Not Started</option>
        <option>Learning</option>
        <option>Mastered</option>
      </select>
      <textarea name="notes" value={form.notes} onChange={handleChange} />
      <button type="submit">Update Skill</button>
    </form>
  );
}
export default EditSkill;