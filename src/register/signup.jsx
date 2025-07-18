import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  Facebook,
  Chrome,
  Apple,
  Mail
} from 'lucide-react';

const LoginSignupModal = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("Pakistan (+92)");
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('phoneLogin'); // Possible values: 'phoneLogin', 'confirmNumber', 'finishSignup'
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);

  // States for the 'finishSignup' step
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [receiveMarketing, setReceiveMarketing] = useState(false);
  const [finishSignupErrors, setFinishSignupErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      // Reset all states when the modal closes
      setErrors({});
      setPhoneNumber("");
      setStep('phoneLogin');
      setVerificationCode(['', '', '', '', '']);
      setEmail('');
      setFirstName('');
      setLastName('');
      setBirthdate('');
      setReceiveMarketing(false);
      setFinishSignupErrors({});
    }
  }, [isOpen]);

  // --- Phone Login Step Handlers ---
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }));
    }
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const validatePhoneNumber = () => {
    const newErrors = {};
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (phoneNumber.trim() && !/^\d+$/.test(phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone number must contain only digits";
    }
    if (phoneNumber.trim() && phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = "Phone number is too short";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinuePhoneLogin = async () => {
    if (validatePhoneNumber()) {
      console.log(`Frontend: Initiating SMS send to: ${countryCode.split(' ')[1]} ${phoneNumber}`);
      //
      // --- BACKEND INTEGRATION POINT: SEND SMS CODE ---
      // This is where you would make an API call to your backend to send the SMS code.
      // Example using fetch API (uncomment and replace with your actual endpoint):
      /*
      try {
        const response = await fetch('/api/send-sms-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: `${countryCode.split(' ')[1]}${phoneNumber}`,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          console.log("Backend: SMS code sent successfully.");
          setStep('confirmNumber'); // Only transition if backend confirms sending
        } else {
          console.error("Backend: Failed to send SMS:", data.message || "Unknown error");
          alert(`Failed to send SMS: ${data.message || "Please try again."}`);
        }
      } catch (error) {
        console.error("Frontend: Network or API error when sending SMS:", error);
        alert("Could not connect to the server to send SMS. Please try again later.");
      }
      */

      // FOR NOW (WITHOUT BACKEND): Directly transition to confirmNumber step for testing UI flow
      setStep('confirmNumber');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Frontend: Login with ${provider}`);
    // --- BACKEND INTEGRATION POINT: SOCIAL LOGIN ---
    // You would typically redirect to a backend endpoint that handles OAuth for social logins.
    // After successful authentication, the backend would redirect back to your app,
    // potentially with a token or session.
    onClose(); // Close modal after simulated action
  };

  const handleEmailLogin = () => {
    console.log("Frontend: Continuing with email");
    // --- BACKEND INTEGRATION POINT: EMAIL LOGIN/SIGNUP REDIRECT ---
    // This would likely navigate to a dedicated email login/signup page/modal or
    // initiate an email-based login flow.
    onClose(); // Close modal after simulated action
  };

  // --- Confirm Number Step Handlers ---
  const handleCodeChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) { // Only allow single digits
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Focus next input
      if (value && index < 4) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{5}$/.test(pasteData)) { // Assuming 5-digit code
      const newCode = pasteData.split('');
      setVerificationCode(newCode);
      e.preventDefault(); // Prevent default paste behavior
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  const handleVerifyCode = async () => {
    const code = verificationCode.join('');
    if (code.length === 5) {
      console.log(`Frontend: Verifying code: ${code} for number: ${countryCode.split(' ')[1]} ${phoneNumber}`);

      // --- STATIC CODE VERIFICATION FOR FRONTEND TESTING ---
      // For now, we'll check if the code is "00000"
      if (code === "00000") {
        console.log("Frontend: Static code '00000' matched. Transitioning to finish signup.");
        setStep('finishSignup');
        setVerificationCode(['', '', '', '', '']); // Clear verification code inputs
      } else {
        alert('Incorrect code. Please try again or enter 00000 to proceed.');
        setVerificationCode(['', '', '', '', '']); // Clear inputs on incorrect attempt
      }

      // --- BACKEND INTEGRATION POINT: VERIFY SMS CODE ---
      // This is where you would make an API call to your backend to verify the entered SMS code.
      // Example using fetch API (uncomment and replace with your actual endpoint):
      /*
      try {
        const response = await fetch('/api/verify-sms-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: `${countryCode.split(' ')[1]}${phoneNumber}`,
            code: code,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          console.log("Backend: Code verified successfully!");
          setStep('finishSignup'); // Transition to the 'Finish Signing Up' step
          setVerificationCode(['', '', '', '', '']); // Clear verification code inputs
        } else {
          console.error("Backend: Code verification failed:", data.message || "Unknown error");
          alert(`Verification failed: ${data.message || 'Invalid or expired code.'}`);
        }
      } catch (error) {
        console.error("Frontend: Network or API error during code verification:", error);
        alert("Failed to verify code. Please try again.");
      }
      */
    } else {
      alert('Please enter the full 5-digit code.');
    }
  };

  const handleBackToPhoneLogin = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setStep('phoneLogin');
    setErrors({}); // Clear any previous errors
    setVerificationCode(['', '', '', '', '']); // Clear code when going back
  };

  // --- Finish Signup Step Handlers ---
  const validateFinishSignup = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (email.trim() && !/\S+@\S+\.\S+/.test(email.trim())) newErrors.email = "Invalid email format";
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!birthdate.trim()) newErrors.birthdate = "Birthdate is required";
    // Add more robust birthdate validation (e.g., age check for 18+)
    setFinishSignupErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinishSignup = async () => {
    if (validateFinishSignup()) {
      console.log("Frontend: Attempting to finish signup with details...");
      //
      // --- BACKEND INTEGRATION POINT: REGISTER USER ---
      // This is where you would make an API call to your backend to register the new user.
      // Example using fetch API (uncomment and replace with your actual endpoint):
      /*
      try {
        const response = await fetch('/api/register-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: `${countryCode.split(' ')[1]}${phoneNumber}`, // Send the confirmed phone number
            email,
            firstName,
            lastName,
            birthdate,
            receiveMarketing,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          console.log("Backend: User registered successfully!");
          alert("Registration successful! Welcome to Airbnb!");
          onClose(); // Close the entire modal after successful registration
        } else {
          console.error("Backend: Registration failed:", data.message || "Unknown error");
          alert(`Registration failed: ${data.message || 'Please check your details and try again.'}`);
        }
      } catch (error) {
        console.error("Frontend: Network or API error during registration:", error);
        alert("Failed to complete registration. Please try again.");
      }
      */

      // FOR NOW (WITHOUT BACKEND): Simulate success and close modal
      alert("Frontend: Registration successful! (Simulated)");
      onClose();
    }
  };

  // Function to handle the "Log in" link click in the "Finish signing up" step
  const handleLoginLinkClick = (e) => {
    e.preventDefault();
    console.log("Frontend: 'Log in' link clicked in finish signup. Returning to phone login step.");
    setStep('phoneLogin'); // Go back to the first step
    // Optionally clear phone number and errors if you want a completely fresh start
    setPhoneNumber("");
    setErrors({});
  };


  if (!isOpen) return null;

  // Combine country code and phone number for display in confirmation step
  const displayPhoneNumber = `${countryCode.split(' ')[1]}${phoneNumber}`;

  // Conditional Rendering based on 'step' state
  const renderContent = () => {
    if (step === 'phoneLogin') {
      return (
        <>
          <div className="modal-header">
            <button className="modal-close-button" onClick={onClose}>
              <X />
            </button>
            <h2 className="modal-title">Log in or sign up to Signature Space</h2>
          </div>
          <div className="modal-body">
            <div className="input-group">
              <div className="country-phone-input">
                <select className="country-select" value={countryCode} onChange={handleCountryCodeChange}>
                  <option value="Pakistan (+92)">Pakistan (+92)</option>
                  <option value="United States (+1)">United States (+1)</option>
                  <option value="Canada (+1)">Canada (+1)</option>
                  <option value="United Kingdom (+44)">United Kingdom (+44)</option>
                  {/* Add more countries as needed */}
                </select>
                <input
                  type="tel"
                  className="phone-input"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              <p className="privacy-text">
                We'll call or text you to confirm your number. Standard message and data rates apply.{" "}
                <a href="#">Privacy Policy</a>
              </p>
            </div>

            <button className="continue-button" onClick={handleContinuePhoneLogin}>
              Continue
            </button>

            <div className="divider">or</div>

            <div className="social-buttons-grid">
              {/* Social Buttons with Lucide Icons */}
              <button className="social-button" onClick={() => handleSocialLogin("Facebook")}>
                <span className="social-icon">
                  <Facebook size={20} color="#1877F3" />
                </span>
                Facebook
              </button>

              <button className="social-button" onClick={() => handleSocialLogin("Google")}>
                <span className="social-icon">
                  <Chrome size={20} color="#EA4335" />
                </span>
                Google
              </button>

              <button className="social-button" onClick={() => handleSocialLogin("Apple")}>
                <span className="social-icon">
                  <Apple size={20} color="#000000" />
                </span>
                Apple
              </button>
            </div>

            <button className="email-continue-button" onClick={handleEmailLogin}>
              <span className="social-icon">
                <Mail size={20} color="#555555" />
              </span>
              Continue with email
            </button>
          </div>
        </>
      );
    } else if (step === 'confirmNumber') {
      return (
        <>
          <div className="modal-header">
            <button className="modal-close-button" onClick={handleBackToPhoneLogin}>
              <ArrowLeft />
            </button>
            <h2 className="modal-title">Confirm your number</h2>
          </div>
          <div className="modal-body">
            <p className="confirm-text">
              Enter the code we sent over SMS to +{displayPhoneNumber}:
            </p>
            <div className="code-inputs">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="code-input"
                  inputMode="numeric"
                  pattern="[0-9]"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <a href="#" className="choose-option-link" onClick={handleBackToPhoneLogin}>
              Choose a different option
            </a>
            <button
              className="confirm-continue-button"
              onClick={handleVerifyCode}
              disabled={verificationCode.join('').length !== 5}
            >
              Continue
            </button>
          </div>
        </>
      );
    } else if (step === 'finishSignup') {
      return (
        <>
          <div className="modal-header">
            {/* The "Finish signing up" screen in the image doesn't have a back arrow, only a close X button */}
            <button className="modal-close-button" onClick={onClose}>
              <X />
            </button>
            <h2 className="modal-title">Finish signing up</h2>
          </div>
          <div className="modal-body">
            {/* Phone Number - read-only field */}
            <div className="input-group">
              <label className="input-label">Phone number</label>
              <input
                type="text"
                className="read-only-input"
                value={`+${displayPhoneNumber}`} // Display the confirmed phone number
                readOnly // Make it read-only
              />
            </div>

            <p className="already-have-account">
              Already have an account? <a href="#" onClick={handleLoginLinkClick}>Log in</a>
            </p>

            {/* Contact Info - Email */}
            <div className="input-group">
              <label className="input-label">Contact info</label>
              <input
                type="email"
                className="text-input"
                placeholder="Email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFinishSignupErrors(prev => ({ ...prev, email: '' })); }}
              />
              {finishSignupErrors.email && <span className="error-message">{finishSignupErrors.email}</span>}
              <p className="input-helper-text">We'll email you trip confirmations and receipts.</p>
            </div>

            {/* Legal Name - First and Last Name */}
            <div className="input-group">
              <label className="input-label">Legal name</label>
              <input
                type="text"
                className="text-input"
                placeholder="First name on ID"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setFinishSignupErrors(prev => ({ ...prev, firstName: '' })); }}
              />
              {finishSignupErrors.firstName && <span className="error-message">{finishSignupErrors.firstName}</span>}
              <input
                type="text"
                className="text-input"
                placeholder="Last name on ID"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setFinishSignupErrors(prev => ({ ...prev, lastName: '' })); }}
              />
              {finishSignupErrors.lastName && <span className="error-message">{finishSignupErrors.lastName}</span>}
              <p className="input-helper-text">Make sure this matches the name on your government ID. If you go by another name, you can add a <a href="#">preferred first name</a>.</p>
            </div>

            {/* Date of Birth */}
            <div className="input-group">
              <label className="input-label">Date of birth</label>
              <input
                type="date" // Use type="date" for a native date picker
                className="text-input"
                value={birthdate}
                onChange={(e) => { setBirthdate(e.target.value); setFinishSignupErrors(prev => ({ ...prev, birthdate: '' })); }}
              />
              {finishSignupErrors.birthdate && <span className="error-message">{finishSignupErrors.birthdate}</span>}
              <p className="input-helper-text">To sign up, you need to be at least 18. Your birthday won't be shared with other people who use Airbnb.</p>
            </div>

            {/* Privacy and Terms Text */}
            <p className="privacy-terms-text">
              By selecting Agree and continue, I agree to Airbnb's <a href="#">Terms of Service</a>, <a href="#">Payments Terms of Service</a>, and <a href="#">Nondiscrimination Policy</a> and acknowledge the <a href="#">Privacy Policy</a>.
            </p>

            {/* Agree and Continue Button */}
            <button className="continue-button" onClick={handleFinishSignup}>
              Agree and continue
            </button>

            {/* Marketing Opt-in Checkbox and Text */}
            <div className="marketing-opt-in">
              <input
                type="checkbox"
                id="marketingOptIn"
                checked={receiveMarketing}
                onChange={(e) => setReceiveMarketing(e.target.checked)}
              />
              <label htmlFor="marketingOptIn">I don't want to receive marketing messages from Airbnb.</label>
              <p className="marketing-info-text">
                Airbnb will send you members-only deals, inspiration, marketing emails, and push notifications. You can opt out of receiving these at any time in your account settings or directly from the marketing notification.
              </p>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .modal-overlay-full {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-container {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 560px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          padding: 16px 24px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .modal-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #333333;
          text-align: center;
          flex-grow: 1;
        }

        .modal-close-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close-button:hover {
          background-color: #f0f0f0;
        }

        .modal-close-button svg {
          width: 20px;
          height: 20px;
          color: #555555;
        }

        .modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .country-phone-input {
          display: flex;
          flex-direction: column;
          border: 1px solid #cccccc;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        @media (min-width: 480px) {
          .country-phone-input {
            flex-direction: row;
          }
        }

        .country-select {
          flex-shrink: 0;
          padding: 12px 16px;
          border: none;
          font-size: 1rem;
          background-color: #f9f9f9;
          outline: none;
          cursor: pointer;
          border-bottom: 1px solid #e0e0e0;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        @media (min-width: 480px) {
          .country-select {
            border-right: 1px solid #e0e0e0;
            border-bottom: none;
            border-bottom-left-radius: 8px;
            border-top-right-radius: 0;
          }
        }

        .phone-input {
          flex-grow: 1;
          padding: 12px 16px;
          border: none;
          font-size: 1rem;
          outline: none;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        @media (min-width: 480px) {
          .phone-input {
            border-top-right-radius: 8px;
            border-bottom-left-radius: 0;
          }
        }

        .error-message {
          color: #e53e3e;
          font-size: 0.875rem;
          margin-top: 4px;
        }

        .privacy-text {
          font-size: 0.875rem;
          color: #555555;
          margin-top: -8px;
          margin-bottom: 16px;
        }

        .privacy-text a {
          color: #cba135; /* Brand color */
          text-decoration: none;
        }

        .privacy-text a:hover {
          text-decoration: underline;
        }

        .continue-button {
          width: 100%;
          padding: 14px 20px;
          background-color: #cba135; /* Brand color */
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .continue-button:hover {
          background-color: #a8872e; /* Darker shade for hover */
        }

        .divider {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #777777;
          font-size: 0.875rem;
          margin: 20px 0;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e0e0e0;
        }

        .divider:not(:empty)::before {
          margin-right: .5em;
        }

        .divider:not(:empty)::after {
          margin-left: .5em;
        }

        .social-buttons-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 480px) {
          .social-buttons-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .social-buttons-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .social-button, .email-continue-button {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cccccc;
          border-radius: 8px;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
          gap: 8px;
        }

        .social-button:hover, .email-continue-button:hover {
          background-color: #f0f0f0;
          border-color: #999999;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .email-continue-button {
          margin-top: 12px;
        }

        /* Styles specific to the confirmation step */
        .confirm-text {
          font-size: 1rem;
          color: #333333;
          margin-bottom: 16px;
        }

        .code-inputs {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .code-input {
          width: 48px;
          height: 48px;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
          border: 1px solid #cccccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .code-input:focus {
          border-color: #cba135; /* Brand color on focus */
          box-shadow: 0 0 0 3px rgba(203, 161, 53, 0.25); /* Brand color shadow */
        }

        .choose-option-link {
          color: #cba135; /* Brand color */
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          font-size: 1rem;
          margin-bottom: 24px;
        }

        .choose-option-link:hover {
          text-decoration: underline;
        }

        .confirm-continue-button {
          width: 100%;
          padding: 14px 20px;
          background-color: #cba135; /* Brand color */
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .confirm-continue-button:hover {
          background-color: #a8872e; /* Darker shade for hover */
        }

        .confirm-continue-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        /* Styles specific to the 'Finish signing up' step */
        .read-only-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cccccc;
          border-radius: 8px;
          background-color: #f0f0f0;
          color: #555555;
          font-size: 1rem;
          outline: none;
          cursor: default;
          box-sizing: border-box;
        }

        .input-label {
          font-size: 0.875rem;
          color: #777777;
          margin-bottom: 4px;
          display: block;
        }

        .text-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cccccc;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
          margin-bottom: 8px; /* Space between stacked inputs within the same group */
        }

        .text-input:focus {
          border-color: #cba135; /* Brand color on focus */
          box-shadow: 0 0 0 3px rgba(203, 161, 53, 0.25); /* Brand color shadow */
        }

        .input-group .text-input:last-of-type {
            margin-bottom: 0;
        }

        .input-group .text-input + .text-input {
            margin-top: 8px;
        }

        .already-have-account {
          font-size: 0.875rem;
          color: #555555;
          margin-top: 8px;
          margin-bottom: 16px;
        }

        .already-have-account a {
          color: #cba135; /* Brand color */
          text-decoration: none;
        }

        .already-have-account a:hover {
          text-decoration: underline;
        }

        .input-helper-text {
          font-size: 0.75rem;
          color: #777777;
          margin-top: 4px;
          margin-bottom: 8px;
        }

        .privacy-terms-text {
          font-size: 0.875rem;
          color: #555555;
          margin-top: 16px;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .privacy-terms-text a {
          color: #cba135; /* Brand color */
          text-decoration: none;
        }

        .privacy-terms-text a:hover {
          text-decoration: underline;
        }

        .marketing-opt-in {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .marketing-opt-in input[type="checkbox"] {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          margin-top: 2px;
          cursor: pointer;
        }

        .marketing-opt-in label {
          font-size: 1rem;
          color: #333333;
          cursor: pointer;
          flex-grow: 1;
        }

        .marketing-info-text {
          font-size: 0.75rem;
          color: #777777;
          margin-top: 8px;
          width: 100%;
          padding-left: 28px;
          box-sizing: border-box;
        }
        `}
      </style>
      <div className="modal-overlay-full">
        <div className="modal-container">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default LoginSignupModal;