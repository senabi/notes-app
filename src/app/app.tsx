import { classExpression } from "@babel/types";
import {
  BeakerIcon,
  BookmarkAltIcon,
  CakeIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  FilmIcon,
  LocationMarkerIcon,
  LockClosedIcon,
  MenuIcon,
  PencilIcon,
  PhotographIcon,
  SunIcon,
  MoonIcon,
  CalculatorIcon,
} from "@heroicons/react/outline";
import {
  Paper,
  Text,
  Skeleton,
  Code,
  useMantineColorScheme,
  ColorScheme,
  ColorSchemeProvider,
  ActionIcon,
  AppShell,
  Navbar,
  Header,
  Button,
  MantineProvider,
  Container,
  Box,
  Aside,
  createStyles,
  UseStylesOptions,
  useMantineTheme,
  ForwardRefWithStaticComponents,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React, { ComponentProps, useEffect, useState } from "react";
import styles from "./app.module.css";

type styleProps = {
  navbarHidden: boolean;
  navbarWidth: string;
  headerHeight: string;
  asideWidth: string;
};

type StyleClasses = Record<
  | "navbarOuter"
  | "navbarInner"
  | "navbar"
  | "header"
  | "headerLeft"
  | "headerRight"
  | "shadeMask"
  | "content"
  | "aside"
  | "wrapper"
  | "contentWrapper",
  string
>;

const useStyles = createStyles(
  (
    theme,
    { navbarHidden, navbarWidth, headerHeight, asideWidth }: styleProps,
    getRef
  ) => {
    console.log("useStyle", theme.colorScheme);
    return {
      navbarOuter: {
        position: "fixed",
        display: "flex",
        top: 0,
        left: 0,
        zIndex: 9,
        width: navbarHidden ? "0" : "w-full",
      },
      navbarInner: {
        transform: navbarHidden ? "translateX(-100%)" : "translateX(0)",
        width: navbarWidth,
        position: "relative",
        zIndex: 3,
        display: "flex",
        height: "100%",
        minHeight: 0,
        flex: "1 1 0%",
        flexDirection: "column",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[1],
        userSelect: "none",
      },
      navbar: {
        height: `calc(100vh - 0px - ${headerHeight})`,
        overflowY: "auto",
        overflowX: "hidden",
        marginTop: headerHeight,
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing.md,
      },
      header: {
        flex: "0 0 auto",
        display: "flex",
        paddingTop: "0",
        zIndex: "10",
        height: headerHeight,
        alignItems: "center",
      },
      headerLeft: {
        paddingLeft: theme.spacing.md,
        maxWidth: navbarWidth,
        flex: "1 1 0%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      },
      headerRight: {
        paddingRight: theme.spacing.md,
        // maxWidth: '100%',
        flex: "1 1 0%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
      },
      shadeMask: {
        // position: "absolute",
        position: navbarHidden ? "absolute" : "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        touchAction: "none",
        // overflow: "auto",
        // width: "100vw",
        backgroundColor: "black",
        opacity: navbarHidden ? "0" : "0.3",
        zIndex: navbarHidden ? "-1" : "1",
        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
          display: "none",
          backgroundColor: "red",
        },
      },
      wrapper: {
        display: "flex",
        overflowY: "auto",
        width: "100%",
        height: `calc(100vh - ${headerHeight})`,
      },
      content: {
        maxWidth: "810px",
        flex: "1 1 0%",
      },
      contentWrapper: {
        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
          marginLeft: navbarHidden ? 0 : navbarWidth,
        },
        height: "100%",
        width: "100%",
        flex: "1 1 0%",
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing.xl,
      },
      aside: {
        maxWidth: asideWidth,
        width: asideWidth,
        position: "sticky",
        height: "100%",
        maxHeight: "100%",
        overflowY: "auto",
        top: 0,
        right: 0,
        display: "none",
        [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
          display: "flex",
        },
        flexDirection: "column",
        padding: theme.spacing.md,
        paddingRight: "3rem",
      },
    };
  }
);

const ToggleThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle Color Scheme"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </ActionIcon>
  );
};

