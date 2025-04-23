// import { createContext, useContext, useState, useEffect } from "react";
// const SkillContext = createContext();

// export function SkillProvider({ children }) {
//   const [skills, setSkills] = useState([]);

    
  
//   useEffect(() => {
//     fetch("http://localhost:3000/skills")
//       .then((res) => res.json())
//       .then((data) => setSkills(data));
//   }, []);

//   const addSkill = (skill) => {
//     fetch("http://localhost:3000/skills", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(skill),
//     })
//       .then((res) => res.json())
//       .then((newSkill) => {
//         // Use functional update to avoid stale state
//         setSkills((prevSkills) => [...prevSkills, newSkill]);
//         return newSkill;
//       })
//       .catch((error) => console.error("Add skill error:", error));
//   };

//   const updateSkill = (updatedSkill) => {
//     fetch(`http://localhost:3000/skills/${updatedSkill.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedSkill),
//     })
//       .then(() => {
//         // Use functional update to ensure fresh state
//         setSkills((prevSkills) =>
//           prevSkills.map((s) => (s.id === updatedSkill.id ? updatedSkill : s))
//         );
//       })
//       .catch((error) => console.error("Update skill error:", error));
//   };

//   const deleteSkill = (id) => {
//     fetch(`http://localhost:3000/skills/${id}`, {
//       method: "DELETE",
//     }).then(() => {
//       // Keep functional update for consistency
//       setSkills((prevSkills) => prevSkills.filter((s) => s.id !== id));
//     });
//   };

//   return (
//     <SkillContext.Provider
//       value={{ skills, addSkill, updateSkill, deleteSkill }}
//     >
//       {children}
//     </SkillContext.Provider>
//   );
// }

import { createContext, useContext, useState, useEffect } from "react";
const SkillContext = createContext();

export function SkillProvider({ children }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  const addSkill = (skill) => {
    return fetch("http://localhost:3000/skills", {
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

  const updateSkill = (updatedSkill) => {
    return fetch(`http://localhost:3000/skills/${updatedSkill.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSkill),
    }).then(() => {
      setSkills((prevSkills) =>
        prevSkills.map((s) => (s.id === updatedSkill.id ? updatedSkill : s))
      );
      return updatedSkill;
    });
  };

  const deleteSkill = (id) => {
    fetch(`http://localhost:3000/skills/${id}`, {
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