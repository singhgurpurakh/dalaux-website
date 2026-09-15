import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Arrow } from "./Primitives";
type Props = { open: boolean; service: string; onClose: () => void };
export default function ProjectBrief({ open, service, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [business, setBusiness] = useState(""),
    [description, setDescription] = useState("");
  const [selectedService, setSelectedService] = useState(service),
    [status, setStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    setSelectedService(service);
  }, [service]);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      setStatus("");
    } else dialog.current?.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function brief() {
    return `DALAUX — PROJECT BRIEF\n\nName: ${name}\nEmail: ${email}\nBusiness: ${business || "Not specified"}\nInterested in: ${selectedService}\n\nThe idea\n${description}\n\nThis is a draft project brief. It has not been sent to Dalaux.`;
  }
  function download(event: FormEvent) {
    event.preventDefault();
    const url = URL.createObjectURL(
      new Blob([brief()], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "dalaux-project-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Your brief has been downloaded. Nothing has been submitted.");
  }
  async function copy() {
    if (!form.current?.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(brief());
      setStatus(
        "Brief copied. You can paste it into a message when you’re ready.",
      );
    } catch {
      setStatus(
        "Clipboard access is unavailable. Use “Download brief” to save a copy.",
      );
    }
  }
  return (
    <dialog
      ref={dialog}
      className="brief-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
      aria-labelledby="brief-title"
      aria-describedby="brief-description"
    >
      <div className="brief-content">
        <button
          className="dialog-close circle-button"
          aria-label="Close project brief"
          onClick={onClose}
        >
          ×
        </button>
        <span className="eyebrow">LET’S GIVE YOUR IDEA SOME SHAPE</span>
        <h2 id="brief-title">
          Something
          <br />
          <em>exceptional starts here.</em>
        </h2>
        <p id="brief-description">
          Outline what you have in mind. Save or copy your brief to share later.
          This form does not send an enquiry.
        </p>
        <form ref={form} onSubmit={download}>
          <div className="form-grid">
            <label>
              Your name
              <input
                autoFocus
                required
                maxLength={100}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email address
              <input
                required
                type="email"
                maxLength={200}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <label>
            Business / brand <span className="optional">(optional)</span>
            <input
              maxLength={150}
              autoComplete="organization"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            />
          </label>
          <label>
            I’m interested in
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option>AI automation</option>
              <option>Website design & development</option>
              <option>Lead capture & routing</option>
              <option>Website + automation</option>
              <option>Let’s explore the possibilities</option>
            </select>
          </label>
          <label>
            What are you imagining?
            <textarea
              required
              minLength={10}
              maxLength={3000}
              rows={4}
              placeholder="Your idea, the problem you want to solve, or what you’d like to do better…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="form-actions">
            <button type="submit" className="button button-dark">
              Download brief <Arrow down />
            </button>
            <button type="button" className="quiet-link" onClick={copy}>
              Copy brief <Arrow />
            </button>
          </div>
          <p className="form-status" role="status">
            {status}
          </p>
          <p className="form-privacy">
            Your details stay in this page until you copy or download them.
          </p>
        </form>
      </div>
    </dialog>
  );
}
