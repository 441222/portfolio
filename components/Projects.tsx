import React from 'react';
import NeumoCard from './NeumoCard';
import ProjectCard from './ProjectCard';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface Project {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description: string;
    images: { fields: { file: { url: string } } }[];
    link: string;
    docswellLink: string; // 追加されたフィールド
    technologiesUsed: string[];
    date: string;
    videos: string[];
  };
}

interface ProjectsProps {
  projects?: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <NeumoCard className="p-8">
      <h1 className="text-2xl font-bold mb-8">
        Works
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.sys.id} project={project} settings={settings} />
        ))}
      </div>
    </NeumoCard>

    
  );
};

export default Projects;
