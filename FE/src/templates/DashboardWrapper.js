import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navbar, AppShell, Box } from '@mantine/core';
import Logo from '@/icons/Logo';
import { createStyles } from '@mantine/core';
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/utils/AppUrls';
import NavbarHeader from '@/components/organisms/Navbar';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthProvider';
import { NextLink } from '@mantine/next';

const styles = createStyles(() => ({
  navItem: {
    width: 'fit-content',
    padding: '17px',
    borderRadius: '15px',
    margin: '8px auto',
    cursor: 'pointer',
  },

  active: {
    background: '#006C52',

    '&:hover': {
      background: '#004a38',
    },
  },
}));

const displayLogo = () => (
  <Navbar.Section style={{ padding: '28px 24px' }}>
    <NextLink href='/dashboard' passHref>
      <Logo width={69} height={50} />
    </NextLink>
  </Navbar.Section>
);

export const displayNavItems = (currPath, isAdmin) => {
  const { classes } = styles();

  const NAV = isAdmin ? ADMIN_NAV_ITEMS : NAV_ITEMS;

  return NAV.map(({ Component, tag, href }) => (
    <Link key={tag} href={href[0]} passHref>
      <div
        className={`${classes.navItem} ${
          href.includes(currPath) && classes.active
        }`}
      >
        <Component filled={href.includes(currPath)} />
      </div>
    </Link>
  ));
};

const displayNav = (currPath, isAdmin) => (
  <Navbar
    width={{ base: 117 }}
    style={{ border: 'none', background: '#F8F9FC' }}
  >
    {displayLogo()}
    {displayNavItems(currPath, isAdmin)}
  </Navbar>
);

const DashboardWrapper = ({ children, label }) => {
  const { isAdmin } = useContext(AuthContext);
  const router = useRouter();
  const currPath = router.pathname;

  return (
    <AppShell navbar={displayNav(currPath, isAdmin)} fixed>
      <Box>
        <NavbarHeader label={label} />
        <Box style={{ padding: '0 71px 60px 58px' }}>{children}</Box>
      </Box>
    </AppShell>
  );
};

DashboardWrapper.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
};

DashboardWrapper.defaultProps = {
  children: null,
  label: null,
};

export default DashboardWrapper;
