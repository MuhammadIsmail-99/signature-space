"use client"

import { useState } from "react" // Add useState
import { X, ChevronDown, Mail, ArrowLeft } from "lucide-react" // Add ArrowLeft
import "./signup.css"

export default function LoginPopup({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState("login") // 'login' or 'smsConfirmation'
  const [phoneNumber, setPhoneNumber] = useState("") // To store the entered phone number

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          {currentStep === "smsConfirmation" && (
            <button className="popup-back-button" onClick={() => setCurrentStep("login")} aria-label="Back">
              <ArrowLeft size={18} />
            </button>
          )}
          <button
            className="popup-close-button"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
          <h2 className="popup-title">{currentStep === "login" ? "Log in or sign up" : "Confirm your number"}</h2>
        </div>
        <div className="popup-body">
          {currentStep === "login" && (
            <>
              <h1 className="welcome-heading">Welcome to Signature Space</h1>
              <div className="input-group">
                <div className="country-code-input">
                  <div className="input-label">Country code</div>
                  {/* <input type="text" className="input-field" value="Pakistan (+92)" readOnly /> */}
                  <select id="countryCode" name="countryCode" className="input-field" readOnly>
                    <option value="">Select Country</option>
                    <option value="+93">Afghanistan (+93)</option>
                    <option value="+355">Albania (+355)</option>
                    <option value="+213">Algeria (+213)</option>
                    <option value="+376">Andorra (+376)</option>
                    <option value="+244">Angola (+244)</option>
                    <option value="+1-264">Anguilla (+1-264)</option>
                    <option value="+1-268">Antigua & Barbuda (+1-268)</option>
                    <option value="+54">Argentina (+54)</option>
                    <option value="+374">Armenia (+374)</option>
                    <option value="+297">Aruba (+297)</option>
                    <option value="+61">Australia (+61)</option>
                    <option value="+43">Austria (+43)</option>
                    <option value="+994">Azerbaijan (+994)</option>
                    <option value="+1-242">Bahamas (+1-242)</option>
                    <option value="+973">Bahrain (+973)</option>
                    <option value="+880">Bangladesh (+880)</option>
                    <option value="+1-246">Barbados (+1-246)</option>
                    <option value="+375">Belarus (+375)</option>
                    <option value="+32">Belgium (+32)</option>
                    <option value="+501">Belize (+501)</option>
                    <option value="+229">Benin (+229)</option>
                    <option value="+1-441">Bermuda (+1-441)</option>
                    <option value="+975">Bhutan (+975)</option>
                    <option value="+591">Bolivia (+591)</option>
                    <option value="+387">Bosnia & Herzegovina (+387)</option>
                    <option value="+267">Botswana (+267)</option>
                    <option value="+55">Brazil (+55)</option>
                    <option value="+673">Brunei (+673)</option>
                    <option value="+359">Bulgaria (+359)</option>
                    <option value="+226">Burkina Faso (+226)</option>
                    <option value="+257">Burundi (+257)</option>
                    <option value="+238">Cabo Verde (+238)</option>
                    <option value="+855">Cambodia (+855)</option>
                    <option value="+237">Cameroon (+237)</option>
                    <option value="+1">Canada (+1)</option>
                    <option value="+1-345">Cayman Islands (+1-345)</option>
                    <option value="+236">Central African Republic (+236)</option>
                    <option value="+235">Chad (+235)</option>
                    <option value="+56">Chile (+56)</option>
                    <option value="+86">China (+86)</option>
                    <option value="+57">Colombia (+57)</option>
                    <option value="+269">Comoros (+269)</option>
                    <option value="+243">Congo (DRC) (+243)</option>
                    <option value="+242">Congo (Republic) (+242)</option>
                    <option value="+682">Cook Islands (+682)</option>
                    <option value="+506">Costa Rica (+506)</option>
                    <option value="+385">Croatia (+385)</option>
                    <option value="+53">Cuba (+53)</option>
                    <option value="+357">Cyprus (+357)</option>
                    <option value="+420">Czech Republic (+420)</option>
                    <option value="+45">Denmark (+45)</option>
                    <option value="+253">Djibouti (+253)</option>
                    <option value="+1-767">Dominica (+1-767)</option>
                    <option value="+1-809">Dominican Republic (+1-809)</option>
                    <option value="+593">Ecuador (+593)</option>
                    <option value="+20">Egypt (+20)</option>
                    <option value="+503">El Salvador (+503)</option>
                    <option value="+240">Equatorial Guinea (+240)</option>
                    <option value="+291">Eritrea (+291)</option>
                    <option value="+372">Estonia (+372)</option>
                    <option value="+251">Ethiopia (+251)</option>
                    <option value="+500">Falkland Islands (+500)</option>
                    <option value="+298">Faroe Islands (+298)</option>
                    <option value="+679">Fiji (+679)</option>
                    <option value="+358">Finland (+358)</option>
                    <option value="+33">France (+33)</option>
                    <option value="+594">French Guiana (+594)</option>
                    <option value="+689">French Polynesia (+689)</option>
                    <option value="+241">Gabon (+241)</option>
                    <option value="+220">Gambia (+220)</option>
                    <option value="+995">Georgia (+995)</option>
                    <option value="+49">Germany (+49)</option>
                    <option value="+233">Ghana (+233)</option>
                    <option value="+350">Gibraltar (+350)</option>
                    <option value="+30">Greece (+30)</option>
                    <option value="+299">Greenland (+299)</option>
                    <option value="+1-473">Grenada (+1-473)</option>
                    <option value="+590">Guadeloupe (+590)</option>
                    <option value="+1-671">Guam (+1-671)</option>
                    <option value="+502">Guatemala (+502)</option>
                    <option value="+44-1481">Guernsey (+44-1481)</option>
                    <option value="+224">Guinea (+224)</option>
                    <option value="+245">Guinea-Bissau (+245)</option>
                    <option value="+592">Guyana (+592)</option>
                    <option value="+509">Haiti (+509)</option>
                    <option value="+504">Honduras (+504)</option>
                    <option value="+852">Hong Kong (+852)</option>
                    <option value="+36">Hungary (+36)</option>
                    <option value="+354">Iceland (+354)</option>
                    <option value="+91">India (+91)</option>
                    <option value="+62">Indonesia (+62)</option>
                    <option value="+98">Iran (+98)</option>
                    <option value="+964">Iraq (+964)</option>
                    <option value="+353">Ireland (+353)</option>
                    <option value="+44-1624">Isle of Man (+44-1624)</option>
                    <option value="+972">Israel (+972)</option>
                    <option value="+39">Italy (+39)</option>
                    <option value="+225">Ivory Coast (+225)</option>
                    <option value="+1-876">Jamaica (+1-876)</option>
                    <option value="+81">Japan (+81)</option>
                    <option value="+44-1534">Jersey (+44-1534)</option>
                    <option value="+962">Jordan (+962)</option>
                    <option value="+7">Kazakhstan (+7)</option>
                    <option value="+254">Kenya (+254)</option>
                    <option value="+686">Kiribati (+686)</option>
                    <option value="+383">Kosovo (+383)</option>
                    <option value="+965">Kuwait (+965)</option>
                    <option value="+996">Kyrgyzstan (+996)</option>
                    <option value="+856">Laos (+856)</option>
                    <option value="+371">Latvia (+371)</option>
                    <option value="+961">Lebanon (+961)</option>
                    <option value="+266">Lesotho (+266)</option>
                    <option value="+231">Liberia (+231)</option>
                    <option value="+218">Libya (+218)</option>
                    <option value="+423">Liechtenstein (+423)</option>
                    <option value="+370">Lithuania (+370)</option>
                    <option value="+352">Luxembourg (+352)</option>
                    <option value="+853">Macau (+853)</option>
                    <option value="+389">North Macedonia (+389)</option>
                    <option value="+261">Madagascar (+261)</option>
                    <option value="+265">Malawi (+265)</option>
                    <option value="+60">Malaysia (+60)</option>
                    <option value="+960">Maldives (+960)</option>
                    <option value="+223">Mali (+223)</option>
                    <option value="+356">Malta (+356)</option>
                    <option value="+692">Marshall Islands (+692)</option>
                    <option value="+596">Martinique (+596)</option>
                    <option value="+222">Mauritania (+222)</option>
                    <option value="+230">Mauritius (+230)</option>
                    <option value="+262">Mayotte (+262)</option>
                    <option value="+52">Mexico (+52)</option>
                    <option value="+691">Micronesia (+691)</option>
                    <option value="+373">Moldova (+373)</option>
                    <option value="+377">Monaco (+377)</option>
                    <option value="+976">Mongolia (+976)</option>
                    <option value="+382">Montenegro (+382)</option>
                    <option value="+1-664">Montserrat (+1-664)</option>
                    <option value="+212">Morocco (+212)</option>
                    <option value="+258">Mozambique (+258)</option>
                    <option value="+95">Myanmar (+95)</option>
                    <option value="+264">Namibia (+264)</option>
                    <option value="+674">Nauru (+674)</option>
                    <option value="+977">Nepal (+977)</option>
                    <option value="+31">Netherlands (+31)</option>
                    <option value="+599">Netherlands Antilles (+599)</option>
                    <option value="+687">New Caledonia (+687)</option>
                    <option value="+64">New Zealand (+64)</option>
                    <option value="+505">Nicaragua (+505)</option>
                    <option value="+227">Niger (+227)</option>
                    <option value="+234">Nigeria (+234)</option>
                    <option value="+683">Niue (+683)</option>
                    <option value="+850">North Korea (+850)</option>
                    <option value="+47">Norway (+47)</option>
                    <option value="+968">Oman (+968)</option>
                    <option value="+92">Pakistan (+92)</option>
                    <option value="+680">Palau (+680)</option>
                    <option value="+970">Palestine (+970)</option>
                    <option value="+507">Panama (+507)</option>
                    <option value="+675">Papua New Guinea (+675)</option>
                    <option value="+595">Paraguay (+595)</option>
                    <option value="+51">Peru (+51)</option>
                    <option value="+63">Philippines (+63)</option>
                    <option value="+48">Poland (+48)</option>
                    <option value="+351">Portugal (+351)</option>
                    <option value="+1-787">Puerto Rico (+1-787)</option>
                    <option value="+974">Qatar (+974)</option>
                    <option value="+262">Reunion (+262)</option>
                    <option value="+40">Romania (+40)</option>
                    <option value="+7">Russia (+7)</option>
                    <option value="+250">Rwanda (+250)</option>
                    <option value="+590">Saint Barthelemy (+590)</option>
                    <option value="+290">Saint Helena (+290)</option>
                    <option value="+1-869">Saint Kitts & Nevis (+1-869)</option>
                    <option value="+1-758">Saint Lucia (+1-758)</option>
                    <option value="+590">Saint Martin (+590)</option>
                    <option value="+508">Saint Pierre & Miquelon (+508)</option>
                    <option value="+1-784">Saint Vincent & Grenadines (+1-784)</option>
                    <option value="+685">Samoa (+685)</option>
                    <option value="+378">San Marino (+378)</option>
                    <option value="+239">Sao Tome & Principe (+239)</option>
                    <option value="+966">Saudi Arabia (+966)</option>
                    <option value="+221">Senegal (+221)</option>
                    <option value="+381">Serbia (+381)</option>
                    <option value="+248">Seychelles (+248)</option>
                    <option value="+232">Sierra Leone (+232)</option>
                    <option value="+65">Singapore (+65)</option>
                    <option value="+1-721">Sint Maarten (+1-721)</option>
                    <option value="+421">Slovakia (+421)</option>
                    <option value="+386">Slovenia (+386)</option>
                    <option value="+677">Solomon Islands (+677)</option>
                    <option value="+252">Somalia (+252)</option>
                    <option value="+27">South Africa (+27)</option>
                    <option value="+82">South Korea (+82)</option>
                    <option value="+211">South Sudan (+211)</option>
                    <option value="+34">Spain (+34)</option>
                    <option value="+94">Sri Lanka (+94)</option>
                    <option value="+249">Sudan (+249)</option>
                    <option value="+597">Suriname (+597)</option>
                    <option value="+47">Svalbard & Jan Mayen (+47)</option>
                    <option value="+268">Swaziland (+268)</option>
                    <option value="+46">Sweden (+46)</option>
                    <option value="+41">Switzerland (+41)</option>
                    <option value="+963">Syria (+963)</option>
                    <option value="+886">Taiwan (+886)</option>
                    <option value="+992">Tajikistan (+992)</option>
                    <option value="+255">Tanzania (+255)</option>
                    <option value="+66">Thailand (+66)</option>
                    <option value="+670">Timor-Leste (+670)</option>
                    <option value="+228">Togo (+228)</option>
                    <option value="+690">Tokelau (+690)</option>
                    <option value="+676">Tonga (+676)</option>
                    <option value="+1-868">Trinidad & Tobago (+1-868)</option>
                    <option value="+216">Tunisia (+216)</option>
                    <option value="+90">Turkey (+90)</option>
                    <option value="+993">Turkmenistan (+993)</option>
                    <option value="+1-649">Turks & Caicos Islands (+1-649)</option>
                    <option value="+688">Tuvalu (+688)</option>
                    <option value="+256">Uganda (+256)</option>
                    <option value="+380">Ukraine (+380)</option>
                    <option value="+971">United Arab Emirates (+971)</option>
                    <option value="+44">United Kingdom (+44)</option>
                    <option value="+1">United States (+1)</option>
                    <option value="+598">Uruguay (+598)</option>
                    <option value="+998">Uzbekistan (+998)</option>
                    <option value="+678">Vanuatu (+678)</option>
                    <option value="+379">Vatican City (+379)</option>
                    <option value="+58">Venezuela (+58)</option>
                    <option value="+84">Vietnam (+84)</option>
                    <option value="+1-284">Virgin Islands (British) (+1-284)</option>
                    <option value="+1-340">Virgin Islands (U.S.) (+1-340)</option>
                    <option value="+681">Wallis & Futuna (+681)</option>
                    <option value="+967">Yemen (+967)</option>
                    <option value="+260">Zambia (+260)</option>
                    <option value="+263">Zimbabwe (+263)</option>
                  </select>
                  {/* <ChevronDown size={16} className="arrow-icon" /> */}
                </div>
                <div>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <p className="privacy-text">
                {"We'll call or text you to confirm your number. Standard message and data rates apply. "}
                <span className="privacy-link">Privacy Policy</span>
              </p>
              <button
                className="continue-button"
                onClick={() => setCurrentStep("smsConfirmation")}
                disabled={!phoneNumber}
              >
                Continue
              </button>
              <div className="or-separator">or</div>
              <button className="social-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" height={25} width={25}><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                Continue with Google
              </button>
              <button className="social-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height={25} width={25}><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                Continue with Apple
              </button>
              <button className="social-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={25} width={25}><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
                Continue with email
              </button>
              <button className="social-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={25} width={25}><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
                Continue with Facebook
              </button>
            </>
          )}
          {currentStep === "smsConfirmation" && (
            <>
              <p className="privacy-text" style={{ fontSize: "16px", color: "#222222", marginBottom: "20px" }}>
                Enter the code we sent over SMS to {phoneNumber || "+92 3445428001"}:
              </p>
              <div className="sms-code-input-container">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="sms-code-input"
                    placeholder="-"
                    aria-label={`SMS code digit ${index + 1}`}
                  />
                ))}
              </div>
              <button className="choose-option-link" onClick={() => setCurrentStep("login")}>
                Choose a different option
              </button>
              <button className="continue-button" disabled>
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
