import { useSkills } from "../context/SkillContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function SkillList() {
  const { skills, deleteSkill } = useSkills();
  const { user } = useAuth();

  // Only show skills for the logged-in user
  const userSkills = skills.filter((skill) => skill.userID === user?.userID);

  return (
    <div>
      <h2>Your Skills</h2>
      {userSkills.length === 0 ? (
        <p>No skills found. Start by adding one!</p>
      ) : (
        <ul>
          {userSkills.map((skill) => (
            <li key={skill.id}>
              <strong>{skill.name}</strong> – {skill.status} – {skill.category}{" "}
              <Link to={`/edit/${skill.id}`}>Edit</Link>
              <button onClick={() => deleteSkill(skill.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SkillList;
