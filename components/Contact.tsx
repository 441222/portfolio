import NeumoCard from './NeumoCard';

const Contact: React.FC = () => {
  return (
    <NeumoCard>
      <h2 className="text-xl font-bold mb-4">Contact</h2>
      <p>以下のメールアドレスで連絡を取ることができます:</p>
      <a href="mailto:john.doe@example.com" className="underline">john.doe@example.com</a>
    </NeumoCard>
  );
}

export default Contact;
