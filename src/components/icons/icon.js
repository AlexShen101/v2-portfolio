import React from 'react';
import PropTypes from 'prop-types';
import {
  IconLogo,
} from '@components/icons';
import { RiGithubLine } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { RiExternalLinkLine } from "react-icons/ri";
import { RiNewsLine } from "react-icons/ri";
import { GoBookmarkFill } from 'react-icons/go';

import { FaTwitter } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';

const Icon = ({ name }) => {
  switch (name) {
    case 'Bookmark':
      return <GoBookmarkFill />;
    case 'External':
      return <RiExternalLinkLine />;
    case 'GitHub':
      return <RiGithubLine />;
    case 'Linkedin':
      return <RiLinkedinBoxFill />;
    case 'Logo':
      return <IconLogo />;
    case 'Substack':
      return <RiNewsLine />;
    case 'Twitter':
      return <FaTwitter />;
    case 'YouTube':
      return <FaYoutube />;
    case 'Instagram':
      return <FaInstagram />;
    case 'TikTok':
      return <FaTiktok />;
    default:
      return <RiExternalLinkLine />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
