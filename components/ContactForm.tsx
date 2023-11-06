// ContactForm.tsx
import React, { useState } from 'react';
import NeumoButton from './NeumoButton';

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Formcakeのエンドポイントを設定
  const FORMCAKE_ENDPOINT = "https://api.formcake.com/api/form/aa0d6318-450b-4c65-9dae-cc57d3065be7/submission"; // あなたのFormcakeエンドポイントURLに置き換えてください

  return (
    <form action={FORMCAKE_ENDPOINT} method="POST">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
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
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">お問い合わせ内容</label>
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
          送信
        </NeumoButton>
      </div>
    </form>
  );
};

export default ContactForm;
