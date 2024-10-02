import React from 'react';
import PropTypes from 'prop-types';
import {
  IconLogo,
} from '@components/icons';
import { RiGithubLine } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { RiExternalLinkLine } from "react-icons/ri";
import { RiNewsLine } from "react-icons/ri";
import { GoBookmarkFill } from "react-icons/go";

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
    default:
      return <RiExternalLinkLine />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
