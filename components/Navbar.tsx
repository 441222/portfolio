import NeumoButton from './NeumoButton';

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-neumo shadow-neumo-out mb-10">
      <div className="font-bold text-xl">John Doe</div>
      <div className="space-x-4">
        <NeumoButton>About</NeumoButton>
        <NeumoButton>Projects</NeumoButton>
        <NeumoButton>Contact</NeumoButton>
      </div>
    </div>
  );
}

export default Navbar;
