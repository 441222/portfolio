import React from 'react';
import NeumoCard from './NeumoCard';
import RandomFontText from '../components/RandomFontText';
import Slider from 'react-slick';
import { Project } from './Projects';

interface ProjectCardProps {
  project: Project;
  settings: any; // Define a more specific type for settings if needed
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, settings }) => {
  const getYoutubeEmbedUrl = (url: string) => {
    let regExpMatch;
    if (url.includes('list=')) { // Check if it's a playlist URL
      regExpMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]list=)|youtu\.be\/)([^?&"'>]+)/);
      return regExpMatch ? `https://www.youtube.com/embed/videoseries?list=${regExpMatch[1]}` : url;
    } else { // Regular YouTube video URL
      regExpMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&#?]*).*/);
      return regExpMatch ? `https://www.youtube.com/embed/${regExpMatch[1]}` : url;
    }
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
    <div className="flex flex-col">
      <NeumoCard className="flex-1 p-6 flex flex-col">
        {(project.fields.images?.length > 0 || project.fields.videos?.length > 0 || project.fields.docswellLink) && (
          <Slider {...settings}>
            {project.fields.images?.map((image, index) => (
              <div key={index} className="flex justify-center items-center overflow-hidden mb-4" style={{ maxHeight: '500px' }}>
                <img
                  src={image.fields.file.url.startsWith('http') ? image.fields.file.url : `https:${image.fields.file.url}`}
                  alt={project.fields.title}
                  style={{ maxWidth: '100%', maxHeight: '400px', display: 'block', margin: 'auto' }}
                />
              </div>
            ))}
            {project.fields.videos?.map((video, index) => (
              <div key={index} className="flex justify-center items-center overflow-hidden">
                <iframe
                  width="100%"
                  height="400"
                  src={getYoutubeEmbedUrl(video)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`video-${index}`}
                ></iframe>
              </div>
            ))}
            {project.fields.docswellLink && (
              <div className="flex justify-center items-center overflow-hidden">
                <iframe
                  className="docswell-iframe"
                  style={{
                    border: '1px solid #ccc',
                    display: 'block',
                    margin: '0 auto',
                    padding: '0',
                    width: '100%', 
                    height: '400px',
                    maxWidth: '620px'
                  }}
                  src={project.fields.docswellLink}
                  frameBorder="0"
                  allowFullScreen
                  scrolling="no" 
                  title="docswell-content"
                ></iframe>
              </div>
            )}
          </Slider>
        )}
        <div className="flex flex-row justify-between items-center mb-4">

        </div>
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
  );
};

export default ProjectCard;
