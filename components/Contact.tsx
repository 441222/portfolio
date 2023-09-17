import NeumoCard from './NeumoCard';
import RandomFontText from '../components/RandomFontText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Contact: React.FC = () => {
  return (
    <NeumoCard className="p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-3xl font-semibold mb-4"><RandomFontText>Contact</RandomFontText></h2>
      <div className="mb-6">
        <p className="mb-2"><RandomFontText>お気軽にご連絡ください:</RandomFontText></p>
        <a href="mailto:john.doe@example.com" className="underline"><RandomFontText>john.doe@example.com</RandomFontText></a>
      </div>

      <div className="flex space-x-4">
        {/* 各SNSのリンクとアイコン */}
        <a href="https://twitter.com/YourTwitterProfile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.facebook.com/YourFacebookProfile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.instagram.com/YourInstagramProfile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.linkedin.com/in/YourLinkedInProfile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
    </NeumoCard>
  );
}

export default Contact;
