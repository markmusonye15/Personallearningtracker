import { createContext, useContext, useState, useEffect } from "react";

const SkillContext = createContext();

 function SkillProvider({ children }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  const addSkill = (skill) => {
    fetch("http://localhost:3000/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    })
      .then((res) => res.json())
      .then((newSkill) => setSkills([...skills, newSkill]));
  };

  const updateSkill = (updatedSkill) => {
    fetch(`http://localhost:3000/skills/${updatedSkill.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSkill),
    }).then(() =>
      setSkills(
        skills.map((s) => (s.id === updatedSkill.id ? updatedSkill : s))
      )
    );
  };

  const deleteSkill = (id) => {
    fetch(`http://localhost:3000/skills/${id}`, { method: "DELETE" }).then(() =>
      setSkills(skills.filter((s) => s.id !== id))
    );
  };

  return (
    <SkillContext.Provider
      value={{ skills, addSkill, updateSkill, deleteSkill }}
    >
      {children}
    </SkillContext.Provider>
  );
}

 function useSkills() {
  return useContext(SkillContext);
}
export default { SkillProvider, useSkills };