import { myProjects } from '../../constants/index.js';
import { ProjectCard } from '../components/ProjectCard.jsx';

export function ProjectsSection() {
    return (
        <section className="v2-section v2-work-section" id="work" aria-labelledby="v2-work-title">
            <div className="v2-shell">
                <div className="v2-work-heading">
                    <div className="v2-section-heading">
                        <p className="v2-eyebrow">Selected work <span className="v2-heading-rule" /></p>
                        <h2 id="v2-work-title">A few things<br /><span>I’ve put into the world.</span></h2>
                    </div>
                    <p className="v2-work-intro">A mix of personal builds, research tools, and experiments. Each one taught me something new.</p>
                </div>
                <div className="v2-project-grid">
                    {myProjects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} total={myProjects.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}
