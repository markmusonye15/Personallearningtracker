import { useSkills } from "../context/SkillContext";
import { Link } from "react-router-dom";

 function SkillList() {
  const { skills, deleteSkill } = useSkills();

  return (
    <div>
      <h2>All Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            <strong>{skill.name}</strong> – {skill.status} – {skill.category}
            <Link to={`/edit/${skill.id}`}>Edit</Link>
            <button onClick={() => deleteSkill(skill.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SkillList;