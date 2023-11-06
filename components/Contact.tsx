import NeumoCard from './NeumoCard';
import RandomFontText from '../components/RandomFontText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin, faGithub, faSquareBehance } from '@fortawesome/free-brands-svg-icons';
import ContactForm from './ContactForm';


const Contact: React.FC = () => {
  return (
    <NeumoCard className="p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-3xl font-semibold mb-4"><RandomFontText>Contact</RandomFontText></h2>
      <div className="mb-6">
        <p className="mb-2"><RandomFontText>お気軽にご連絡ください:</RandomFontText></p>
        <a href="mailto:john.doe@example.com" className="underline"><RandomFontText>john.doe@example.com</RandomFontText></a>
      </div>

      <NeumoCard className="p-6 rounded-lg shadow-md bg-white">
        <ContactForm />
      </NeumoCard>

      <div className="mt-10"></div>

      <div className="flex space-x-4">
        {/* 各SNSのリンクとアイコン */}
        <a href="https://twitter.com/haetoribachi" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.facebook.com/yoshiyuki.ohtani.10" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://github.com/441222" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>        
      </div>
    </NeumoCard>
  );
}

export default Contact;
