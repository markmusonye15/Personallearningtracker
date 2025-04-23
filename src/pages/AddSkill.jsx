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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { addSkill } = useSkills();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await addSkill(form);
      navigate("/skills");
    } catch (err) {
      setError("Failed to add skill. Please try again.");
      console.error("Add skill error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Not Started">Not Started</option>
        <option value="Learning">Learning</option>
        <option value="Mastered">Mastered</option>
      </select>
      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Skill"}
      </button>
    </form>
  );
}

export default AddSkill;
