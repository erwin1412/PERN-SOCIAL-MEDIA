import React from 'react';
import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiHome, FiSearch, FiUser, FiUsers, FiLogOut, FiUserCheck, FiHeart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { AUTH_LOGOUT } from '@/stores/rootReducer';
import { useNavigate } from 'react-router-dom';

interface LinkItemProps {
  icon: React.ReactElement;
  name: string;
  to?: string;
}

const LinkItems: LinkItemProps[] = [
  { icon: <FiHome />, name: 'Home', to: '/' },
  { icon: <FiUser />, name: 'Search', to: '/search' },
  { icon: <FiHeart />, name: 'Follow', to: '/follow' },
  { icon: <FiUser />, name: 'Profiles', to: '/profiles' },
];

const SimpleSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(AUTH_LOGOUT());
    navigate('/auth/login');
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      display="flex"
      flexDirection="column"
      justifyContent="space-between" // Arrange items vertically with space in between
    >
      {/* Logo */}
      <Flex align="center" p="4" mx="4">
        {/* Your logo */}
      </Flex>

      {/* Other icons */}
      <Box>
        {LinkItems.slice(0).map((link, index) => (
          <NavItem key={index} icon={link.icon} name={link.name} to={link.to} />
        ))}
      </Box>

      {/* Logout */}
      <Box marginTop={"200%"}>
      <NavItem  icon={<FiLogOut />} name="Logout" onClick={handleLogout} />
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, name, to, onClick }: LinkItemProps & { onClick?: () => void }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      style={{
        textDecoration: 'none',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
      }}
      onClick={onClick || handleNavigation}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
        >
          {icon}
        </Icon>
        {name}
      </Flex>
    </button>
  );
};

export default SimpleSidebar;
