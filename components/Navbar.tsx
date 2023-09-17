import NeumoButton from './NeumoButton';
import RandomFontText from '../components/RandomFontText';

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-neumo shadow-neumo-out mb-10">
      <div className="font-bold text-xl"><RandomFontText>John Doe</RandomFontText></div>
      <div className="space-x-2">
        <NeumoButton><RandomFontText>About</RandomFontText></NeumoButton>
        <NeumoButton><RandomFontText>Projects</RandomFontText></NeumoButton>
        <NeumoButton><RandomFontText>Contact</RandomFontText></NeumoButton>
      </div>
    </div>
  );
}

export default Navbar;
