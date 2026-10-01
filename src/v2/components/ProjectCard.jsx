export function ProjectCard({ project, index, total }) {
    const projectNumber = String(index + 1).padStart(2, '0');
    const tags = project.tags.slice(0, 4);

    return (
        <article className="v2-project-card">
            <a
                className="v2-project-visual"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title}`}
            >
                <img className="v2-project-spotlight" src={project.spotlight} alt="" loading="lazy" />
                <div className="v2-project-window">
                    <span className="v2-project-window-top"><i /><i /><i /><small>PROJECT_{projectNumber}</small></span>
                    <div className="v2-project-glyph" aria-hidden="true">{project.title.slice(0, 1)}</div>
                    <span className="v2-project-open" aria-hidden="true">↗</span>
                </div>
                <span className="v2-project-index">{projectNumber} / {String(total).padStart(2, '0')}</span>
            </a>
            <div className="v2-project-details">
                <div className="v2-project-title-row">
                    <h3>{project.title}</h3>
                    <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} in a new tab`}>↗</a>
                </div>
                <p>{project.desc}</p>
                <ul className="v2-tags" aria-label="Technologies used">
                    {tags.map((tag) => <li key={`${project.title}-${tag.id}-${tag.name}`}>{tag.name}</li>)}
                </ul>
            </div>
        </article>
    );
}
