// ContactForm.tsx
import React, { useState } from 'react';
import NeumoButton from './NeumoButton';
import RandomFontText from '../components/RandomFontText';

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Formcakeのエンドポイントを設定
  const FORMCAKE_ENDPOINT = "https://api.formcake.com/api/form/aa0d6318-450b-4c65-9dae-cc57d3065be7/submission"; // あなたのFormcakeエンドポイントURLに置き換えてください

  return (
    <form action={FORMCAKE_ENDPOINT} method="POST">
      <div className="mb-4">
      <RandomFontText>メールアドレス</RandomFontText>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full p-2 rounded-xl bg-glass-bg border border-neumo-border backdrop-blur shadow-inset-neumo"
        />
      </div>

      <div className="mb-4">
        <RandomFontText>お問い合わせ内容</RandomFontText>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-1 block w-full p-2 rounded-xl bg-glass-bg border border-neumo-border backdrop-blur shadow-inset-neumo"
        />
      </div>

      <div className="mb-4 text-left">
        <NeumoButton type="submit">
          <RandomFontText>送信</RandomFontText>
        </NeumoButton>
      </div>
    </form>
  );
};

export default ContactForm;
