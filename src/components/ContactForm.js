import { useState } from "react";

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("access_key", "fd814e35-913d-4422-8cb7-1413779fa963");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(
        data.success ? "Success!<br>Thank you for reaching out." : "Error"
      );
      if (data.success) event.target.reset();
    } catch (err) {
      console.error(err);
      setResult("Error");
    }
  };

  return (
    <form className="footer-contact" onSubmit={onSubmit}>
      <p className="footer-contact-item">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="footer-input"
          required
        />
      </p>
      <p className="footer-contact-item">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="footer-input"
          required

        />
      </p>
      <p className="footer-contact-item">
        <textarea
          name="message"
          placeholder="Your Message"
          className="footer-textarea"
          required
        ></textarea>
      </p>

      <p>
        <button type="submit" className="btn footer-btn">
          Send Message
        </button>
      </p>

      {result && (
        <p
          className="footer-result"
          dangerouslySetInnerHTML={{ __html: result }}
        ></p>
      )}
    </form>
  );
}
