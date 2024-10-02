import React from 'react';
import PropTypes from 'prop-types';
import {
  IconExternal,
  IconLinkedin,
  IconLogo,
} from '@components/icons';
import { RiGithubLine } from "react-icons/ri";

const Icon = ({ name }) => {
  switch (name) {
    case 'External':
      return <IconExternal />;
    case 'GitHub':
      return <RiGithubLine />;
    case 'Linkedin':
      return <IconLinkedin />;
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
