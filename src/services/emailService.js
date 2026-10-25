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

/** Send a project brief using the existing contact template and recipient. */
export const sendProjectRequestEmail = async ({
    name, email, applicationType, description, features, budget, targetDate,
}) => {
    const message = [
        "Custom web application request",
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Application type: ${applicationType.trim()}`,
        `Project description:\n${description.trim()}`,
        `Required features:\n${features.trim()}`,
        `Budget: ${budget?.trim() || "Not specified"}`,
        `Target date: ${targetDate?.trim() || "Not specified"}`,
    ].join("\n\n");

    return sendContactEmail({ name: name.trim(), email: email.trim(), message });
};
