// import { useSkills } from "../context/SkillContext";
// import { Link } from "react-router-dom";
// import SkillCard from "../components/SkillCard";

//  function SkillList() {
//   const { skills, deleteSkill } = useSkills();

//   return (
//     <div className="skill-page">
//       <h2>All Skills</h2>
//       <ul>
//         {skills.map((skill) => (
//           <li key={skill.id}>
//             <strong>{skill.name}</strong> – {skill.status} – {skill.category}
//             <Link to={`/edit/${skill.id}`}>Edit</Link>
//             <button onClick={() => deleteSkill(skill.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
    
//   );
// }
// export default SkillList;
import { useSkills } from "../context/SkillContext";
import SkillCard from "../components/SkillCard";

function SkillList() {
  const { skills, deleteSkill } = useSkills();

  return (
    <div className="skill-page">
      <h2>All Skills</h2>

      {skills.length === 0 ? (
        <p>No skills yet.</p>
      ) : (
        skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} onDelete={deleteSkill} />
        ))
      )}
    </div>
  );
}

export default SkillList;
