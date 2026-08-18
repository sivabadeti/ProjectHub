import { useEffect, useRef } from "react";

function GoogleButton({ onCredential }) {
  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (
      !window.google ||
      !googleButtonRef.current
    ) {
      return;
    }

    // Clear previous Google button
    googleButtonRef.current.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id:
        import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback: (response) => {
        onCredential(response.credential);
      },
    });

    window.google.accounts.id.renderButton(
      googleButtonRef.current,
      {
        theme: "outline",
        size: "large",
        width: 350,
        text: "continue_with",
        shape: "rectangular",
      }
    );
  }, [onCredential]);

  return (
    <div
      ref={googleButtonRef}
      className="flex min-h-[44px] justify-center"
    />
  );
}

export default GoogleButton;