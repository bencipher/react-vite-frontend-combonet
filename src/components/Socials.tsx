import React from "react";
import { FaFacebook } from "react-icons/fa";
import socialLinks from "../config/social.json";
import {
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaSkype,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
// const { facebook, twitter, instagram, youtube, linkedin, phone, email } =
const { facebook, twitter, instagram, email, phone, whatsapp, skype } =
  socialLinks;
const Socials = () => {
  return (
    <ul>
      {facebook && (
        <li className="inline-block mr-2">
          <a
            aria-label="facebook"
            href={facebook}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaFacebook />
          </a>
        </li>
      )}
      {twitter && (
        <li className="inline-block px-1">
          <a
            aria-label="twitter"
            href={twitter}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaXTwitter />
          </a>
        </li>
      )}
      {instagram && (
        <li className="inline-block px-1">
          <a
            aria-label="instagram"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaInstagram />
          </a>
        </li>
      )}
      {whatsapp && (
        <li className="inline-block px-1">
          <a
            aria-label="whatsapp"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaWhatsapp />
          </a>
        </li>
      )}
      {skype && (
        <li className="inline-block px-1">
          <a
            aria-label="skype"
            href={skype}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaSkype />
          </a>
        </li>
      )}
      {email && (
        <li className="inline-block px-1">
          <a aria-label="email" href={`mailto:${email}`}>
            <FaEnvelope />
          </a>
        </li>
      )}
      {phone && (
        <li className="inline-block px-1">
          <a aria-label="telephone" href={`tel:${phone}`}>
            <FaPhone />
          </a>
        </li>
      )}
    </ul>
  );
};

export default Socials;
