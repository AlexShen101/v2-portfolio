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

import { MdEmail } from 'react-icons/md';

import { LuVideo, LuGamepad2, LuMicVocal } from 'react-icons/lu';

const Icon = ({ name, size = 16, color }) => {
  const iconProps = {
    size,
    style: color ? { color } : undefined,
  };

  switch (name) {
    case 'Bookmark':
      return <GoBookmarkFill {...iconProps} />;
    case 'External':
      return <RiExternalLinkLine {...iconProps} />;
    case 'GitHub':
      return <RiGithubLine {...iconProps} />;
    case 'Linkedin':
      return <RiLinkedinBoxFill {...iconProps} />;
    case 'Email':
      return <MdEmail {...iconProps} />;
    case 'Logo':
      return <IconLogo />;
    case 'Substack':
      return <RiNewsLine {...iconProps} />;
    case 'Twitter':
      return <FaTwitter {...iconProps} />;
    case 'YouTube':
      return <FaYoutube {...iconProps} />;
    case 'Instagram':
      return <FaInstagram {...iconProps} />;
    case 'TikTok':
      return <FaTiktok {...iconProps} />;
    case 'Video':
      return <LuVideo {...iconProps} />;
    case 'Gamepad':
      return <LuGamepad2 {...iconProps} />;
    case 'Music':
      return <LuMicVocal {...iconProps} />;
    default:
      return <RiExternalLinkLine {...iconProps} />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Icon;
