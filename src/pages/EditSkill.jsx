
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSkills } from "../context/SkillContext";

// function EditSkill() {
//   const { id } = useParams();
//   const { skills, updateSkill } = useSkills();
//   const navigate = useNavigate();

//   const skillToEdit = skills.find((skill) => skill.id === parseInt(id));

//   const [form, setForm] = useState({
//     name: skillToEdit?.name || "",
//     category: skillToEdit?.category || "",
//     status: skillToEdit?.status || "Not Started",
//     notes: skillToEdit?.notes || "",
//   });

//   useEffect(() => {
//     if (skillToEdit) {
//       setForm(skillToEdit);
//     }
//   }, [skillToEdit]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateSkill({ ...form, id: parseInt(id) });
//       navigate("/skills");
//     } catch (error) {
//       console.error("Update failed:", error);
//     }
//   };

//   if (!skillToEdit) return <div>Loading...</div>;

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" value={form.name} onChange={handleChange} required />
//       <input
//         name="category"
//         value={form.category}
//         onChange={handleChange}
//         required
//       />
//       <select name="status" value={form.status} onChange={handleChange}>
//         <option value="Not Started">Not Started</option>
//         <option value="Learning">Learning</option>
//         <option value="Mastered">Mastered</option>
//       </select>
//       <textarea name="notes" value={form.notes} onChange={handleChange} />
//       <button type="submit">Update Skill</button>
//     </form>
//   );
// }

// export default EditSkill;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSkills } from "../context/SkillContext";

function EditSkill() {
  const { id } = useParams();
  const { skills, updateSkill } = useSkills();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize form state with proper structure
  const [form, setForm] = useState({
    name: "",
    category: "",
    status: "Not Started",
    notes: "",
  });

  useEffect(() => {
    if (skills.length > 0) {
      const skillToEdit = skills.find((skill) => skill.id === parseInt(id));
      if (skillToEdit) {
        setForm(skillToEdit);
        setIsLoading(false);
      }
    }
  }, [skills, id]);

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