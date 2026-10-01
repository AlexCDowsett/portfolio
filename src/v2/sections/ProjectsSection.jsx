import { useState } from 'react';
import { projects } from '../data/projects.js';
import { ProjectRoom } from '../components/ProjectRoom.jsx';

export function ProjectsSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const project = projects[selectedIndex];
    const move = (direction) => setSelectedIndex((index) => (index + direction + projects.length) % projects.length);

    return (
        <section className="v2-section v2-work-section" id="work" aria-labelledby="v2-work-title">
            <div className="v2-shell">
                <div className="v2-work-heading">
                    <div className="v2-section-heading">
                        <p className="v2-eyebrow">Projects <span className="v2-heading-rule" /></p>
                        <h2 id="v2-work-title">A desk full<br /><span>of different ideas.</span></h2>
                    </div>
                    <p className="v2-work-intro">A research tool, a radio, a doorbell, a calculator. Pick a screen and have a look around.</p>
                </div>

                <div className="v2-room-layout">
                    <ProjectRoom selectedIndex={selectedIndex} />
                    <article className="v2-room-project" aria-live="polite" aria-atomic="true">
                        <p className="v2-room-meta">{project.year} <span>·</span> {String(selectedIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</p>
                        <h3>{project.title}</h3>
                        <p className="v2-room-summary">{project.summary}</p>
                        <p className="v2-room-detail">{project.detail}</p>
                        <ul className="v2-tags" aria-label="Tools and technologies">
                            {project.stack.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                        <div className="v2-room-actions">
                            <a href={project.href} target="_blank" rel="noreferrer">{project.href.includes('youtube.com') ? 'Watch the radio' : 'See the project'} <span aria-hidden="true">↗</span></a>
                            <div className="v2-room-arrows">
                                <button type="button" onClick={() => move(-1)} aria-label="Previous project">←</button>
                                <button type="button" onClick={() => move(1)} aria-label="Next project">→</button>
                            </div>
                        </div>
                        <div className="v2-project-picker" role="group" aria-label="Choose a project">
                            {projects.map((item, index) => (
                                <button key={item.id} type="button" aria-label={`${index + 1}: ${item.title}`} aria-pressed={index === selectedIndex} onClick={() => setSelectedIndex(index)}>
                                    <span>{String(index + 1).padStart(2, '0')}</span>{item.title}
                                </button>
                            ))}
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
