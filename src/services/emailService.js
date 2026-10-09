import emailjs from "@emailjs/browser";

/**
 * Service function to send email through EmailJS.
 * Keeps communication logic completely separated from UI components.
 *
 * @param {Object} data
 * @param {string} data.name - Sender name
 * @param {string} data.email - Sender email
 * @param {string} data.message - Message content
 * @returns {Promise<{success: boolean, message?: string, error?: any}>}
 */
export const sendContactEmail = async ({ name, email, message }) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        throw new Error(
            "EmailJS environment variables (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY) are not configured."
        );
    }

    const templateParams = {
        name: name,
        from_name: name,
        email: email,
        from_email: email,
        reply_to: email,
        message: message,
        time: new Date().toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }),
    };

    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return response;
};
