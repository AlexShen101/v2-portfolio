import React from 'react';
import PropTypes from 'prop-types';
import {
  IconExternal,
  IconLinkedin,
  IconLogo,
} from '@components/icons';
import { RiGithubLine } from "react-icons/ri";
import { FiLinkedin } from "react-icons/fi";

const Icon = ({ name }) => {
  switch (name) {
    case 'External':
      return <IconExternal />;
    case 'GitHub':
      return <RiGithubLine />;
    case 'Linkedin':
      return <FiLinkedin />;
    case 'Logo':
      return <IconLogo />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
