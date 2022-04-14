import { useState } from 'react';
import { getProjects } from '../utils';

export function Projects() {
  const [projects, setProjects] = useState<
    { id: number; name: string; http_url_to_repo: string }[]
  >([]);

  return (
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={async () => {
          const projects = await getProjects();

          setProjects(projects.data);
        }}
      >
        Load Projects
      </button>

      <ul>
        {projects.map(({ id, name, http_url_to_repo }) => (
          <li key={id}>
            <a href={http_url_to_repo}>{name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
