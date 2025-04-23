


import { createContext, useContext, useState, useEffect } from "react";
const SkillContext = createContext();

export function SkillProvider({ children }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  const addSkill = (skill) => {
    return fetch("http://localhost:3001/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    })
      .then((res) => res.json())
      .then((newSkill) => {
        setSkills((prevSkills) => [...prevSkills, newSkill]);
        return newSkill;
      });
  };

  // In SkillContext.jsx - Fix the updateSkill function
  const updateSkill = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3001/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Update failed");

      const updatedSkill = await response.json();

      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === id ? { ...skill, ...updatedSkill } : skill
        )
      );

      return updatedSkill;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  const deleteSkill = (id) => {
    fetch(`http://localhost:3001/skills/${id}`, {
      method: "DELETE",
    }).then(() => {
      setSkills((prevSkills) => prevSkills.filter((s) => s.id !== id));
    });
  };

  return (
    <SkillContext.Provider
      value={{ skills, addSkill, updateSkill, deleteSkill }}
    >
      {children}
    </SkillContext.Provider>
  );
}

// Move useSkills hook outside the Provider component
export function useSkills() {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error("useSkills must be used within a SkillProvider");
  }
  return context;
}