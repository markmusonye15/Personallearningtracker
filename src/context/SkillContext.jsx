import { createContext, useContext, useState, useEffect } from "react";

const SkillContext = createContext();

export function SkillProvider({ children }) {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:4000/skills?userID=$currentUserID");
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const addSkill = async (skill) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skill),
      });
      if (!res.ok) throw new Error("Failed to add skill");
      const newSkill = await res.json();
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      return newSkill;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

 const updateSkill = async (id, updatedSkillData) => {
   id = Number(id); 
   setIsLoading(true);
   setError(null);
   try {
     const response = await fetch(`http://localhost:4000/skills/${id}`, {
       method: "PATCH",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(updatedSkillData),
     });
     if (!response.ok) throw new Error("Update failed");

     const updatedFromServer = await response.json();

     setSkills((skills) =>
       skills.map((skill) =>
         skill.id === id ? { ...skill, ...updatedFromServer } : skill
       )
     );

      return updatedFromServer;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSkill = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:4000/skills/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete skill");
      setSkills((prevSkills) => prevSkills.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SkillContext.Provider
      value={{ skills, addSkill, updateSkill, deleteSkill, isLoading, error }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export function useSkills() {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error("useSkills must be used within a SkillProvider");
  }
  return context;
}
