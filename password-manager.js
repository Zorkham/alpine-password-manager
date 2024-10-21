document.addEventListener("alpine:init", () => {
  Alpine.data("passwordManager", () => ({
    // User preferences using Alpine.js Persist Plugin
    length: Alpine.$persist(12),
    includeUppercase: Alpine.$persist(true),
    includeDigits: Alpine.$persist(true),
    includeSymbols: Alpine.$persist(true),
    includeAmbiguous: Alpine.$persist(true),
    passwords: Alpine.$persist([{ name: "My Sample Password", password: "Tn|zWq|P@pKx8MQgVN" }]),
    password: "",
    passwordStrength: "Weak",
    newPasswordName: "",
    feedback: "",
    feedbackClass: "",

    // Initialize by generating a password automatically on page load
    init() {
      this.generatePassword();
    },

    // Generate a random password based on selected options
    generatePassword() {
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const digit = "0123456789";
      const symbol = "!@#$%^&*()_+[]{}|;:,.<>?";
      const ambiguous = "1Il|O0Z2";

      // Build the character set based on user preferences
      let chars = lowercase;
      if (this.includeUppercase) chars += uppercase;
      if (this.includeDigits) chars += digit;
      if (this.includeSymbols) chars += symbol;
      if (!this.includeAmbiguous) {
        chars = chars
          .split("")
          .filter((char) => !ambiguous.includes(char))
          .join("");
      }

      // Create the password by randomly picking characters from the set
      let generatedPassword = "";
      for (let i = 0; i < this.length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        generatedPassword += chars[randomIndex];
      }
      this.password = generatedPassword;
      this.passwordStrength = this.getPasswordStrength(generatedPassword);
    },

    // Copy the password to the clipboard
    copyToClipboard(password = this.password) {
      navigator.clipboard
        .writeText(password)
        .then(() => this.setFeedback("Password copied to clipboard!", "success"))
        .catch(() => this.setFeedback("Failed to copy password.", "error"));
    },

    // Store the new password
    storePassword() {
      if (this.newPasswordName.trim() === "") {
        this.setFeedback("Please enter a password name.", "error");
        return;
      }

      const existingPassword = this.passwords.find((item) => item.name === this.newPasswordName);
      if (existingPassword) {
        this.setFeedback("Password name already exists!", "error");
        return;
      }

      this.passwords.push({ name: this.newPasswordName, password: this.password });
      this.newPasswordName = "";
      this.setFeedback("Password stored successfully!", "success");
    },

    // Delete a stored password
    deletePassword(index) {
      this.passwords.splice(index, 1);
      this.setFeedback("Password deleted successfully!", "success");
    },

    // Get the strength of the password
    getPasswordStrength(password) {
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSymbol = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

      const criteriaMet = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;

      if (password.length >= 18 && criteriaMet > 3) return "Very Strong";
      if (password.length >= 14 && criteriaMet > 2) return "Strong";
      if (password.length >= 10 && criteriaMet > 1) return "Moderate";
      if (password.length >= 6 && criteriaMet > 0) return "Weak";
      return "Very Weak";
    },

    // Set feedback message
    setFeedback(message, type) {
      this.feedback = message;
      this.feedbackClass = type === "error" ? "feedback-error" : "feedback-success";

      setTimeout(() => {
        this.feedback = "";
        this.feedbackClass = "";
      }, 3000);
    },
  }));
});
