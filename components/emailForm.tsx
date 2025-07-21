// components/EmailForm.tsx
'use client';

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Magnetic from './magnetic';

const SERVICE_ID = 'service_1wla66q';
const TEMPLATE_ID = 'template_rplxxfo';
const PUBLIC_KEY = 'rQm6eiIPSZE2anNPR'; //please do not blow up my email

const EmailForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
        console.log('✅ Email sent:', result.text);
        alert('Message sent!');
        formRef.current?.reset();
      })
      .catch((error) => {
        console.error('❌ Email error:', error.text);
        alert('Failed to send message.');
      });
  };

  return (
    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="Your Name"
        className="border-black/20 focus:border-black transition-colors"
      />
      <Input
        name="email"
        type="email"
        placeholder="Your Email"
        className="border-black/20 focus:border-black transition-colors"
      />
      <Textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        className="border-black/20 focus:border-black transition-colors resize-none"
      />
      <Magnetic>
        <Button
          className="w-full bg-black hover:bg-black/90 text-white py-6 text-lg font-medium"
          data-cursor="button"
        >
          Send Message
        </Button>
      </Magnetic>
    </form>
  );
};

export default EmailForm;
