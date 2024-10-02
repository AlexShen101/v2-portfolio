import React from 'react';
import PropTypes from 'prop-types';
import {
  IconLogo,
} from '@components/icons';
import { RiGithubLine } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { RiExternalLinkLine } from "react-icons/ri";

const Icon = ({ name }) => {
  switch (name) {
    case 'External':
      return <RiExternalLinkLine />;
    case 'GitHub':
      return <RiGithubLine />;
    case 'Linkedin':
      return <RiLinkedinBoxFill />;
    case 'Logo':
      return <IconLogo />;
    default:
      return <RiExternalLinkLine />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
