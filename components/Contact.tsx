import NeumoCard from './NeumoCard';
import RandomFontText from '../components/RandomFontText';

const Contact: React.FC = () => {
  return (
    <NeumoCard>
      <h2 className="text-xl font-bold mb-4"><RandomFontText>Contact</RandomFontText></h2>
      <p><RandomFontText>以下のメールアドレスで連絡を取ることができます:</RandomFontText></p>
      <a href="mailto:john.doe@example.com" className="underline"><RandomFontText>john.doe@example.com</RandomFontText></a>
    </NeumoCard>
  );
}

export default Contact;
