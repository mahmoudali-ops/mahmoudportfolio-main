import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { socialLinks } from '@/lib/socialLinks';
import { Send, User, Mail, MessageSquare, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email').max(255, 'Email too long'),
  message: z.string().trim().min(1, 'Message is required').max(5000, 'Message too long'),
});

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: 'Validation Error',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: result.data,
      });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      toast({
        title: 'Message Sent! ✨',
        description: "Thanks for reaching out! I'll get back to you soon.",
      });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Failed to send',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl md:text-6xl font-bold mb-20 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Get In Touch
        </motion.h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">Let's Connect</h3>
              <p className="text-lg text-muted-foreground mb-8">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 8 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-xl border border-border hover:border-transparent transition-all group cursor-pointer"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${color}60`;
                    el.style.boxShadow = `0 8px 30px ${color}20, inset 0 0 0 1px ${color}30`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = '';
                    el.style.boxShadow = '';
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${color}25, ${color}50)`,
                      color: color,
                      boxShadow: `0 4px 15px ${color}30`,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                    <div className="font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                      {label === 'GitHub' && 'github.com/mahmoudali-ops'}
                      {label === 'LinkedIn' && 'mahmoud-ali-46b872234'}
                      {label === 'WhatsApp' && '+20 1122625028'}
                      {label === 'Gmail' && 'mahmoudalitawfekk@gmail.com'}
                    </div>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
                    →
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-3xl opacity-50 blur-xl" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))' }} />
            
            <div className="relative rounded-3xl border border-border/50 overflow-hidden" style={{ background: 'linear-gradient(160deg, hsl(230 30% 11%), hsl(265 20% 10%), hsl(230 30% 9%))' }}>
              <div className="relative px-8 pt-8 pb-6">
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--accent)), transparent)' }} />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.3))' }}>
                    <Sparkles size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Send a Message</h3>
                    <p className="text-xs text-muted-foreground">I'll get back to you soon</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
                {/* Name field */}
                <div className="relative group">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Name
                  </label>
                  <div className={`relative rounded-xl border transition-all duration-300 ${focusedField === 'name' ? 'border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.15)]' : 'border-border/50 hover:border-border'}`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="relative group">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Email
                  </label>
                  <div className={`relative rounded-xl border transition-all duration-300 ${focusedField === 'email' ? 'border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.15)]' : 'border-border/50 hover:border-border'}`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="relative group">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <div className={`relative rounded-xl border transition-all duration-300 ${focusedField === 'message' ? 'border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.15)]' : 'border-border/50 hover:border-border'}`}>
                    <div className="absolute left-4 top-4 text-muted-foreground">
                      <MessageSquare size={16} />
                    </div>
                    <textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none resize-none"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  whileHover={!isSubmitting && !isSuccess ? { scale: 1.02, boxShadow: '0 0 30px hsl(265 89% 68% / 0.4)' } : {}}
                  whileTap={!isSubmitting && !isSuccess ? { scale: 0.98 } : {}}
                  className="w-full relative group overflow-hidden rounded-xl py-4 font-semibold text-primary-foreground transition-all disabled:opacity-80"
                  style={{ background: isSuccess ? 'hsl(142 76% 36%)' : 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle size={18} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </span>
                  {!isSubmitting && !isSuccess && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.15) 45%, hsl(0 0% 100% / 0.05) 55%, transparent 60%)' }} />
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" />
    </section>
  );
}
