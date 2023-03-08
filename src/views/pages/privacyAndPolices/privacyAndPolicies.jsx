import react from "react";
import "./privacyAndPolicies.css";
const PrivacyAndPolices = () => {
  return (
    <>
      <div className="shop">
        <div className="privacyAndPoliciesHero">
          <div className="heading">Privacy and Policies</div>
          <p className="bodyCopy whiteColor">
            Most importantly, the privacy and security of your personal
            information is our priority. We assure you that the user or customer
            information collected through accessing, using, browsing or
            otherwise of the instant website, is safe, kept on a secure server
            and fully compliant with all of the relevant consumer laws. All
            payment transactions are made only through encrypted SSL technology.
          </p>
        </div>
        <div className="points">
          <p className="subHeading whiteColor " style={{ fontSize: "18px" }}>
            WHAT USER OR CUSTOMER INFORMATION DOES WE COLLECT AT DENDRO MUSIC
            TRIBE?{" "}
          </p>
          <br />
          <p className="whiteColor bodyCopy">
            1. Your contact details such as customer name, email address account
            password, phone number and shipping address.
            <br />
            <br /> 2. Your transaction or banking details such as credit/debit
            card number, cardholder name, expiration date and CVV and/or other
            information as required for internet banking or other payment
            instruments is not held by bholenathconnexion.com but is held by our
            Payment Gateway partner (CCAVENUE). Our payment gateway partner is
            "VeriSign Secured" and "PCI-Compliant" which ensures the highest
            standards of protection and security for your information.
          </p>
          <br />
          <br />
          <p className="subHeading whiteColor " style={{ fontSize: "18px" }}>
            TERMS & CONDITIONS.{" "}
          </p>
          <br />
          <p className="whiteColor bodyCopy">
            All sales at Dendro Music Tribe are final. We have a limited and
            curated collection, which means exchanging and returning would not
            always be possible. Please inform us within 7 days post delivery of
            any request like this, and we will try to accommodate your needs. In
            most cases we can entertain exchange requests ONLY if packaging and
            tags are intact, and only in the case of a sizing error. If we don't
            have your size available, we will provide you with store credit.
            Refunds are ONLY processed based on fulfilment errors, such as
            incorrectly shipped or missing items. No returns Policy on Purchases
            Outside India. Feel free to contact us with any questions.{" "}
          </p>
          <br />
          <br />
          <p className="subHeading whiteColor " style={{ fontSize: "18px" }}>
            ORDER & DELIVERY{" "}
          </p>
          <br />
          <p className="whiteColor bodyCopy">
            As soon as you place your order, you will receive a confirmation
            E-mail / SMS / Whatsapp. Orders are dispatched from our warehouse
            within 1-2 working days. As soon as your order has been dispatched,
            you will receive an email with a tracking number which you can use
            to track your order on our website or our courier partners website.
            <br />
            Orders will need to be signed for, so please choose a delivery
            address where someone will be available to receive it. You must
            provide a full address, including any special instructions, as we
            will not be responsible if the shipment goes missing due to the
            wrong address. If an incomplete address or phone number is provided,
            we will email you to ask for the full address/phone number. We are
            unable to schedule deliveries without a valid address and phone
            number, so if we do not get a reply after two attempts at reaching
            you, we will cancel the order and refund the full amount.
            <br /> Deliveries will take place between Monday and Saturday, and
            products shall be returned to us after three unsuccessful delivery
            attempts. Please allow 5 to 7 working days from dispatch for your
            goods to arrive within India, though in practice they usually arrive
            within 3 working days. Orders outside India take upto 7-10 days for
            delivery.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyAndPolices;
