import React, { useState } from 'react';
import NeumoCard from './NeumoCard';
import NeumoButtonLarge from './NeumoButtonLarge';
import { useSpring, animated } from 'react-spring';
import RandomFontText from '../components/RandomFontText';

export interface Project {
    sys: {
      id: string;
    };
    fields: {
      title: string;
      description: string;
      image: { fields: { file: { url: string } } };
      link: string;
      technologiesUsed: string[];
      date: string;
    };
}

interface ProjectsProps {
    projects?: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects = [] }) => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    const handleProjectClick = (id: string) => {
        setSelectedProjectId(prevId => (prevId === id ? null : id));
    };

    const expandAnimation = useSpring({
        opacity: selectedProjectId ? 1 : 0,
        height: selectedProjectId ? "auto" : 0,
        config: {
            tension: 170,
            friction: 26,
        },
    });

    return (
        <NeumoCard className="p-8">
            <h1 className="text-2xl font-bold mb-8"><RandomFontText>Works</RandomFontText></h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {projects.map((project, index) => (
                    <React.Fragment key={project.sys.id}>
                        <div className={`flex justify-center items-start`}>
                            <NeumoButtonLarge onClick={() => handleProjectClick(project.sys.id)} className="w-full h-32">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="w-3/4 h-2/3 overflow-hidden rounded-md">
                                        <img
                                            src={`https:${project.fields.image.fields.file.url}`}
                                            alt={project.fields.title}
                                            className="w-full h-full object-center object-cover"
                                        />
                                    </div>
                                    <span><RandomFontText>{project.fields.title}</RandomFontText></span>
                                </div>
                            </NeumoButtonLarge>
                            </div>
                                {selectedProjectId === project.sys.id && (
                                    <div className="col-span-4 flex justify-center">
                                        <animated.div style={expandAnimation} className="max-w-4xl w-full">
                                            <NeumoCard className="h-64 p-6">
                                        <div className="h-2/3 overflow-hidden rounded-md">
                                            <img
                                                src={`https:${project.fields.image.fields.file.url}`}
                                                alt={project.fields.title}
                                                className="w-full h-full object-center object-cover"
                                            />
                                        </div>
                                        <h2 className="text-xl mt-4 mb-4"><RandomFontText>{project.fields.title}</RandomFontText></h2>
                                        <p className="mb-4"><RandomFontText>{project.fields.description}</RandomFontText></p>
                                        <ul className="mb-4">
                                            {project.fields.technologiesUsed?.map((tech, techIndex) => (
                                                <li key={techIndex} className="inline-block mr-4 bg-stglass-bg shadow-glass backdrop-blur border border-neumo-border px-3 py-1 rounded-md text-sm text-gray-900">
                                                    <RandomFontText>
                                                        {tech}
                                                    </RandomFontText>
                                                </li>
                                            ))}
                                        </ul>
                                        <a
                                            href={project.fields.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline "
                                        >
                                            <RandomFontText>
                                                View Project
                                            </RandomFontText>
                                        </a>
                                    </NeumoCard>
                                </animated.div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </NeumoCard>
    );
};

export default Projects;
