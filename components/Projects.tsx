import React, { CSSProperties } from 'react';
import NeumoCard from './NeumoCard';
import RandomFontText from '../components/RandomFontText';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectCard from './ProjectCard'; // Import the ProjectCard component

interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

function NextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block', right: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      →
    </div>
  );
}

function PrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block', left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      ←
    </div>
  );
}

export interface Project {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description: string;
    images: { fields: { file: { url: string; }; }; }[];
    link: string;
    technologiesUsed: string[];
    date: string;
    videos: string[];
    docswellLink?: string;
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
    prevArrow: <PrevArrow />
  };

  return (
    <NeumoCard className="p-8">
      <h1 className="text-2xl font-bold mb-8">
        <RandomFontText>Personal Works</RandomFontText>
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
