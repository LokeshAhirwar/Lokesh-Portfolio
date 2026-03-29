'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Github, Linkedin, Code2, Mail, Phone, MapPin } from 'lucide-react';
import { submitMessage } from '@/lib/queries';
import SectionHeader from '@/components/SectionHeader';
import styles from './contact.module.css';

const SOCIAL_LINKS = [
  {
    id: 'contact-github',
    href: 'https://github.com/LokeshAhirwar',
    icon: Github,
    label: 'GitHub',
    sub: 'github.com/LokeshAhirwar',
  },
  {
    id: 'contact-linkedin',
    href: 'https://www.linkedin.com/in/lokesh-ahirwar-profile/',
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'linkedin.com/in/lokesh-ahirwar-profile',
  },
  {
    id: 'contact-leetcode',
    href: 'https://leetcode.com/u/Lokesh-Ahirwar/',
    icon: Code2,
    label: 'LeetCode',
    sub: 'leetcode.com/u/Lokesh-Ahirwar',
  },
];

const INFO_ITEMS = [
  { icon: Mail, label: 'Email', value: 'lokeshahirwar576@gmail.com', href: 'mailto:lokeshahirwar576@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9009850216', href: 'tel:+919009850216' },
  { icon: MapPin, label: 'Location', value: 'Bhopal, Madhya Pradesh, India', href: null },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;

    setFormState('loading');
    const result = await submitMessage(form);

    if (result.success) {
      setFormState('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } else {
      setFormState('error');
      setErrorMsg(result.error ?? 'Something went wrong.');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <SectionHeader
          label="// Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project idea, want to collaborate, or just want to say hi? My inbox is always open."
          centered
        />

        <div className={styles.grid}>
          {/* Left: Info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contact Information</h3>
              <div className={styles.infoList}>
                {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className={styles.infoLabel}>{label}</p>
                      {href ? (
                        <a href={href} className={styles.infoValue}>
                          {value}
                        </a>
                      ) : (
                        <p className={styles.infoValue}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.divider} />

              <h4 className={styles.socialTitle}>Find Me On</h4>
              <div className={styles.socials}>
                {SOCIAL_LINKS.map(({ id, href, icon: Icon, label, sub }) => (
                  <a
                    key={id}
                    id={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialItem}
                  >
                    <div className={styles.socialIcon}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className={styles.socialLabel}>{label}</p>
                      <p className={styles.socialSub}>{sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {formState === 'success' ? (
              <div className={styles.successState}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={64} className={styles.successIcon} />
                </motion.div>
                <h3>Message Sent!</h3>
                <p>
                  Thanks for reaching out! I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  className="btn btn-ghost"
                  onClick={() => setFormState('idle')}
                  id="contact-send-another"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                id="contact-form"
                noValidate
              >
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      className={styles.input}
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className={styles.input}
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-subject" className={styles.label}>
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    className={styles.input}
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project, idea, or just say hi..."
                    className={styles.textarea}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {formState === 'error' && (
                  <p className={styles.errorMsg}>⚠ {errorMsg}</p>
                )}

                <button
                  type="submit"
                  id="contact-submit"
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={formState === 'loading'}
                >
                  {formState === 'loading' ? (
                    <>
                      <span className={styles.spinner} /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
