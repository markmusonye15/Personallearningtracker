


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSkills } from "../context/SkillContext";

function EditSkill() {
  const { id } = useParams();
  const { updateSkill } = useSkills(); // we only need the update method here
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    status: "Not Started",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSkill() {
      try {
        const res = await fetch(`http://localhost:3001/skills/${id}`);
        if (!res.ok) throw new Error("Skill not found");

        const data = await res.json();
        setForm(data);
        setIsLoading(false);
      } catch (err) {
        alert("Skill not found");
        navigate("/skills");
      }
    }

    fetchSkill();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSkill(parseInt(id), form);
      navigate("/skills");
    } catch (error) {
      alert("Failed to update skill");
    }
  };

  if (isLoading) return <div>Loading...</div>;

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
        <option value="Not Started">Not Started</option>
        <option value="Learning">Learning</option>
        <option value="Mastered">Mastered</option>
      </select>
      <textarea name="notes" value={form.notes} onChange={handleChange} />
      <button type="submit">Update Skill</button>
    </form>
  );
}

export default EditSkill;
