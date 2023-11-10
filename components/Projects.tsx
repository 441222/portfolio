import React, { CSSProperties } from 'react';
import NeumoCard from './NeumoCard';
import RandomFontText from '../components/RandomFontText';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  const getYoutubeEmbedUrl = (url: string) => {
    const regExpMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&#?]*).*/);
    return regExpMatch ? `https://www.youtube.com/embed/${regExpMatch[1]}` : url;
  };

  const renderDescriptionWithLineBreaks = (description: string) => {
    return description.split('\n').map((text, index) => (
      <span key={index}>
        {text}
        <br />
      </span>
    ));
  };

  return (
    <NeumoCard className="p-8">
      <h1 className="text-2xl font-bold mb-8">
        <RandomFontText>Works</RandomFontText>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.sys.id} className="flex flex-col">
            <NeumoCard className="flex-1 p-6 flex flex-col">
              {(project.fields.images?.length > 0 || project.fields.videos?.length > 0) && (
                <Slider {...settings}>
                  {project.fields.images?.map((image, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: '20px' }}>
                      <img
                        src={image.fields.file.url.startsWith('http') ? image.fields.file.url : `https:${image.fields.file.url}`}
                        alt={project.fields.title}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </div>
                  ))}
                  {project.fields.videos?.map((video, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                      <iframe
                        width="100%"
                        height="360"
                        src={getYoutubeEmbedUrl(video)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`video-${index}`}
                      ></iframe>
                    </div>
                  ))}
                </Slider>
              )}
              <div className="flex flex-row justify-between items-center mb-4"></div>
              <h2 className="text-xl mb-8">
                <RandomFontText>{project.fields.title}</RandomFontText>
              </h2>
              <div className="mb-4">
                <RandomFontText>
                  {renderDescriptionWithLineBreaks(project.fields.description)}
                </RandomFontText>
              </div>
              <ul className="mb-4">
                {project.fields.technologiesUsed?.map((tech, techIndex) => (
                  <li key={techIndex} className="inline-block mr-4 bg-glass-bg shadow-glass backdrop-blur border border-neumo-border px-3 py-1 rounded-md text-sm text-gray-900">
                    <RandomFontText>{tech}</RandomFontText>
                  </li>
                ))}
              </ul>
              {project.fields.link && (
                <a
                  href={project.fields.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <RandomFontText>View Project</RandomFontText>
                </a>
              )}
            </NeumoCard>
          </div>
        ))}
      </div>
    </NeumoCard>
  );
};

export default Projects;
