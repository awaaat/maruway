import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FORM_ENDPOINT, SITE } from '../config/site';
import { SERVICES } from '../data/services';
import { track } from '../lib/analytics';
import Icon from './Icon';

const URGENCY = [
  { v: 'now', l: 'Technician now' },
  { v: 'quote', l: 'Quotation' },
  { v: 'info', l: 'Question' },
];

export default function ContactForm() {
  const [params] = useSearchParams();
  const [state, setState] = useState({ status: 'idle', errors: {} });
  const [values, setValues] = useState({
    name: '', organisation: '', phone: '', email: '', message: params.get('msg') || '', website: '',
    service: params.get('service') || '',
    urgency: URGENCY.some((u) => u.v === params.get('urgency')) ? params.get('urgency') : 'quote',
  });
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  function validate(v) {
    const e = {};
    if (!v.name.trim()) e.name = 'Enter your name.';
    if (!v.phone.trim() && !v.email.trim()) e.phone = 'Enter a phone number or an email address so we can reach you.';
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address, like name@company.co.ke.';
    if (v.message.trim().length < 10) e.message = 'Describe what you need in at least a sentence.';
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    if (values.website) return; // honeypot: real visitors never fill this field
    const errors = validate(values);
    if (Object.keys(errors).length) {
      setState({ status: 'idle', errors });
      setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 0);
      return;
    }
    setState({ status: 'sending', errors: {} });
    const svc = SERVICES.find((s) => s.slug === values.service)?.title || 'Not specified';
    const payload = { ...values, service: svc, urgencyLabel: URGENCY.find((u) => u.v === values.urgency).l };
    delete payload.website;
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('Request failed');
      } else {
        const body = `${payload.message}\n\nName: ${payload.name}\nOrganisation: ${payload.organisation}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nService: ${svc}\nPriority: ${payload.urgencyLabel}`;
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Website enquiry: ${svc}`)}&body=${encodeURIComponent(body)}`;
      }
      track('generate_lead', { service: values.service || 'none', urgency: values.urgency });
      setState({ status: 'sent', errors: {} });
    } catch {
      setState({ status: 'error', errors: {} });
    }
  }

  if (state.status === 'sent') {
    return (
      <div className="form-done" role="status">
        <span className="form-done__tick"><Icon name="check" size={22} stroke={2.2} /></span>
        <h2>Request received</h2>
        <p>{values.urgency === 'now' ? `If this is urgent, also call ${SITE.phone.display}.` : 'We will reply during working hours.'}</p>
      </div>
    );
  }

  const err = state.errors;
  const field = (id, label, input, hint) => (
    <div className={err[id] ? 'field has-error' : 'field'}>
      <label htmlFor={id}>{label}</label>
      {input}
      {err[id] && <p className="field__err" id={`${id}-err`}>{err[id]}</p>}
      {hint && !err[id] && <p className="field__hint">{hint}</p>}
    </div>
  );
  const a = (id) => ({ id, name: id, value: values[id], onChange: set(id), 'aria-invalid': err[id] ? 'true' : undefined, 'aria-describedby': err[id] ? `${id}-err` : undefined });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <fieldset className="urgency">
        <legend>What do you need?</legend>
        <div>
          {URGENCY.map((u) => (
            <label key={u.v} className={values.urgency === u.v ? 'chip is-on' : 'chip'}>
              <input type="radio" name="urgency" value={u.v} checked={values.urgency === u.v} onChange={set('urgency')} />{u.l}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form__row">
        {field('name', 'Your name', <input type="text" autoComplete="name" {...a('name')} />)}
        {field('organisation', 'Organisation', <input type="text" autoComplete="organization" {...a('organisation')} />)}
      </div>
      <div className="form__row">
        {field('phone', 'Phone', <input type="tel" autoComplete="tel" inputMode="tel" {...a('phone')} />)}
        {field('email', 'Email', <input type="email" autoComplete="email" {...a('email')} />)}
      </div>
      {field('service', 'Service', (
        <select {...a('service')}>
          <option value="">Not sure yet</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
        </select>
      ))}
      {field('message', 'What is happening?', <textarea rows="5" {...a('message')} />, 'Include the site location and what has stopped working.')}
      <div className="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabIndex="-1" autoComplete="off" value={values.website} onChange={set('website')} /></label></div>
      <button className="btn btn--primary" type="submit" disabled={state.status === 'sending'}>{state.status === 'sending' ? 'Sending…' : <>Send request <Icon name="arrow" size={15} /></>}</button>
      <p className="form__status" role="alert">{state.status === 'error' && `The request did not send. Call ${SITE.phone.display} or email ${SITE.email}.`}</p>
    </form>
  );
}