const App = (): JSX.Element => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <Paper radius={0}>
          <AppContainer />
        </Paper>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

type AppLayoutProps = {
  children: React.ReactNode;
  header: React.ReactElement;
  navbar: React.ReactElement;
  aside: React.ReactElement;
  classes: StyleClasses;
};

const AppContainer = (): React.ReactElement => {
  const [opened, setOpened] = useState(true);
  const { classes } = useStyles({
    navbarHidden: !opened,
    navbarWidth: "300px",
    headerHeight: "3rem",
    asideWidth: "350px",
  });

  return (
    <AppLayout
      header={
        <AppHeader classes={classes}>
          <HeaderLeft classes={classes}>
            <Button onClick={() => setOpened(!opened)}>
              {opened ? <p>Close</p> : <p>Open</p>}
            </Button>
          </HeaderLeft>
          <HeaderRight classes={classes}>
            <ToggleThemeButton />
          </HeaderRight>
        </AppHeader>
      }
      navbar={
        <AppNavbar classes={classes}>
          <Lorem size={20} />
        </AppNavbar>
      }
      aside={
        <AppAside classes={classes}>
          <Lorem size={20} />
        </AppAside>
      }
      classes={classes}
    >
      <Content classes={classes}>
        <div>Main content</div>
        <Lorem size={20} />
      </Content>
    </AppLayout>
  );
};

const AppLayout = ({
  header,
  navbar,
  children,
  aside,
  classes,
}: AppLayoutProps): React.ReactElement => {
  return (
    <Box className="flex">
      <Box className="flex h-screen w-full flex-1 flex-col overflow-y-auto">
        {header}
        <Box className="h-full flex flex-1">
          {navbar}
          <Box className={classes.wrapper}>
            {children}
            {aside}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

type AppHeaderProps = {
  children: React.ReactNode;
  classes: StyleClasses;
};
const AppHeader = ({
  children,
  classes,
}: AppHeaderProps): React.ReactElement => {
  return <Box className={classes.header}>{children}</Box>;
};

type HeaderLeftProps = {
  children: React.ReactNode;
  classes: StyleClasses;
};
const HeaderLeft = ({
  children,
  classes,
}: HeaderLeftProps): React.ReactElement => {
  return <Box className={classes.headerLeft}>{children}</Box>;
};

type HeaderRightProps = {
  children: React.ReactNode;
  classes: StyleClasses;
};
const HeaderRight = ({
  children,
  classes,
}: HeaderLeftProps): React.ReactElement => {
  return <Box className={classes.headerRight}>{children}</Box>;
};

type AppNavbarProps = {
  children: React.ReactNode;
  classes: StyleClasses;
};
const AppNavbar = ({
  children,
  classes,
}: AppNavbarProps): React.ReactElement => {
  return (
    <Box className={classes.navbarOuter}>
      <Box className={classes.navbarInner}>
        <Box className={classes.navbar}>{children}</Box>
      </Box>
      <span className={classes.shadeMask} />
    </Box>
  );
};

type ContentProps = {
  classes: StyleClasses;
  children: React.ReactNode;
};
const Content = ({ classes, children }: ContentProps) => {
  return (
    <Box className={classes.contentWrapper}>
      <Box className={classes.content}>{children}</Box>
    </Box>
  );
};

type AppAsideProps = {
  children: React.ReactNode;
  classes: StyleClasses;
};
const AppAside = ({ children, classes }: AppAsideProps): React.ReactElement => {
  return <div className={classes.aside}>{children}</div>;
};

export default App;

const Lorem = ({ size }: { size: number }) => {
  const [lst, setLst] = useState([]);
  useEffect(() => {
    for (let index = 0; index < size; index++) {
      // console.log(lst);
      setLst(prev => [...prev, index]);
    }
  }, []);

  return (
    <>
      {lst.map((i, ix) => (
        <p key={Math.random().toString()}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          aut quibusdam sit saepe sint nemo nam. Rerum facere aliquam excepturi
          corporis autem nisi animi aliquid velit vero quis, quibusdam
          dignissimos!
        </p>
      ))}
    </>
  );
};
