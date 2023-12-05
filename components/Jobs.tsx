import React, { useState, CSSProperties } from 'react';
import NeumoCard from './NeumoCard';
import RandomFontText from './RandomFontText';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import JobCard from './JobCard';
import NeumoButton from './NeumoButton'; 

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

export interface Job {
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

interface JobsProps {
  jobs?: Job[];
}

const Jobs: React.FC<JobsProps> = ({ jobs = [] }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const verifyPassword = () => {
    if (password === 'ootanl') {
      setIsAuthorized(true);
    } else {
      alert('Incorrect password!');
    }
  };

  return (
    <NeumoCard className="p-8">
      <h1 className="text-2xl font-bold mb-8">
        <RandomFontText>Job Works</RandomFontText>
      </h1>
      {!isAuthorized ? (
        <div className="flex flex-col items-center space-y-4">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            className=" p-3 rounded-xl bg-glass-bg border border-neumo-border backdrop-blur shadow-inset-neumo focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <NeumoButton onClick={verifyPassword}>
            <RandomFontText>Submit</RandomFontText>
          </NeumoButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <JobCard key={job.sys.id} job={job} settings={settings} />
          ))}
        </div>
      )}
    </NeumoCard>
  );
};

export default Jobs;
